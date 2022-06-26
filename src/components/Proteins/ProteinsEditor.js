import React, { useState, useEffect } from "react";
import ProteinNode from "./ProteinNode";
import ProteinRelation from "./ProteinRelation";
import ProteinDialog from "./ProteinDialog";
import RelationDialog from "./RelationDialog";
import {
  getVector,
  getMagnitude,
  getPointOverLineSegmentProportion,
  getPointOverProteinProportion,
  isPointOverProtein,
  getNormalized,
} from "./AuxiliarFunctions";
import {
  getMaxIndexInArrayField,
  createProteinObjectJS,
  createRelationObjectJS,
  getProteinFormula,
  getInfoFromProteinFormula,
  configureEditorData,
} from "./FormulaParser";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { NearMe } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import { FormulaEditor, ProteinList } from "./FormulaEditor";
import { withStyles } from "@material-ui/core/styles";
import MuiToggleButton from "@material-ui/lab/ToggleButton";

const ToggleButtonTitle = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "black",
    "&:hover": {
      backgroundColor: "aliceblue",
    },
  },
  selected: {
    "&.MuiToggleButton-root.Mui-selected": {
      backgroundColor: "aliceblue",
      color: "black",
    },
  },
}))(MuiToggleButton);

const ToggleButtonAction = withStyles((theme) => ({
  root: {
    color: "black",
    "&:hover": {
      backgroundColor: "aliceblue",
    },
  },
  selected: {
    "&.MuiToggleButton-root.Mui-selected": {
      backgroundColor: "aliceblue",
      color: "black",
    },
  },
}))(MuiToggleButton);

function ProteinsEditor(props) {
  // MODE
  const [mode, setMode] = useState(1);
  const [visualEnabled, setVisualEnabled] = useState(false);

  // DIAGRAM STATE
  /*const [proteins, setProteins] = useState([{name: "Protein1", x: 100, y: 200, w: 200, h: 40, degradation: null, basal: 3.0, diffusion: null},
                                            {name: "Protein2", x: 400, y: 200, w: 200, h: 40, degradation: 1.0, basal: null, diffusion: 4.0},
                                            {name: "Protein3", x: 400, y: 400, w: 200, h: 40, degradation: 2.3, basal: null, diffusion: null}]);

    const [connectors, setConnectors] = useState([{id: 0, type:"protein", typeId: "Protein2", joint: 3.1}, {id: 1, type:"relation", typeId: 0, joint: 0.5}, {id: 2, type:"protein", typeId: "Protein2", joint: 2.5}]);

    const [relations, setRelations] = useState([{id: 0, type: "negative", startProtein: "Protein1", startJoint: 1.5, points: [], endConnectorId: 0, k: 1.0, threshold: 1.5, n: 1},
                                                {id: 1, type: "positive", startProtein: "Protein3", startJoint: 0.25, points: [], endConnectorId: 1, k: 1.0, threshold: 1.5, n: 1},
                                                {id: 2, type: "positive", startProtein: "Protein3", startJoint: 0.75, points: [], endConnectorId: 2, k: 1.0, threshold: 1.5, n: 1}]);*/
  const [proteins, setProteins] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [relations, setRelations] = useState([]);

  // TOOLS AND INTERACTION
  const [movingParameters, setMovingParameters] = useState(null);
  const [tool, setTool] = useState(0);

  // WINDOWS
  const [proteinDialog, setProteinDialog] = useState(null);
  const [relationDialog, setRelationDialog] = useState(null);

  //////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////// INIT //////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  const getInitialInfo = (proteins, proteinEditorData) => {
    let proteinArray = [],
      newConnectors = [],
      newRelations = [];
    let error = false;
    if (proteins.protein) {
      // Get protein list
      for (let i = 0; i < proteins.protein.length; i++) {
        proteinArray.push(createProteinObjectJS(proteins.protein[i].$.species, { x: 200, y: 50 + 80 * i }));
        proteinArray[i].negval = proteins.protein[i].dynamics.$.negval;
        proteinArray[i].iconcentration = proteins.protein[i].iconcentration;
      }

      // Get list of constants
      let constantsNames = [];
      if (proteins.constants) {
        if (!Array.isArray(proteins.constants)) proteins.constants = [proteins.constants];
        for (let i = 0; i < proteins.constants.length; i++) {
          let constantsStage = Object.keys(proteins.constants[i]);
          for (let j = 0; j < constantsStage.length; j++) {
            if (constantsStage[j] !== "$" && constantsNames.findIndex((e) => e === constantsStage[j]) === -1) {
              constantsNames.push(constantsStage[j]);
            }
          }
        }
      }

      // Process protein dynamics
      for (let i = 0; i < proteins.protein.length; i++) {
        let auxError = false;
        [auxError, proteinArray, newConnectors, newRelations] = getInfoFromProteinFormula(
          proteinArray[i].name,
          proteins.protein[i].dynamics._,
          proteinArray,
          newConnectors,
          newRelations,
          constantsNames
        );
        error = error || auxError;
      }
    }

    if (error) {
      setProteins([]);
      setConnectors([]);
      setRelations([]);
      setVisualEnabled(false);
      setMode(1);
    } else {
      [proteinArray, newConnectors, newRelations] = configureEditorData(proteinEditorData, proteinArray, newConnectors, newRelations);

      setProteins(proteinArray);
      setConnectors(newConnectors);
      setRelations(newRelations);
      setVisualEnabled(true);
    }
  };

  // Initial function
  useEffect(() => {
    getInitialInfo(props.proteins, props.proteinEditorData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updates the main state of the app when the editor changes
  useEffect(() => {
    if (visualEnabled) {
      let newProteins = Object.assign({}, props.proteins);

      let proteinsProtein = [];
      for (let i = 0; i < proteins.length; i++) {
        let newProtein = { $: { species: proteins[i].name }, dynamics: {}, iconcentration: [] };
        newProtein.dynamics = { _: getProteinFormula(proteins[i], connectors, relations), $: { negval: proteins[i].negval } };
        newProtein.iconcentration = proteins[i].iconcentration;
        proteinsProtein.push(newProtein);
      }

      newProteins.protein = proteinsProtein;

      let newProteinEditorData = { proteins: [], relations: [], connectors: [] };
      for (let i = 0; i < proteins.length; i++) {
        newProteinEditorData.proteins.push({ name: proteins[i].name, x: proteins[i].x, y: proteins[i].y, w: proteins[i].w, h: proteins[i].h });
      }

      props.handlerValue(newProteins);
      props.handlerEditorValue(newProteinEditorData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proteins, relations, connectors]);

  const onChangeFormula = (idx, formula) => {
    let newProteins = Object.assign({}, props.proteins);

    newProteins.protein[idx].dynamics._ = String(formula);

    props.handlerValue(newProteins);
    getInitialInfo(newProteins, props.proteinEditorData);
  };

  //////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// MOUSE EVENTS //////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////

  const repairConnectors = (newProteins, newRelations) => {
    let connectorsToRemove = [];
    let newConnectors = [...connectors];
    newConnectors.forEach((con, i) => {
      if (newRelations.findIndex((rel) => con.relationId === rel.id) === -1) {
        if ( newRelations.findIndex((rel) => con.id == rel.endConnectorId) === -1) 
          connectorsToRemove.push(i);
      } else if (con.type === "protein" && newProteins.findIndex((prot) => con.typeId === prot.name) === -1) {
        let pos = getConnectorCoords(con.id);
        newConnectors[i] = { id: con.id, type: "position", x: pos.x, y: pos.y, relationId: con.relationId };
      } else if (con.type === "relation" && newRelations.findIndex((rel) => con.typeId === rel.id) === -1) {
        let pos = getConnectorCoords(con.id);
        if (pos === null)
          removeRelation(newRelations.findIndex((rel) => rel.id === con.relationId));
        else
          newConnectors[i] = { id: con.id, type: "position", x: pos.x, y: pos.y, relationId: con.relationId };
      } 
    });
    connectorsToRemove.sort((a,b)=> b - a);
    connectorsToRemove.forEach((idCon) => newConnectors.splice(idCon,1));
    setConnectors(newConnectors);
  };

  const addNewProtein = (pos) => {
    // If visual editor is enabled the component local state is used
    if (visualEnabled) {
      let newProteins = [...proteins];
      let proteinName = "protein" + (getMaxIndexInArrayField(proteins, "name", "protein", 0) + 1).toString();
      newProteins.push(createProteinObjectJS(proteinName, pos));
      setProteins(newProteins);
      setProteinDialog(proteinName);
      setTool(0);
    } else {
      // Otherwise App global state is used
      let newProteins = Object.assign({}, props.proteins);
      let proteinName = "protein" + (newProteins.protein.length + 1);
      let newProtein = { $: { species: proteinName }, dynamics: { _: "", $: { negval: "n" } }, iconcentration: [] };
      newProteins.protein.push(newProtein);
      props.handlerValue(newProteins);
      getInitialInfo(newProteins, props.proteinEditorData);
      setProteinDialog(proteinName);
    }
  };

  const removeProtein = (idx) => {
    // If visual editor is enabled the component local state is used
    if (visualEnabled) {
      let newProteins = [...proteins];
      newProteins.splice(idx, 1);
      setProteins(newProteins);

      let newRelations = [...relations];
      newRelations = newRelations.filter((rel) => rel.startProtein !== proteins[idx].name);
      setRelations(newRelations);

      repairConnectors(newProteins, newRelations);
    } else {
      // Otherwise App global state is used
      let newProteins = Object.assign({}, props.proteins);
      newProteins.protein.splice(idx, 1);
      props.handlerValue(newProteins);
      getInitialInfo(newProteins, props.proteinEditorData);
    }
  };

  const onRemoveProteinProp = (idx) => (property) => {
    if (tool === 4) { // Remove tool
      if (visualEnabled) {
        let newProteins = [...proteins];
          newProteins[idx][property] = null;
          setProteins(newProteins);
      } else {
        // Otherwise App global state is used
        let newProteins = Object.assign({}, props.proteins);
        newProteins.protein[idx][property] = null;
        props.handlerValue(newProteins);
        getInitialInfo(newProteins, props.proteinEditorData);
      }
      setTool(0);
    }
  }

  const removeRelation = (idx) => {
    let newRelations = [...relations];
    newRelations.splice(idx, 1);
    setRelations(newRelations);

    repairConnectors(proteins, newRelations);
  };

  const getEditorMousePos = (event) => {
    let viewport = document.getElementById("editor");
    let bound = viewport.getBoundingClientRect();
    return { x: event.clientX - bound.x, y: event.clientY - bound.y };
  };

  const onViewportMouseDown = (event) => {
    if (tool === 1) {
      let mousePos = event ? getEditorMousePos(event) : { x: 200, y: 200 };
      addNewProtein(mousePos);
    }
  };

  const onMouseDown = (info) => (event) => {
    let mousePos = getEditorMousePos(event);

    if (tool === 0) {
      setMovingParameters({ type: info.type, id: info.id, auxIdx: null, lastX: mousePos.x, lastY: mousePos.y });
    } else if (tool === 2 || tool === 3) {
      if (info.type === "protein") {
        let newRelations = [...relations];
        let relationId = getMaxIndexInArrayField(relations, "id") + 1;
        let connectorId = getMaxIndexInArrayField(connectors, "id") + 1;
        newRelations.push(createRelationObjectJS(relationId, proteins[info.id].name, connectorId, tool === 2 ? "positive" : "negative", 1.0, 3.0, 4, 0, [{x: mousePos.x + 5, y: mousePos.y - 50}]));
        setRelations(newRelations);

        let newConnectors = [...connectors];
        //newConnectors.push({ id: connectorId, type: "position", x: mousePos.x, y: mousePos.y });
        newConnectors.push({ id: connectorId, type: "protein", x: mousePos.x, y: mousePos.y, typeId: proteins[info.id].name, joint: 1.0, relationId: relationId });
        setConnectors(newConnectors);
        setMovingParameters({ type: "relationEnd", id: newRelations.length - 1, auxIdx: null, lastX: mousePos.x, lastY: mousePos.y });
        setTool(0);
        //updateGlobalState();
      }
    } else if (tool === 4) {
      if (info.type === "protein") {
        removeProtein(info.id);
        setTool(0);
      }
    }
  };

  const onRelationMouseDown = (info) => (auxIdx) => (event) => {
    if (tool === 0) {
      let mousePos = getEditorMousePos(event);
      setMovingParameters({ type: info.type, id: info.id, auxIdx: auxIdx, lastX: mousePos.x, lastY: mousePos.y });
    } else if (tool === 4) {
      removeRelation(info.id);
      setTool(0);
    }
  };

  const onMouseMove = (event) => {
    let mousePos = getEditorMousePos(event);
    if (movingParameters) {
      if (movingParameters.type === "protein") {
        let newProteins = [...proteins];
        let proteinIdx = movingParameters.id;
        newProteins[proteinIdx].x += mousePos.x - movingParameters.lastX;
        newProteins[proteinIdx].y += mousePos.y - movingParameters.lastY;
        setProteins(newProteins);
        //updateGlobalState();
      } else if (movingParameters.type === "relation") {
        if (Math.abs(mousePos.x - movingParameters.lastX) > 0 || Math.abs(mousePos.y - movingParameters.lastY) > 0) {
          let newRelations = [...relations];
          newRelations[movingParameters.id].points.splice(movingParameters.auxIdx, 0, mousePos);
          setRelations(newRelations);
          movingParameters.type = "relationPoint";

          let rel = newRelations[movingParameters.id];
          let idx = rel.id;
          let [start, end] = [getProteinCoords(rel.startProtein, rel.startJoint), getConnectorCoords(rel.endConnectorId)];
          let points = [{ x: start.x, y: start.y }];
          rel.points.forEach((point) => {
            points.push({ x: point.x, y: point.y });
          });
          points.push({ x: end.x, y: end.y });

          let newConnectors = [...connectors];
          newConnectors.forEach((con, i) => {
            if (con.type === "relation" && con.typeId === idx) {
              if (Math.floor(con.joint) === movingParameters.auxIdx) {
                let prop = con.joint - Math.floor(con.joint);
                let dist1 = getMagnitude(getVector(points[movingParameters.auxIdx], points[movingParameters.auxIdx + 1]));
                let dist2 = getMagnitude(getVector(points[movingParameters.auxIdx + 1], points[movingParameters.auxIdx + 2]));
                let distTotal = dist1 + dist2;
                if (prop < dist1 / distTotal) {
                  newConnectors[i].joint = movingParameters.auxIdx + prop / (dist1 / distTotal);
                } else {
                  newConnectors[i].joint = movingParameters.auxIdx + 1 + (prop - dist1 / distTotal) / (dist2 / distTotal);
                }
              } else if (Math.floor(con.joint) > movingParameters.auxIdx) {
                newConnectors[i].joint += 1.0;
              }
            }
          });
          setConnectors(newConnectors);
          //updateGlobalState();
        }
      } else if (movingParameters.type === "relationPoint") {
        let newRelations = [...relations];
        newRelations[movingParameters.id].points[movingParameters.auxIdx].x += mousePos.x - movingParameters.lastX;
        newRelations[movingParameters.id].points[movingParameters.auxIdx].y += mousePos.y - movingParameters.lastY;
        setRelations(newRelations);
        //updateGlobalState();
      } else if (movingParameters.type === "relationStart") {
        let newRelations = [...relations];
        proteins.forEach((prot) => {
          if (isPointOverProtein(mousePos, prot)) {
            let origin = getConnectorCoords(relations[movingParameters.id].endConnectorId);
            if (relations[movingParameters.id].points.length > 0) {
              origin = relations[movingParameters.id].points[0];
            }
            let prop = getPointOverProteinProportion(origin, mousePos, prot);
            if (prop) {
              newRelations[movingParameters.id].startProtein = prot.name;
              newRelations[movingParameters.id].startJoint = prop;
            }
          }
        });
        setRelations(newRelations);
        //updateGlobalState();
      } else if (movingParameters.type === "relationEnd") {
        let elementIntersect = false;
        let idx = connectors.findIndex((con) => con.id === relations[movingParameters.id].endConnectorId);
        let newConnectors = [...connectors];

        proteins.forEach((prot) => {
          if (isPointOverProtein(mousePos, prot)) {
            let origin = getProteinCoords(relations[movingParameters.id].startProtein, relations[movingParameters.id].startJoint);
            if (relations[movingParameters.id].points.length > 0) {
              origin = relations[movingParameters.id].points[relations[movingParameters.id].points.length - 1];
            }
            let prop = getPointOverProteinProportion(origin, mousePos, prot);
            if (prop) {
              newConnectors[idx] = { id: newConnectors[idx].id, type: "protein", typeId: prot.name, joint: prop, relationId: relations[movingParameters.id].id };
              elementIntersect = true;
            }
            else {
              // Esta sobre ella misma
              newConnectors[idx] = { id: newConnectors[idx].id, type: "protein", typeId: prot.name, joint: 1.0, relationId: relations[movingParameters.id].id };
              elementIntersect = true;
            }
          }
        });

        relations.forEach((rel, i) => {
          if (movingParameters.id !== i && rel.endConnectorId !== relations[movingParameters.id].endConnectorId) {
            let [start, end] = [getProteinCoords(rel.startProtein, rel.startJoint), getConnectorCoords(rel.endConnectorId)];
            if (end !== null) {
              let points = [{ x: start.x, y: start.y }];
              rel.points.forEach((point) => {
                points.push({ x: point.x, y: point.y });
              });
              points.push({ x: end.x, y: end.y });

              for (let k = 0; k < points.length - 1; k++) {
                let prop = getPointOverLineSegmentProportion(mousePos, points[k], points[k + 1]);
                if (prop >= 0.0 && prop <= 1.0) {
                  newConnectors[idx] = { id: newConnectors[idx].id, type: "relation", typeId: rel.id, joint: prop + k, relationId: newConnectors[idx].relationId };
                  elementIntersect = true;
                }
              }
            }
          }
        });

        newConnectors.forEach((con, i) => {
          if (i !== idx) {
            let end = getConnectorCoords(con.id);
            if (end !== null) {
              let dist = getMagnitude(getVector(mousePos, end));
              if (dist <= 8.0) {
                newConnectors[idx] = { id: newConnectors[idx].id, type: con.type, typeId: con.typeId, joint: con.joint, x: con.x, y: con.y, relationId: newConnectors[idx].relationId };
                elementIntersect = true;
              }
            }
          }
        });

        if (!elementIntersect) {
          newConnectors[idx] = { id: newConnectors[idx].id, type: "position", x: mousePos.x, y: mousePos.y, relationId: newConnectors[idx].relationId };
        }
        setConnectors(newConnectors);
        //updateGlobalState();
      }
      setMovingParameters({ type: movingParameters.type, id: movingParameters.id, auxIdx: movingParameters.auxIdx, lastX: mousePos.x, lastY: mousePos.y });
    }
  };

  const onMouseUp = (event) => {
    if (movingParameters) {
      if (movingParameters.type === "relationEnd") {
        let idx = connectors.findIndex((con) => con.id === relations[movingParameters.id].endConnectorId);
        let newConnectors = [...connectors];
        let combinedConId = -1;

        newConnectors.forEach((con, i) => {
          if (i !== idx && con.type === newConnectors[idx].type && con.typeId === newConnectors[idx].typeId && con.joint === newConnectors[idx].joint) {
            combinedConId = con.id;
          }
        });

        if (combinedConId !== -1) {
          let newRelations = [...relations];
          newRelations[movingParameters.id].endConnectorId = combinedConId;
          newConnectors.splice(idx, 1);
          setRelations(newRelations);
          setConnectors(newConnectors);
          //updateGlobalState();
        }
      } else if (movingParameters.type === "relationPoint") {
        let rel = relations[movingParameters.id];
        let [start, end] = [getProteinCoords(rel.startProtein, rel.startJoint), getConnectorCoords(rel.endConnectorId)];
        let points = [{ x: start.x, y: start.y }];
        rel.points.forEach((point) => {
          points.push({ x: point.x, y: point.y });
        });
        points.push({ x: end.x, y: end.y });

        let v1 = getVector(points[movingParameters.auxIdx + 1], points[movingParameters.auxIdx]);
        let v2 = getVector(points[movingParameters.auxIdx + 1], points[movingParameters.auxIdx + 2]);
        let v1Norm = getNormalized(v1);
        let v2Norm = getNormalized(v2);
        let alignFactor = Math.abs(v1Norm.x * v2Norm.x + v1Norm.y * v2Norm.y);

        if (getMagnitude(v1) < 12 || getMagnitude(v2) < 12 || alignFactor > 0.99) {
          // Remove the point in the relation point list
          let newRelations = [...relations];
          newRelations[movingParameters.id].points.splice(movingParameters.auxIdx, 1);
          setRelations(newRelations);

          // If some relations are connected to the removed section, adjust its joint value
          let newConnectors = [...connectors];
          newConnectors.forEach((con, i) => {
            if (con.type === "relation" && con.typeId ===  newRelations[movingParameters.id].id) {
              if (Math.floor(con.joint) === movingParameters.auxIdx || Math.floor(con.joint) === movingParameters.auxIdx + 1) {
                let prop = con.joint - Math.floor(con.joint);
                let dist1 = getMagnitude(getVector(points[movingParameters.auxIdx], points[movingParameters.auxIdx + 1]));
                let dist2 = getMagnitude(getVector(points[movingParameters.auxIdx + 1], points[movingParameters.auxIdx + 2]));
                let distTotal = dist1 + dist2;
                if (Math.floor(con.joint) === movingParameters.auxIdx) {
                  newConnectors[i].joint = movingParameters.auxIdx + (prop * dist1) / distTotal;
                } else {
                  newConnectors[i].joint = movingParameters.auxIdx + (dist1 + prop * dist2) / distTotal;
                }
              } else if (Math.floor(con.joint) > movingParameters.auxIdx) {
                newConnectors[i].joint -= 1.0;
              }
            }
          });
          setConnectors(newConnectors);
          //updateGlobalState();
        }
      }
    }
    setMovingParameters(null);
  };

  const getProteinCoords = (protName, prop = -1.0) => {
    let point = null;
    let prot = proteins.find((prot) => prot.name === protName);
    if (prot) {
      if (prop < 0.0) {
        point = { x: prot.x, y: prot.y };
      } else if (prop < 1.0) {
        point = { x: prot.x - prot.w / 2 + prot.w * (prop - 0), y: prot.y - prot.h / 2 };
      } else if (prop < 2.0) {
        point = { x: prot.x + prot.w / 2, y: prot.y - prot.h / 2 + prot.h * (prop - 1) };
      } else if (prop < 3.0) {
        point = { x: prot.x + prot.w / 2 - prot.w * (prop - 2), y: prot.y + prot.h / 2 };
      } else {
        point = { x: prot.x - prot.w / 2, y: prot.y + prot.h / 2 - prot.h * (prop - 3) };
      }
    }
    return point;
  };

  const getConnectorCoords = (connectorId, stop = 10) => {
    let point = null;
    let connector = connectors.find((con) => con.id === connectorId);
    if (connector) {
      if (connector.type === "protein") {
        point = getProteinCoords(connector.typeId, connector.joint);
      } else if (connector.type === "relation") {
        let rel = relations.find((rel) => rel.id === connector.typeId);
        if (rel && stop > 0) {
          let [start, end] = [getProteinCoords(rel.startProtein, rel.startJoint), getConnectorCoords(rel.endConnectorId, stop - 1)];

          if (end !== null) {
            let points = [{ x: start.x, y: start.y }];
            rel.points.forEach((point) => {
              points.push({ x: point.x, y: point.y });
            });
            points.push({ x: end.x, y: end.y });

            let k = connector.joint;
            let k_idx = Math.floor(k);

            if (k_idx >= points.length - 1)
              k_idx = points.length - 2

            if (k_idx < points.length - 1) {
              k -= Math.floor(k);
              point = { x: points[k_idx].x * (1 - k) + points[k_idx + 1].x * k, y: points[k_idx].y * (1 - k) + points[k_idx + 1].y * k };
            }
          }
        }
      } else if (connector.type === "position") {
        point = { x: connector.x, y: connector.y };
      }
    }

    return point;
  };

  const getConnectorAngle = (connectorId, stop = 10) => {
    let angle = null;
    let connector = connectors.find((con) => con.id === connectorId);
    if (connector) {
      if (connector.type === "protein") {
        if (connector.joint < 1.0) {
          angle = 90;
        } else if (connector.joint < 2.0) {
          angle = 180;
        } else if (connector.joint < 3.0) {
          angle = 270;
        } else {
          angle = 0;
        }
      } else if (connector.type === "relation") {
        let rel = relations.find((rel) => rel.id === connector.typeId);
        if (rel && stop > 0) {
          let [start, end] = [getProteinCoords(rel.startProtein, rel.startJoint), getConnectorCoords(rel.endConnectorId, stop - 1)];

          if (end !== null) {
            let points = [{ x: start.x, y: start.y }];
            rel.points.forEach((point) => {
              points.push({ x: point.x, y: point.y });
            });
            points.push({ x: end.x, y: end.y });

            let k_idx = Math.floor(connector.joint);

            if (k_idx < points.length - 1) {
              angle = Math.atan2(points[k_idx + 1].y - points[k_idx].y, points[k_idx + 1].x - points[k_idx].x);
              angle = (180 * angle) / Math.PI + 90;
            }
          }
        }
      }
    }

    return angle;
  };

  const changeProteinValidation = (proteinName) => {
    let errorCode = 0;
    if (proteins.findIndex((prot) => prot.name === proteinName && prot.name !== proteinDialog) >= 0) {
      errorCode = 1;
    } else {
      if (!proteinName) {
        errorCode = 2;
      }
      if (typeof proteinName !== "undefined" && (!proteinName.match(/^[a-zA-Z0-9_]{1,14}$/) || proteinName[0].match(/^[0-9]+$/))) {
        errorCode = 2;
      }
    }
    return errorCode;
  };

  const changeProtein = (newProteinName, newDegradation, newBasal, newDiffusion, newNegval, newIconcentration) => {
    if (visualEnabled) {
      let proteinIdx = proteins.findIndex((prot) => prot.name === proteinDialog);
      if (proteinIdx >= 0) {
        let newProteins = [...proteins];
        newProteins[proteinIdx].name = newProteinName;
        newProteins[proteinIdx].w = newProteinName.length * 14 + 20;
        newProteins[proteinIdx].degradation = newDegradation;
        newProteins[proteinIdx].basal = newBasal;
        newProteins[proteinIdx].diffusion = newDiffusion;
        newProteins[proteinIdx].negval = newNegval;
        newProteins[proteinIdx].iconcentration = newIconcentration;

        let newConnectors = [...connectors];
        for (let i = 0; i < newConnectors.length; i++) {
          if (newConnectors[i].type === "protein" && newConnectors[i].typeId === proteinDialog) {
            newConnectors[i].typeId = newProteinName;
          }
        }
        let newRelations = [...relations];
        for (let i = 0; i < newRelations.length; i++) {
          if (newRelations[i].startProtein === proteinDialog) {
            newRelations[i].startProtein = newProteinName;
          }
        }
        setProteins(newProteins);
        setConnectors(newConnectors);
        setRelations(newRelations);
      }
    } else {
      let newProteins = Object.assign({}, props.proteins);
      let proteinIdx = newProteins.protein.findIndex((prot) => prot.$.species === proteinDialog);
      newProteins.protein[proteinIdx].$.species = newProteinName;
      newProteins.protein[proteinIdx].dynamics.$.negval = newNegval;
      newProteins.protein[proteinIdx].iconcentration = newIconcentration;
      props.handlerValue(newProteins);
    }
    setProteinDialog(null);
  };

  const changeRelationValidation = () => {
    return true;
  };

  const changeRelation = (newThreshold, newN, newK) => {
    let newRelations = [...relations];
    let relationIdx = newRelations.findIndex((rel) => rel.id === relationDialog);
    newRelations[relationIdx].threshold = newThreshold;
    newRelations[relationIdx].n = newN;
    newRelations[relationIdx].k = newK;
    setRelations(newRelations);
    setRelationDialog(null);
  };

  // Protein Dialog variables
  let proteinsObj = props.proteins;
  if (!Array.isArray(proteinsObj.constants)) {
    if (typeof proteinsObj.constants === "undefined")
    proteinsObj = {"constants":[{$:{stage:"all"}}]};
    else
    proteinsObj.constants = [proteinsObj.constants];
  } 
  let constants = Object.keys(proteinsObj.constants[0]).slice(1);
  let proteinDialogNegval = null;
  let proteinDialogIconcentration = null;
  if (proteinDialog !== null) {
    if (visualEnabled) {
      let prot = proteins.find((prot) => prot.name === proteinDialog);
      if (prot) {
        proteinDialogNegval = prot.negval;
        proteinDialogIconcentration = prot.iconcentration;
      }
    } else {
      let prot = props.proteins.protein.find((prot) => prot.$.species === proteinDialog);
      if (prot) {
        proteinDialogNegval = prot.dynamics.$.negval;
        proteinDialogIconcentration = prot.iconcentration;
      }
    }
  }

  return (
    <div
      align="left"
      style={{
        margin: "10px",
        marginTop: "70px",
        width: "800px",
        backgroundColor: "ghostwhite",
        borderRadius: "14px",
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        overflow: "hidden auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#cfe8fc",
          borderRadius: "10px",
          height: "80px",
          boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div style={{ display: "inline-block" }}>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(event, newValue) => {
              if (newValue !== null) setMode(newValue);
            }}
            aria-label="text alignment"
          >
            <ToggleButtonTitle value={0} aria-label="centered" disabled={!visualEnabled} color="primary" variant="contained">
              <Typography variant="h5">Visual</Typography>
            </ToggleButtonTitle>
            <ToggleButtonTitle value={1} aria-label="centered">
              <Typography variant="h5">Formula</Typography>
            </ToggleButtonTitle>
          </ToggleButtonGroup>
        </div>
      </div>
      {mode === 0 && (
        <React.Fragment>
        <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightsteelblue", borderRadius: "14px" }}>
          <ToggleButtonGroup
            value={tool}
            exclusive
            onChange={(event, newValue) => {
              if (newValue !== null) setTool(newValue);
            }}
            aria-label="text alignment"
            style={{ display: "inline-block" }}
          >
            <ToggleButtonAction value={0} aria-label="centered">
                <NearMe />
            </ToggleButtonAction>
            <ToggleButtonAction value={1} aria-label="centered"> New Protein </ToggleButtonAction>
            <ToggleButtonAction value={2} aria-label="centered"> New Positive Regulation </ToggleButtonAction>
            <ToggleButtonAction value={3} aria-label="centered"> New Negative Regulation </ToggleButtonAction>
            <ToggleButtonAction value={4} aria-label="centered"> Remove </ToggleButtonAction>
          </ToggleButtonGroup>
        </div>
        <div style={{display: "flex", justifyContent: "center", color: "#fff", backgroundColor: "rgba(97,97,97,0.5)", borderRadius: "4px", height: "22.5px"}}>
        { tool === 0 && proteins.length > 0 && <Typography>Select proteins and regulations to move</Typography>}
        { tool === 1 && <Typography>Click on the gray area to create a new protein</Typography> }
        { (tool === 2 || tool === 3) && <Typography>Click down on the source protein and click up on the destination element</Typography> }
        { tool === 4 && <Typography>Click on any element to remove it</Typography> }
        </div>
        </React.Fragment>
      )}

      <ProteinDialog
        open={proteinDialog !== null}
        proteinName={proteinDialog}
        degradation={proteinDialog !== null && visualEnabled ? proteins.find((prot) => prot.name === proteinDialog).degradation : null}
        basal={proteinDialog !== null && visualEnabled ? proteins.find((prot) => prot.name === proteinDialog).basal : null}
        diffusion={proteinDialog !== null && visualEnabled ? proteins.find((prot) => prot.name === proteinDialog).diffusion : null}
        visualEnabled={visualEnabled}
        negval={proteinDialogNegval}
        iconcentration={proteinDialogIconcentration}
        constants={constants}
        handleClose={() => setProteinDialog(null)}
        handleAccept={changeProtein}
        handleValidation={changeProteinValidation}
        celltypeLookup={props.celltypeLookup}
        cellTypeColorList={props.cellTypeColorList}
      />

      <RelationDialog
        open={relationDialog !== null}
        type={relationDialog !== null ? relations.find((rel) => rel.id === relationDialog).type : null}
        threshold={relationDialog !== null ? relations.find((rel) => rel.id === relationDialog).threshold : null}
        n={relationDialog !== null ? relations.find((rel) => rel.id === relationDialog).n : null}
        k={relationDialog !== null ? relations.find((rel) => rel.id === relationDialog).k : null}
        constants={constants}
        handleClose={() => setRelationDialog(null)}
        handleAccept={changeRelation}
        handleValidation={changeRelationValidation}
      />

      {mode === 0 && (
        <React.Fragment>
          <div
            onMouseDown={onViewportMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            style={{
              maxWidth: "1200px",
              backgroundColor: "rgba(220, 220, 220, 0.5)",
              borderRadius: "14px",
              boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
              overflow: "hidden auto",
            }}
          >
            <svg id="editor" width="800px" height="400px">
              {relations.map((rel, i) => {
                let [start, end] = [getProteinCoords(rel.startProtein, rel.startJoint), getConnectorCoords(rel.endConnectorId)];
                return (
                  start &&
                  end && (
                    <ProteinRelation
                      key={i}
                      type={rel.type}
                      startX={start.x}
                      startY={start.y}
                      endX={end.x}
                      endY={end.y}
                      angle={getConnectorAngle(rel.endConnectorId)}
                      points={rel.points}
                      onRelationStartMouseDown={onMouseDown({ type: "relationStart", id: i })}
                      onRelationEndMouseDown={onMouseDown({ type: "relationEnd", id: i })}
                      onRelationPointMouseDown={onRelationMouseDown({ type: "relationPoint", id: i })}
                      onRelationMouseDown={onRelationMouseDown({ type: "relation", id: i })}
                      onDoubleClick={(event) => {
                        setRelationDialog(rel.id);
                      }}
                    />
                  )
                );
              })}

              {proteins.map((protein, i) => (
                <ProteinNode
                  key={i}
                  name={protein.name}
                  x={protein.x}
                  y={protein.y}
                  width={protein.w}
                  height={protein.h}
                  degradation={protein.degradation}
                  basal={protein.basal}
                  diffusion={protein.diffusion}
                  onMouseDown={onMouseDown({ type: "protein", id: i })}
                  onDoubleClick={(event) => {
                    setProteinDialog(protein.name);
                  }}
                  onRemoveProp={onRemoveProteinProp(i)}
                />
              ))}
            </svg>
          </div>
          <ProteinList proteins={props.proteins} onModifyProtein={setProteinDialog} onRemoveProtein={removeProtein} />
        </React.Fragment>
      )}
      {mode === 1 && (
        <FormulaEditor
          proteins={props.proteins}
          onChangeFormula={onChangeFormula}
          onNewProtein={addNewProtein}
          onRemoveProtein={removeProtein}
          onModifyProtein={setProteinDialog}
        />
      )}
    </div>
  );
}

export default ProteinsEditor;
