export function createProteinObjectJS(name, position, w = 200, h = 40, degradation = null, basal = null, diffusion = null) {
    return {name: name, x: position.x, y: position.y, w: w, h: h, degradation: degradation, basal: basal, diffusion: diffusion, negval: 'n', iconcentration: []};
}

export function createConnectorObjectJS(id, type, typeId, joint = 0.0) {
    return {id: id, type: type, typeId: typeId, joint: joint};
}

export function createRelationObjectJS(id, startProtein, endConnectorId, type = "positive", k = 1.0, threshold = 1.0, n = 1, startJoint = 0.0, points = []) {
    return {id: id, type: type, startProtein: startProtein, startJoint: startJoint, points: points, endConnectorId: endConnectorId, k: k, threshold: threshold, n: n};
}

export function getMaxIndexInArrayField (array, field, defaultName = null, firstIdx = 0) {
    let idx = firstIdx;
    if (defaultName) {
        let stringLength = defaultName.length;
        array.forEach(el => {
            if (el[field].substring(0,stringLength) === defaultName) {
                let value = parseInt(el[field].substring(stringLength));
                idx = value > idx ? value : idx;
            }
        });
    } else {
        array.forEach(el => idx = el[field] > idx ? el[field] : idx);
    }
    return idx;
}


function isValidConstant(value, constants) {
    return constants.findIndex(e => e === value) >= 0;
}

function isValidValue(value, constants) {
    return !isNaN(value) || isValidConstant(value, constants);
}


function getSignedNumberString(number, includePositive = true) {
    let res = "";
    let sign = Math.sign(number);
    if (isNaN(sign)) {
        res = includePositive ? "+ " + number : number;
    } else if (sign === 1) {
        res = includePositive ? "+ " + Math.abs(number) : Math.abs(number);
    } else if (sign === -1) {
        res = "-" + Math.abs(number);
    } else {
        res = includePositive ? "+ 0" : "0";
    }

    return res;
}

function getRelationFormula(rel, prot, connectors, relations) {
    let res = "";

    let connectedRelations = false;
    connectors.forEach((con) => {
        if (con.type === "relation" && con.typeId === rel.id) {
            res += connectedRelations ? " + " : "";
            connectedRelations = true;
            res += prot;
            let starSymbol = true;
            relations.forEach((relAux) => {
                if (relAux.endConnectorId === con.id) {
                    res += starSymbol ? " * " : "";
                    starSymbol = true;
                    res += getSignedNumberString(relAux.k, false) + " * function_hill_f";
                    res += relAux.type === "negative" ? "_inverse(" : "(";
                    //res += relAux.startProtein;

                    res += getRelationFormula(relAux, relAux.startProtein, connectors, relations);

                    res += ", " + relAux.threshold + ", " + relAux.n + ")";
                }
            });
        }
    });
    if (!connectedRelations) {
        res += prot;
    }
    return res;
};

export function getProteinFormula(prot, connectors, relations) {
    let res = "";
    
    let plusSymbol = false;
    connectors.forEach((con) => {
        if (con.type === "protein" && con.typeId === prot.name) {
            let starSymbol = false;
            relations.forEach((rel) => {
                if (rel.endConnectorId === con.id) {
                    res += starSymbol ? " * " : "";
                    res += getSignedNumberString(rel.k, !plusSymbol !== !starSymbol) + " * function_hill_f";
                    starSymbol = true;
                    plusSymbol = true;
                    res += rel.type === "negative" ? "_inverse(" : "(";
                    //res += rel.startProtein;

                    res += getRelationFormula(rel, rel.startProtein, connectors, relations);

                    res += ", " + rel.threshold + ", " + rel.n + ")";
                }
            });
        }
    });

    if (prot.degradation !== null) {
        if (isNaN(prot.degradation)) {
            res += " -" + prot.degradation + " * " + prot.name + " ";
        } else {
            res += " -" + Math.abs(prot.degradation) + " * " + prot.name + " ";
        }
        
    }
    if (prot.basal !== null) {
        res += getSignedNumberString(prot.basal, res !== "") + " ";
    }
    if (prot.diffusion !== null) {
        res += getSignedNumberString(prot.diffusion, res !== "") + " * diffusion_" + prot.name + "() ";
    }

    return res;
};



//////////////////////////////////////////////////////////////////////////////////
///////////////////// FORMULA TO DIAGRAM TRANSLATION /////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

function minIndexOf(string, array, start) {
    let minIdx = Infinity;
    for (let i = 0; i < array.length; i++) {
        let idx = string.indexOf(array[i], start);
        if (idx > -1 && idx < minIdx) {
            minIdx = idx;
        }
    }
    return minIdx === Infinity ? -1 : minIdx;
}

// Gets array of elements of a mathematical term
function getTermParts(formula) {
    let parts = [];

    while (formula.length > 0) {
        let firstIdx = minIndexOf(formula, ['/', '*', '(']);
        let value = formula.substr(0, firstIdx > 0 ? firstIdx : undefined);

        // If we have a function
        if (firstIdx > 0 && formula[firstIdx] === '(') {
            if (formula[firstIdx+1] === ')') {
                parts.push(value + "()");
                formula = formula.substr(firstIdx+2);
            } else {
                let parameters;
                [formula, parameters] = getFunctionParenthesis(formula.substr(firstIdx+1));
                parts.push({function: value, parameters: parameters});
                // To avoid initial * or /
                if (minIndexOf(formula, ['/', '*']) === 0) {
                    formula = formula.substr(1);
                }
            }
        } else {    // If we have a value or a constant
            let numericValue = parseFloat(value);
            if (isNaN(numericValue)) {
                // If it is a string (constant), check and remove initial sign
                if (value[0] === '+') {
                    parts.push(value.substr(1));
                } else if (value[0] === '-') {
                    parts.push(-1);
                    parts.push(value.substr(1));
                } else {
                    parts.push(value);
                }
            } else {
                parts.push(numericValue);
            }
            formula = firstIdx > 0 ? formula.substr(firstIdx+1) : "";
        }
    }

    return parts;
}

function getFunctionParenthesis(formula) {
    let parameters = [], newFormula = formula;

    // Look for closing parenthesis
    let level = 1, previousIdx = 0, idx = 0;
    while (level > 0 && idx < formula.length) {
        if (formula[idx] === '(') {
            level++;
        } else if (formula[idx] === ')') {
            level--;
            if (level === 0) {
                parameters.push(getTermParts(formula.substr(previousIdx, idx-previousIdx)));
            }
        } else if (formula[idx] === ',') {
            if (level === 1) {
                parameters.push(getTermParts(formula.substr(previousIdx, idx-previousIdx)));
                previousIdx = idx + 1;
            }
        }
        idx++;
    }

    // If found closing parenthesis
    if (level === 0) {
        newFormula = idx < formula.length ? formula.substr(idx) : "";
    }

    return [newFormula, parameters]
}

// Returns an arrays of JS object arrays following the structure of the given formula
function getInfoFromFormula(formula) {
    formula = formula.replace(/\s+/g, '');

    let error = false;
    let terms = [];

    while (formula.length > 0) {
        let firstIdx = 0;
        if (formula[0] === '+' || formula[0] === '-') {
            firstIdx = 1;
        }

        // To avoid signs
        do {
            firstIdx = minIndexOf(formula, ['+', '-'], firstIdx + 1);
        } while (firstIdx > 0 && (formula[firstIdx-1] === '*' || formula[firstIdx-1] === '/'));

        terms.push(getTermParts(formula.substr(0, firstIdx > 0 ? firstIdx : undefined)));
        formula = firstIdx > 0 ? formula.substr(firstIdx) : "";
    }
    
    return [error, terms];
}


export function getInfoFromProteinFormula(proteinName, formula, proteins, connectors, relations, constants) {
    let error, info;

    if (formula == null) {
        formula = "";
    }
    [error, info] = getInfoFromFormula(formula);

    let degradation = null, basal = null, diffusion = null;

    // Loop for the formula terms
    while (info.length > 0 && !error) {
        let term = info.shift();
        // Basal
        if (basal === null && (basal = processBasal(term, constants)) !== null) {
            continue;
        }
        // Degradation
        if (degradation === null && (degradation = processDegradation(proteinName, term, constants)) !== null) {
            continue;
        }
        // Diffusion
        if (diffusion === null && (diffusion = processDiffusion(proteinName, term, constants)) !== null) {
            continue;
        }
        // Relation
        let relationError;
        [relationError, connectors, relations] = processRelation("protein", proteinName, term, proteins, connectors, relations, constants);
        error = error || relationError;
    }

    let proteinIdx = proteins.findIndex(protein => protein.name === proteinName);
    if (proteinIdx >= 0) {
        proteins[proteinIdx].degradation = degradation;
        proteins[proteinIdx].basal = basal;
        proteins[proteinIdx].diffusion = diffusion;
    } else {
        error = true;
    }

    return [error, proteins, connectors, relations];
}

function processRelation(type, typeId, term, proteins, connectors, relations, constants) {
    let idxFunc;
    let newConnectors = [...connectors];
    let newRelations = [...relations];
    let error = false;
    let connectorId = null;

    do {
        idxFunc = term.findIndex((element) => typeof element === "object" && (element.function === "function_hill_f" || element.function === "function_hill_f_inverse") && element.parameters.length === 3);
        if (idxFunc >= 0) {
            let func = term[idxFunc];
            term.splice(idxFunc, 1);

            let k = 1;
            let idxK = term.findIndex((element) => isValidValue(element, constants));
            if (idxK >= 0) {
                k = term[idxK];
                term.splice(idxK, 1);
            }

            let threshold = null, n = null;
            if (func.parameters[1].length === 1 && isValidValue(func.parameters[1][0], constants)) {
                threshold = func.parameters[1][0];
            }
            if (func.parameters[2].length === 1 && isValidValue(func.parameters[2][0], constants)) {
                n = func.parameters[2][0];
            }
            if (threshold === null || n === null) {
                error = true;
            }

            let nextTerm = func.parameters[0];
            let idxRelProtein = nextTerm.findIndex(element => typeof element === "string" && proteins.findIndex(protein => protein.name === element) >= 0);
            if (idxRelProtein >= 0) {
                let relProtein = nextTerm[idxRelProtein];
                nextTerm.splice(idxRelProtein, 1);

                // Only first time
                if (connectorId === null) {
                    connectorId = getMaxIndexInArrayField(connectors, "id") + 1;
                    connectors.push(createConnectorObjectJS(connectorId, type, typeId, type === "relation" ? 0.5 : Math.random()));
                }

                let relationId = getMaxIndexInArrayField(relations, "id") + 1;
                let relationType = func.function === "function_hill_f" ? "positive" : "negative";
                relations.push(createRelationObjectJS(relationId, relProtein, connectorId, relationType, k, threshold, n, Math.random()));

                if (nextTerm.length > 0) {
                    let auxError;
                    [auxError, connectors, relations] = processRelation("relation", relationId, nextTerm, proteins, connectors, relations, constants);
                    error = error || auxError;
                }
            } else {
                error = true;
            }
        }
    } while (idxFunc >= 0 && !error);

    if (term.length > 0) {
        error = true;
    } else {
        newConnectors = connectors;
        newRelations = relations;
    }

    return [error, newConnectors, newRelations];
}

function processBasal(term, constants) {
    let value = null;

    if (term.length === 1 && isValidConstant(term[0], constants)) {
        value = term.shift();
    } else if (term.length === 1 && !isNaN(term[0]) && term[0] > 0.0) {
        value = term.shift();
    }

    return value;
}

function processDegradation(proteinName, term, constants) {
    let value = null;

    let idxString = term.findIndex((element) => element === proteinName);

    if (idxString >= 0) {
        term.splice(idxString, 1);
        if (term.length === 1 && !isNaN(term[0]) && term[0] < 0.0) {
            value = Math.abs(term[0]);
        } else if (term.length === 2) {
            if (term[0] === -1 && isValidConstant(term[1], constants)) {
                value = term[1];
            } else if (term[1] === -1 && isValidConstant(term[0], constants)) {
                value = term[0];
            }
        }
    }

    return value;
}

function processDiffusion(proteinName, term, constants) {
    let value = null;

    let idxString = term.findIndex((element) => element === "diffusion_" + proteinName + "()");

    if (idxString >= 0) {
        term.splice(idxString, 1);
        if (term.length === 0) {
            value = 1;
        } else if (term.length === 1 && isValidConstant(term[0], constants)) {
            value = term[0];
        }  else if (term.length === 1 && !isNaN(term[0]) && term[0] > 0.0) {
            value = term[0];
        }
    }

    return value;
}

/////////////////////////////////////////

export function parseXMLProteinEditorData(xmlText) {
    let proteinEditorData = {proteins: [], relations: [], connectors: []};

    let firstSeparator = "<!--##PROTEIN_EDITOR_DATA##";
    let lastSeparator = "-->";
    let firstIdx = xmlText.indexOf(firstSeparator);
    let lastIdx = xmlText.indexOf(lastSeparator, firstIdx);
    let configText = xmlText.substr(firstIdx + firstSeparator.length, lastIdx - firstIdx - firstSeparator.length);
    configText = configText.replace(/\s/g, '');

    let proteinElements = configText.split(';');

    for (let i = 0; i < proteinElements.length; i++) {
        let data = proteinElements[i].split(',');
        if (data.length === 5) {
            proteinEditorData.proteins.push({name: data[0], x: parseFloat(data[1]), y: parseFloat(data[2]), w: parseFloat(data[3]), h: parseFloat(data[4])})
        }
    }

    return proteinEditorData;
}

export function writeXMLProteinEditorData(proteinEditorData) {
    let xmlText = "";

    let firstSeparator = "<!--##PROTEIN_EDITOR_DATA##";
    let lastSeparator = "-->";

    xmlText += firstSeparator;

    for (let i = 0; i < proteinEditorData.proteins.length; i++) {
        let data = proteinEditorData.proteins[i];
        xmlText += data.name + "," + data.x + "," + data.y + "," + data.w + "," + data.h + ";";
    }

    xmlText += lastSeparator;

    return xmlText;
}

export function configureEditorData(proteinEditorData, proteinArray, newConnectors, newRelations) {
    for (let i = 0; i < proteinArray.length; i++) {
        let prot = proteinEditorData.proteins.find(p => p.name === proteinArray[i].name);
        if (prot) {
            proteinArray[i].x = prot.x;
            proteinArray[i].y = prot.y;
            proteinArray[i].w = prot.w;
            proteinArray[i].h = prot.h;
        }
    }

    return [proteinArray, newConnectors, newRelations];
}