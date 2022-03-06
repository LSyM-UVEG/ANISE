import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { ResizablePanel } from "./ResizablePanel";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import { CycleDivision } from "./CycleDivision";
import { PhaseData } from "./PhasesTable";
import { CycleDispersion } from "./CycleDispersion";
import { CycleSpeed } from "./CycleSpeed";
import { SelectorStageCelltype } from "./SelectorStageCelltype";

function newProperty(value, cellType) {
  return { _: value + "", $: { t: cellType } };
}

function newPhase(stage, cellType, a0i, a0f, prop, reldiv) {
  return {
    _: stage + "",
    $: {
      t: cellType,
      a0i: a0i + "",
      a0f: a0f + "",
      prop: prop + "",
      reldiv: reldiv + "",
    },
  };
}

function checkProperty(property, cellType, cycle, remove = false, newCelltypeName = "") {
  let modified = false;
  let indexSelected = 0;

  if (!cycle[property]) {
    cycle[property] = [];
    modified = true;
  }

  if (!Array.isArray(cycle[property])) {
    cycle[property] = [cycle[property]];
    modified = true;
  }

  // filtra por tipo de celula
  let propertyFound = cycle[property].map((value, index) => {
    if (value.$.t === cellType) {
      indexSelected = index;
      return value;
    }
    return null;
  });

  // Si no existe la propiedad con ese tipo de celula, se crea
  if ((propertyFound.length === 0 && !remove) || (propertyFound[indexSelected] === null && !remove)) {
    let newPropertyValue = newProperty("0", (newCelltypeName !== "" ) ? newCelltypeName: cellType);
    cycle[property] = [...cycle[property], newPropertyValue];
    modified = true;
  } else if (propertyFound[indexSelected] !== null) {
    // Si existe y se quiere borrar
    if (remove) { 
      cycle[property].splice(indexSelected);
      modified = true;
    }
    // Si existe y se quiere renombrar
    if (newCelltypeName !== "") {
      cycle[property][indexSelected].$.t = newCelltypeName;
      modified = true;
    }
  }
  return modified;
}

function checkPhase(phase, cellType, cycle, remove = false, newCelltypeName = "") {
  let modified = false;
  let indexSelected = 0;

  if (!Array.isArray(cycle.phase)) cycle.phase = [cycle.phase];

  // filtra por tipo de celula
  let phaseFound = cycle.phase.map((value, index) => {
    if (value && value.$ && value.$.t === cellType && (remove || value._ === phase + "")) {
      indexSelected = index;
      return value;
    }
    return null;
  });

  // Si no existe fases para ese tipo de célula, se crean
  if (phaseFound[indexSelected] === null && !remove) {
    let phaseValue = newPhase(1, (newCelltypeName !== "") ? newCelltypeName : cellType, 1, 1, 1, 0.7);
    cycle.phase = typeof cycle.phase[0] === "undefined" ? [phaseValue] : [...cycle.phase, phaseValue];
    modified = true;
  } else if (remove) {
    // Se eliminan todas las fases asociadas al celltype
    phaseFound.forEach((phase, index) => phase && cycle.phase.splice(index));
  }

  // Si se quiere renombrar el celltype
  if (newCelltypeName !== "") {
    cycle.phase.forEach((value, index) => {
      if (value.$.t === cellType) 
        cycle.phase[index].$.t = newCelltypeName; 
    })
    modified = true;
  }

  return modified;
}

export function checkCellType(cycle, newCelltype, remove = false, newCellTypeName = "") {
  // se comprueba si todas las propiedades tienen valor para ese tipo de celula, en caso contrario se crea
  let modified = checkProperty("dispersion", newCelltype, cycle, remove, newCellTypeName);
  modified = checkProperty("divisiondispersion", newCelltype, cycle, remove, newCellTypeName) || modified;
  modified = checkProperty("divisiondispersionlimit", newCelltype, cycle, remove, newCellTypeName) || modified;
  modified = checkProperty("divisionshift", newCelltype, cycle, remove, newCellTypeName) || modified;
  modified = checkProperty("speed", newCelltype, cycle, remove, newCellTypeName) || modified;
  modified = checkPhase(1, newCelltype, cycle, remove, newCellTypeName) || modified;
  return modified;
}

export function Cycles(props) {
  const [idCycleSelected, setIdCycleSelected] = React.useState(0);
  const [cellTypeSelected, setCellTypeSelected] = React.useState(Object.keys(props.global.types)[0]);
  const [phase, setPhase] = React.useState(1);

  const changePhase = (e, phaseValue) => {
    if (phase !== phaseValue) setPhase(phaseValue);
  };

  const getPropertyValue = (property) => {
    let arrayProperty = props.cycles[idCycleSelected][property];
    if (!Array.isArray(arrayProperty)) arrayProperty = [arrayProperty];
    const propertyValue = arrayProperty.filter((value) => value.$.t === cellTypeSelected);

    return propertyValue.length > 0 ? propertyValue[0]._ : "0";
  };

  // const getPhaseValue = (phase, property) => {
  //   let arrayPhases = props.cycles[idCycleSelected].phase;
  //   if (!Array.isArray(arrayPhases)) arrayPhases = [arrayPhases];
  //   const phaseSelected = arrayPhases.filter((value) => value.$.t === cellTypeSelected && value._ === phase + "");

  //   return phaseSelected.length > 0 ? phaseSelected[0].$[property] : null;
  // };

  const setPropertyValue = (path, name, data) => (event, newValue) => {
    const property = name;
    const arrayProperty = props.cycles[idCycleSelected][property];

    //const propertyValue = arrayProperty.filter((value) => value.$.t === cellTypeSelected);
    let indexSelected = 0;
    let propertyFound = arrayProperty.map((value, index) => {
      if (value.$.t === cellTypeSelected) {
        indexSelected = index;
        return value;
      }
      return null;
    });

    if (propertyFound[indexSelected] !== null) {
      propertyFound[indexSelected]._ = typeof newValue === "undefined" ? event.target.value : newValue;
      props.handlerValue([idCycleSelected, property], indexSelected, propertyFound[indexSelected]);
    }
  };

  const setPhaseValue = (phase, property, newValue) => {
    const arrayProperty = props.cycles[idCycleSelected].phase;

    let indexSelected = 0;
    let propertyFound = arrayProperty.map((value, index) => {
      if (value.$.t === cellTypeSelected && value._ === phase + "") {
        indexSelected = index;
        return value;
      }
      return null;
    });

    if (propertyFound[indexSelected] !== null) {
      propertyFound[indexSelected].$[property] = typeof newValue === "undefined" ? 0.0 : newValue;
      props.handlerValue([idCycleSelected, "phase"], indexSelected, propertyFound[indexSelected]);
    }
  };

  const getPhasesProps = () => {
    let arrayPhases = props.cycles[idCycleSelected].phase;
    if (!Array.isArray(arrayPhases)) arrayPhases = [arrayPhases];
    let proportions = [];
    arrayPhases.map((value) => {
      if (value.$.t === cellTypeSelected) proportions[value._ - 1] = value.$.prop;
      return proportions;
    });

    if (proportions.length === 0) {
      addNewPhase();
      return getPhasesProps();
    }
    return proportions;
  };

  const getPhases = () => {
    let arrayPhases = props.cycles[idCycleSelected].phase;
    if (!Array.isArray(arrayPhases)) arrayPhases = [arrayPhases];
    let phases = [];
    arrayPhases.map((value) => {
      if (value.$.t === cellTypeSelected) phases[value._ - 1] = value;
      return phases;
    });

    if (phases.length === 0) {
      addNewPhase();
      return getPhases();
    }

    return phases;
  };

  const handlerChoiceCellType = (value) => {
    let newCellType = value;
    let cycle = props.cycles[idCycleSelected];

    // se comprueba si debe agregar un nuevo celltype en el ciclo seleccionado
    if (checkCellType(cycle, newCellType)) props.handlerValue([], idCycleSelected, cycle);

    setCellTypeSelected(newCellType);
  };

  const addNewPhase = () => {
    // Check number of stages in the cycle selected and celltype selected
    let arrayProperty = props.cycles[idCycleSelected].phase;
    if(!Array.isArray(arrayProperty)) arrayProperty = [arrayProperty];
    let phasesArray = arrayProperty.filter((value) => value.$.t === cellTypeSelected);
    let cycle = props.cycles[idCycleSelected];
    if (!Array.isArray(cycle.phase)) cycle.phase = [cycle.phase];

    if (phasesArray.length > 10) // Maximum number of phases
      return;

    // The proportion in the newPhase will be the last proportion * 0.5
    let newProportion = 1.0;
    if (phasesArray.length > 0) {
      newProportion = parseFloat(phasesArray[phasesArray.length - 1].$.prop) * 0.5;
      if (isNaN(newProportion)) {
        newProportion = 0.0;
      }
      phasesArray[phasesArray.length - 1].$.prop = newProportion + "";
    }
    cycle.phase = [...cycle.phase, newPhase(phasesArray.length + 1, cellTypeSelected, "1.0", "1.0", newProportion + "", 0.7)];

    props.handlerValue([], idCycleSelected, cycle);
  };

  const removeSelectedPhase = () => {
    // get number of stage in the cycle selected and celltype selected
    const arrayProperty = props.cycles[idCycleSelected].phase;

    let indexPhaseToDelete = 0;
    let numberOfPhases = 0;
    let proportionRemoved = 0.0; // Phase proportion removed for adding to other phase
    let arrayPhasesFiltered = arrayProperty.map((value, index) => {
      if (value.$.t === cellTypeSelected) {
        numberOfPhases += 1;
        if (value._ === phase + "") {
          indexPhaseToDelete = index;
          proportionRemoved = parseFloat(value.$.prop);
          return value;
        }
      }
      return null;
    });

    // si se ha encontrado, se extrae la phase del vector
    if (numberOfPhases > 1 && arrayPhasesFiltered[indexPhaseToDelete] !== null) {
      let cycle = props.cycles[idCycleSelected];
      let newPhaseArray = [...cycle.phase.slice(0, indexPhaseToDelete), ...cycle.phase.slice(indexPhaseToDelete + 1)];

      let idPhaseWhereAddProportionRemoved = numberOfPhases > phase ? phase : numberOfPhases - 1;

      // se renumeran las phases pertinentes
      let idPhase = 1;
      let newPhaseArray2 = newPhaseArray.map((value, index) => {
        if (value.$.t === cellTypeSelected) {
          value._ = idPhase + "";
          if (idPhase === idPhaseWhereAddProportionRemoved) value.$.prop = parseFloat(value.$.prop) + proportionRemoved + ""; // add prop removed
          idPhase += 1;
        }
        return value;
      });

      //cycle.phase = newPhaseArray2;
      if (idPhase <= phase) changePhase(null, phase - 1);
      props.handlerValue([idCycleSelected], "phase", newPhaseArray2);
    }
  };

  // Manejador para cambiar de stage
  const handlerChoiceStage = (stagesList) => (value) => {
    // indice del ciclo dentro del array
    let objSelected = { index: 0 };

    let cycles = props.cycles;

    // Se comprueba si existe un ciclo para ese stage, en caso contrario se crea
    if (checkStage(stagesList)(cycles, value, objSelected)) props.handlerValue([], null, cycles);

    // actualiza el indice del ciclo seleccionado y debe repintar
    setIdCycleSelected(objSelected.index);
  };

  const checkStage = (stagesList) => (cycles, stage, idCycleFound, remove = false) => {
      let modified = false;

      // indice del ciclo dentro del array de ese stage
      idCycleFound.index = 0;

      // busca el ciclo asociado al stage
      let cycleSelected = cycles.map((value, index) => {
        if (value.$.stage === stage) {
          idCycleFound.index = index;
          return value;
        }
        return null;
      });

      // si no existe ciclo asociado al stage hace una copia del valor de 0 o de all
      if (cycleSelected[idCycleFound.index] === null) {
        // si el stage no es all, se copia su valor en todos los stages
        if (stage !== "all") {
          // de donde copia
          let cycleCopy = JSON.parse(JSON.stringify(cycles.filter((value) => value.$.stage === "all")));
          if (cycleCopy.length === 0) cycleCopy = JSON.parse(JSON.stringify(cycles.filter((value) => value.$.stage === "1")));

          // Se crea la nueva lista de ciclos
          let newCycles = Object.keys(stagesList).map((idStage) => {
            let cycleFound = cycles.filter((value) => value.$.stage === idStage);
            if (cycleFound.length === 0) {
              // si no hay ciclo para ese stage se copia uno nuevo
              let cycleCopyAux = JSON.parse(JSON.stringify(cycleCopy));
              cycleCopyAux[0].$.stage = idStage + "";
              return cycleCopyAux[0];
            } else {
              // idCycleFound.index = cycles.length; // sera el ultimo ciclo
              return cycleFound[0];
            }
          });
          cycles.splice(0, cycles.length);
          cycles.push(...newCycles);
          idCycleFound.index = 0;
          modified = true;
        } else {
          // si no hay stage all y es all -> borrar todo y stage all sera copia de stage 1
          let cycleCopy = JSON.parse(JSON.stringify(cycles.filter((value) => value.$.stage === idCycleSelected + 1 + "")));
          if (cycleCopy.length === 0) cycleCopy = JSON.parse(JSON.stringify(cycles[0])); // TODO. mas robusto crear uno desde 0

          cycleCopy[0].$.stage = "all";
          cycles.splice(0, cycles.length);
          cycles.push(cycleCopy[0]);
          idCycleFound.index = 0;
          modified = true;
        }
      } else if (remove) {
        // Si se ha encontrado y se quiere eliminar
        cycles.splice(idCycleFound.index);
        idCycleFound.index = 0;
        modified = true;
      }

      return modified;
    };

  useEffect(() => {
    // initial check
    let cycle = props.cycles[idCycleSelected];
    if (checkCellType(cycle, cellTypeSelected)) props.handlerValue([], idCycleSelected, cycle);
    // eslint-disable-next-line 
  }, [idCycleSelected, cellTypeSelected]);

  useEffect(() => {
    setCellTypeSelected(Object.keys(props.global.types)[0]);
  }, [props.global.types])

  // Check if exists idCycleSelected
  if (idCycleSelected >= props.cycles.length) {
    setIdCycleSelected(0);
    return;
  }
  
  // check if exists cellTypeSelected
  if (Object.keys(props.global.types).findIndex( (value) => value === cellTypeSelected) === -1) {
    setCellTypeSelected(Object.keys(props.global.types)[0]);
    return;
  }

  // check if cycles exists
  if (typeof props.cycles[idCycleSelected] === "undefined") {
    props.cycles[idCycleSelected] = {$:{stage:"all"}};
    //props.handlerValue([], 0, props.cycles[0]);
    
    let cycle = props.cycles[idCycleSelected];
    if (checkCellType(cycle, cellTypeSelected)) props.handlerValue([], idCycleSelected, cycle);
  }
  
  let stageLookupObject = {};
  props.stages.map((stage, i) => {
    stageLookupObject[i + 1] = (i + 1).toString();
    return ""; //sin return da warning
  });

  return (
    <Grid component="span" container justify={"center"} alignContent={"center"}>
      <Grid /*item xs={11} md={11} lg={9}*/ style={{ backgroundColor: "GhostWhite", padding: "0  0 0", marginTop: "70px", width: "1100px" }}>
              <div>
                <SelectorStageCelltype
                  stageList={stageLookupObject}
                  stageSelected={props.cycles[idCycleSelected].$.stage}
                  stageHandler={handlerChoiceStage(stageLookupObject)}
                  celltypeList={props.global.types}
                  celltypeSelected={cellTypeSelected}
                  celltypeHandler={handlerChoiceCellType}
                  cellTypeColorList={props.cellTypeColorList}
                />

                <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", alignContent: "stretch", marginTop: "10px" }}>
                  <CycleDispersion getPropertyValue={getPropertyValue} setPropertyValue={setPropertyValue} />
                  <CycleSpeed getPropertyValue={getPropertyValue} setPropertyValue={setPropertyValue} />
                </div>

                <CycleDivision
                  stage={props.cycles[idCycleSelected].$.stage}
                  celltype={cellTypeSelected}
                  divisionShift={getPropertyValue("divisionshift")}
                  divisionDispersion={getPropertyValue("divisiondispersion")}
                  divisionDispersionLimit={getPropertyValue("divisiondispersionlimit")}
                  handlerUpdate={setPropertyValue}
                />

                <Grid
                  component="div"
                  container
                  justify={"center"}
                  alignItems={"center"}
                  alignContent={"stretch"}
                  style={{
                    backgroundColor: "#cfe8fc",
                    borderRadius: "10px",
                    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                    height: "50px",
                  }}
                >
                  <Grid item xs={3} justify="stretch">
                    <Button variant="text" fullWidth="true" endIcon={<AddCircle />} onClick={addNewPhase}>
                      Add new phase
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="center" variant="h5">
                      {" "}
                      Phases{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="text" fullWidth="true" startIcon={<RemoveCircle />} onClick={removeSelectedPhase}>
                      Remove Phase {phase}{" "}
                    </Button>
                  </Grid>
                </Grid>
                <ResizablePanel
                  sizes={getPhasesProps()}
                  handleChangePhase={changePhase}
                  handleChangeProps={setPhaseValue}
                  selected={phase - 1}
                  phasesArray={getPhases()}
                />
                <PhaseData selected={phase - 1} phasesArray={getPhases()} handleChangePhase={changePhase} updateValue={setPhaseValue} />
              </div>
      </Grid>
    </Grid>
    // </div>
  );
}

export default Cycles;
