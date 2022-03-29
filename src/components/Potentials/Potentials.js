import React, { useState, useEffect } from "react";
import PotentialsHexagonWheel from "./PotentialsHexagonWheel";
import PotentialsForceHexagon from "./PotentialsForceHexagon";

import { SelectorStageCelltype } from "../Cycles/SelectorStageCelltype";

import { FunctionButton } from "../Cycles/FunctionEditor";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

import Grid from "@material-ui/core/Grid";
import { InputNumber } from "./InputNumber";
import "../../assets/css/App.css";
import { IconButton } from "@material-ui/core";
import KeyboardArrowUpOutlinedIcon from '@material-ui/icons/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@material-ui/icons/KeyboardArrowDownOutlined';

function checkPairProperty(property, cellType, potential, global, remove = false, newCellTypeName = "") {
  let modified = false;

  if (typeof potential === "undefined")
    return modified;

  if (!potential[property]) {
    potential[property] = [];
    modified = true;
  }

  if (!Array.isArray(potential[property])) {
    potential[property] = [potential[property]]
    modified = true;
  }

  if (remove) {
    let newPotentialProp =  potential[property].filter( value => value.$.t1 !== cellType && value.$.t2 !== cellType );
    potential[property] = [...newPotentialProp];
    return true;
  }

  // rename
  if (newCellTypeName !== "") {
    potential[property].forEach(value => {
      if (value.$.t1 === cellType) value.$.t1 = newCellTypeName;
      if (value.$.t2 === cellType) value.$.t2 = newCellTypeName;
    });
    cellType = newCellTypeName;
  }

  let cellTypeLookUp = Object.keys(global.types);
  cellTypeLookUp.push("empty");

  for (let i = 0; i < potential[property].length; i++) {
    let value = potential[property][i];
    if (value.$.t1 === cellType) {
      let index = cellTypeLookUp.indexOf(value.$.t2);
      if (index > -1) {
        cellTypeLookUp.splice(index, 1);
      }
    } else if (value.$.t2 === cellType) {
      let index = cellTypeLookUp.indexOf(value.$.t1);
      if (index > -1) {
        cellTypeLookUp.splice(index, 1);
      }
    }
  }

  for (let i = 0; i < cellTypeLookUp.length; i++) {
    let newPropertyValue = { $: { t1: cellType, t2: cellTypeLookUp[i] }, _: "0.0" };
    potential[property] = [...potential[property], newPropertyValue];
    modified = true;
  }

  return modified;
};

function checkProperty(property, cellType, potential, remove = false, newCellTypeName = "") {
  let modified = false;
  let indexSelected = 0;

  
  if (typeof potential === "undefined")
    return modified;

  if (!potential[property]) {
    potential[property] = [];
    modified = true;
  }

  if (!Array.isArray(potential[property])) {
    potential[property] = [potential[property]]
    modified = true;
  }

  // filtra por tipo de celula
  let propertyFound = potential[property].map((value, index) => {
    if (value.$.t === cellType) {
      indexSelected = index;
      return value;
    }
    return null;
  });

  // Si no existe la propiedad con ese tipo de celula, se crea
  if ((propertyFound.length === 0 && !remove) || (propertyFound[indexSelected] === null && !remove)) {
    let newPropertyValue = { $: { t: newCellTypeName === "" ? cellType : newCellTypeName }, _: "0.0" };
    potential[property] = [...potential[property], newPropertyValue];
    modified = true;
  } else if (propertyFound[indexSelected] !== null) {
      if (remove) {
        // Si existe y se quiere borrar
        potential[property].splice(indexSelected);
        modified = true;
      }
      if (newCellTypeName !== "") {
        potential[property][indexSelected].$.t = newCellTypeName;
        modified = true;
      }
  }

  return modified;
};


export function checkCellTypePotential(potential, newCelltype, global, remove = false, newCelltypeName = "") {
  // se comprueba si todas las propiedades tienen valor para ese tipo de celula, en caso contrario se crea
  let modified = false;

  if (newCelltype !== "empty") {
    modified = checkProperty("KAPPA", newCelltype, potential, remove, newCelltypeName);
    modified = checkProperty("GAMMA", newCelltype, potential, remove, newCelltypeName) || modified;
    modified = checkProperty("force_x", newCelltype, potential, remove, newCelltypeName) || modified;
    modified = checkProperty("force_y", newCelltype, potential, remove, newCelltypeName) || modified;
  }

  modified = checkPairProperty("LAMBDA", newCelltype, potential, global, remove, newCelltypeName) || modified;
  modified = checkPairProperty("lambda", newCelltype, potential, global, remove, newCelltypeName) || modified;

  return modified;
};

function Potentials(props) {
  const [cellTypeSelected, setCellTypeSelected] = useState(Object.keys(props.global.types)[0]);
  const [otherCellTypeSelected, setOtherCellTypeSelected] = useState("empty");
  //const [stageSelected, setStageSelected] = useState("all");
  const [rotationWheel, setRotationWheel] = useState(0);
  const [idPotentialSelected, setPotentialSelected] = useState(0);

  const handlerCellTypeSelected = (newCellType) => {
    let potential = props.potentials[idPotentialSelected];

    // se comprueba si debe agregar un nuevo celltype en el ciclo seleccionado
    if (checkCellTypePotential(potential, newCellType, props.global)) props.handlerValue([], idPotentialSelected, potential);

    setCellTypeSelected(newCellType);
    setForceValue({ x: getValueStageCell("force_x", idPotentialSelected, newCellType), y: getValueStageCell("force_y", idPotentialSelected, newCellType) });
  };

  // handler for changing stage
  const handlerStageSelected = (stagesList) => (value) => {
    let objSelected = {index: 0};
    let potentials = props.potentials;

    if(checkStage(stagesList)(potentials, value, objSelected)) props.handlerValue([], null, potentials);

    // Update current state
    setPotentialSelected(objSelected.index);
    setForceValue({ x: getValueStageCell("force_x", objSelected.index, cellTypeSelected), y: getValueStageCell("force_y", objSelected.index, cellTypeSelected) });
  };

  const checkStage = (stagesList) => (potentials, stage, idPotentialFound, remove = false) => {
    let modified = false;

    // potential index in main potential array with "stage"
    idPotentialFound.index = 0;

    // finding potential index for "stage"
    let potentialSelected = potentials.map((value, index) => {
      if (value && value.$ && value.$.stage === stage) {
        idPotentialFound.index = index;
        return value;
      }
      return null;
    });

    // if potential with "stage" does not exist --> do copy with from 0 index or stage all.
    if (potentialSelected[idPotentialFound.index] === null) {
      // si el stage no es all, se copia su valor en todos los stages
      if (stage !== "all") {
        // de donde copia
        let potentialCopy = JSON.parse(JSON.stringify(potentials.filter((value) => value.$.stage === "all"))); 
        if (potentialCopy.length === 0) potentialCopy = JSON.parse(JSON.stringify(potentials.filter((value) => value.$.stage === "1"))); 

        // Se crea la nueva lista de potentiales
        let newPotentials = Object.keys(stagesList).map((idStage) => {
          let potentialFound = potentials.filter((value) => value.$.stage === idStage);
          if ( potentialFound.length === 0) { // si no hay potrencial para ese stage se copia uno nuevo
            let potentialCopyAux = JSON.parse(JSON.stringify(potentialCopy));
            potentialCopyAux[0].$.stage = idStage + "";
            return potentialCopyAux[0];
          } else {
            // idCycleFound.index = cycles.length; // sera el ultimo ciclo
            return potentialFound[0];
          }
        });
        potentials.splice(0, potentials.length);
        potentials.push(...newPotentials);
        idPotentialFound.index = 0;
        modified = true;
      } else {
        // si no hay stage all y es all -> borrar todo y stage all sera copia de stage 1
        let potentialCopy = JSON.parse(JSON.stringify(potentials.filter((value) => value.$.stage === (idPotentialSelected + 1 + "")))); // Copia el actual
        if (potentialCopy.length === 0) potentialCopy = JSON.parse(JSON.stringify(potentials[0]));  // TODO. mas robusto crear uno desde 0
        
        potentialCopy[0].$.stage = "all";
        potentials.splice(0, potentials.length);
        potentials.push(potentialCopy[0]);
        idPotentialFound.index = 0;
        modified = true;
      }
    } else if (remove) {
      // Si se ha encontrado y se quiere eliminar
      potentials.splice(idPotentialFound.index);
      idPotentialFound.index = 0;
      modified = true;
    }

    return modified;
  };

  const handlerOtherCellTypeSelected = (name) => {
    setOtherCellTypeSelected(name);
  };

  // Forces. The local force is original * 10
  // set only local forces (input data * 10)
  const handlerForce = (force) => {
    setForce(force);
  };

  // register forces (input data * 10)
  const handlerForceValue = (force) => {
    setValue("force_x", isNaN(force.x) ? force.x : parseFloat(force.x) / 10.0 + "");
    setValue("force_y", isNaN(force.y) ? force.y : parseFloat(force.y) / 10.0 + "");
  };

  // set local force local forces (*10) and register (input original data)
  const handleValueForce = (valueName) => (newValue) => {
    handleValueLocalForce(valueName)(newValue);
    return setValue(valueName, isNaN(newValue) ? newValue : -newValue);
  };

  // set only local forces (input original data)
  const handleValueLocalForce = (valueName) => (newValue) => {
    if (newValue === "") newValue = "0";
    let forceAuxX = valueName === "force_x" ? (isNaN(newValue) ? newValue : -parseFloat(newValue) * 10.0 + "") : force.x;
    let forceAuxY = valueName === "force_y" ? (isNaN(newValue) ? newValue : -parseFloat(newValue) * 10.0 + "") : force.y;
    setForce({ x: forceAuxX, y: forceAuxY });
  }
  /////////////////////////////////////


  const getPairValueStageCell = (valueName) => {
    let potential = props.potentials[idPotentialSelected];

    if (typeof potential === "undefined" || typeof potential.$ === "undefined" || typeof potential.$.stage === "undefined") {
      props.potentials[idPotentialSelected] = {$:{stage:"all"}};
      potential = props.potentials[idPotentialSelected];
    }

    if (checkCellTypePotential(potential, cellTypeSelected, props.global) && checkCellTypePotential(potential, otherCellTypeSelected, props.global)) props.handlerValue([], idPotentialSelected, potential);
    const value = potential[valueName].filter((value) => (value.$.t1 === cellTypeSelected && value.$.t2 === otherCellTypeSelected) || (value.$.t2 === cellTypeSelected && value.$.t1 === otherCellTypeSelected));
    return value.length > 0 ? value[0]._ : null;
  };

  const getValueStageCell = (valueName, idPotential, celltype) => {
    let potential = props.potentials[idPotential];

    if (typeof potential === "undefined" || typeof potential.$ === "undefined" || typeof potential.$.stage === "undefined") {
      props.potentials[idPotential] = {$:{stage:"all"}};
      potential = props.potentials[idPotential];
    }
      
    if (checkCellTypePotential(potential, celltype, props.global)) props.handlerValue([], idPotential, potential);
    const value = potential[valueName].filter((value) => value.$.t === celltype);
    return value.length > 0 ? value[0]._ : null;

  };

  const getValue = (valueName) => {
    return getValueStageCell(valueName, idPotentialSelected, cellTypeSelected);
  };

  const handlePairValue = (valueName) => (newValue) => {
    if (newValue === "") newValue = "0";
    return setPairValue(valueName, newValue);
  };

  const setPairValue = (valueName, newValue) => {
    let potential = props.potentials[idPotentialSelected];

    checkCellTypePotential(potential, cellTypeSelected, props.global);

    let potentialValue = potential[valueName];
    if (!potentialValue) return;

    let celltype1 = cellTypeSelected;
    let celltype2 = otherCellTypeSelected;

    let valueIdx = potentialValue.findIndex((value) => {
      return (value.$.t1 === celltype1 && value.$.t2 === celltype2) || (value.$.t1 === celltype2 && value.$.t2 === celltype1);
    });
    if (valueIdx === -1) {
      return;
    }

    potential[valueName][valueIdx]._ = newValue;
    props.handlerValue([], idPotentialSelected, potential);
  };



  const handleValue = (valueName) => (newValue) => {
    if (newValue === "") newValue = "0";
    return setValue(valueName, newValue);
  };

  const setValue = (valueName, newValue) => {
    let potential = props.potentials[idPotentialSelected];

    checkCellTypePotential(potential, cellTypeSelected, props.global);

    let potentialValue = potential[valueName];
    if (!potentialValue) return;

    let valueIdx = potentialValue.findIndex((value) => {
      return value.$.t === cellTypeSelected;
    });
    if (valueIdx === -1) {
      return;
    }

    potential[valueName][valueIdx]._ = newValue;
    props.handlerValue([], idPotentialSelected, potential);
  };

  useEffect(() => {
    setCellTypeSelected(Object.keys(props.global.types)[0]);
    setPotentialSelected(0);
    setForce({ x: isNaN(getValue("force_x")) ? getValue("force_x") : parseFloat(getValue("force_x")) * 10.0 + "",
               y: isNaN(getValue("force_y")) ? getValue("force_y") : parseFloat(getValue("force_y")) * 10.0 + "" });
  }, [props.global.types])

  const [force, setForce] = useState({ x: "0", y: "0" });

  const setForceValue = (value) => {
    setForce({ x: isNaN(value.x) ? value.x : parseFloat(value.x) * 10.0 + "", y: isNaN(value.y) ? value.y : parseFloat(value.y) * 10.0 + "" });
  };

  // Checl if exists idPotentialSelected
  if (idPotentialSelected >= props.potentials.length) {
    setPotentialSelected(0);
    return;
  }

  // check if exists cellTypeSelected
  if (Object.keys(props.global.types).findIndex( (value) => value === cellTypeSelected) === -1) {
    setCellTypeSelected(Object.keys(props.global.types)[0]);
    return;
  }
  
  let stageLookupObject = {};
  let cellTypeLookUpObject = {};

  props.stages.map((stage, i) => {
    stageLookupObject[i + 1] = toString(i + 1);
    return ""; //sin return da warning
  });

  Object.keys(props.global.types).map((type, i) => {
    cellTypeLookUpObject[type] = type;
    return ""; //sin return da warning
  });

  // Get parameters values
  let LAMBDAValue = getPairValueStageCell("LAMBDA");
  let lambdaValue = getPairValueStageCell("lambda");
  let GAMMAValue = getValue("GAMMA");
  let KAPPAValue = getValue("KAPPA");
  let forcex = isNaN(force.x) ? force.x : -parseFloat(force.x) / 10 + "";
  let forcey = isNaN(force.y) ? force.y : -parseFloat(force.y) / 10 + "";

  return (
    <Grid component="span" container justify={"center"} alignContent={"center"}>
      <Grid /*item xs={11} md={11} lg={9}*/ style={{ backgroundColor: "GhostWhite", padding: "0  0 0", width: "1100px" , marginTop: "70px"}}>
        <SelectorStageCelltype
          stageList={stageLookupObject}
          stageSelected={props.potentials[idPotentialSelected].$.stage}
          stageHandler={handlerStageSelected(stageLookupObject)}
          celltypeList={cellTypeLookUpObject}
          celltypeSelected={cellTypeSelected}
          celltypeHandler={handlerCellTypeSelected}
          cellTypeColorList={props.cellTypeColorList}
        />
        <span style={{ display: "flex", justifyContent: "space-evenly", flexWrap: "wrap" }}>        
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "20px",
              padding: "20px",
              //backgroundColor: "white",
              backgroundColor: "rgba(220, 220, 220, 0.5)",
              borderRadius: "25px",
              boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            }}
          >           
            <Typography variant="h5" gutterBottom>
              Cell-cell line tension
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PotentialsHexagonWheel
                celltypes={props.global.types}
                cellTypeSelected={cellTypeSelected}
                otherCellTypeSelected={otherCellTypeSelected}
                colorList={props.colorList}
                handlerOtherCellTypeSelected={handlerOtherCellTypeSelected}
                rotation={rotationWheel}
              />

              <div
                lang="en-US"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  alignContent: "stretch",
                  justifyContent: "space-around",
                  width: "120px",
                }}
              >

                <IconButton aria-label="before_phase" onClick={()=>(setRotationWheel(rotationWheel-1))}>
                  <KeyboardArrowUpOutlinedIcon color="primary" fontSize="large" />
                </IconButton>
                <span style={{ borderStyle: "solid", borderRadius: "4px", width: "120px", backgroundColor: "GhostWhite" }}>                 
                    <Typography color="textSecondary" variant="h5" gutterBottom>
                      <FunctionButton equation={LAMBDAValue} onChange={handlePairValue("LAMBDA")} />
                        <Tooltip title={<Typography>LAMBDA (Λ): Line tension or affinity between cells</Typography>} placement="top">
                          <span> Λ </span>
                        </Tooltip>
                    </Typography>
                  <InputNumber onlyNumbers name="LAMBDA" value={LAMBDAValue} round={4} handleValue={handlePairValue} />
                </span>

                <span style={{ borderStyle: "solid", borderRadius: "4px", width: "120px", backgroundColor: "GhostWhite" }}>
                  
                    <Typography color="textSecondary" variant="h5" gutterBottom>
                      <FunctionButton equation={lambdaValue} onChange={handlePairValue("lambda")} />
                      <Tooltip title={<Typography>lambda (&lambda;): Inhomogeneities of the contractile tension</Typography>} placement="top">
                      <span>  &lambda; </span>
                      </Tooltip>
                    </Typography>
                  
                  <InputNumber onlyNumbers name="lambda" value={lambdaValue} round={4} handleValue={handlePairValue} />
                </span>

                <IconButton aria-label="next_phase" onClick={()=>(setRotationWheel(rotationWheel+1))}>
                  <KeyboardArrowDownOutlinedIcon color="primary" fontSize="large"/>
                </IconButton>

              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              margin: "20px",
              padding: "20px",
              //backgroundColor: "white",
              backgroundColor: "rgba(220, 220, 220, 0.5)",
              borderRadius: "25px",
              boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Other mechanical parameters
            </Typography>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PotentialsForceHexagon
                celltypes={props.global.types}
                cellTypeSelected={cellTypeSelected}
                force={force}
                handlerForce={handlerForce}
                handlerForceValue={handlerForceValue}
                colorList={props.colorList}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                  alignContent: "stretch",
                  justifyContent: "space-around",
                  width: "120px",
                }}
              >
                <span style={{ borderStyle: "solid", borderRadius: "4px", width: "120px", backgroundColor: "GhostWhite" }}>
                  
                    <Typography color="textSecondary" variant="h5" gutterBottom>
                      <FunctionButton equation={KAPPAValue} onChange={handleValue("KAPPA")} />
                      <Tooltip title={<Typography>KAPPA (K): Elastic constant or Young modulus</Typography>} placement="top">
                        <span> Κ </span>
                      </Tooltip>
                    </Typography>
                  <InputNumber onlyNumbers name="KAPPA" value={KAPPAValue} minValue={0} round={4} handleValue={handleValue} />
                </span>

                <span style={{ borderStyle: "solid", borderRadius: "4px", width: "120px", backgroundColor: "GhostWhite" }}>
                    <Typography color="textSecondary" variant="h5" gutterBottom>
                      <FunctionButton equation={GAMMAValue} onChange={handleValue("GAMMA")} />
                      <Tooltip title={<Typography>GAMMA (Γ): Global cortical tension</Typography>} placement="top">
                        <span> Γ </span>
                      </Tooltip>
                    </Typography>
                  <InputNumber onlyNumbers name="GAMMA" value={GAMMAValue} minValue={0} round={4} handleValue={handleValue} />
                </span>

                <span style={{ borderStyle: "solid", borderRadius: "4px", width: "120px", backgroundColor: "GhostWhite" }}>
                  <Tooltip title={<Typography>Force components (Fx, Fy): Additional or external force</Typography>} placement="top">
                    <Typography color="textSecondary" variant="h5" gutterBottom>
                      {" "}
                      Force{" "}
                    </Typography>
                  </Tooltip>
                  <FunctionButton equation={isNaN(forcex) ? forcex : parseFloat(forcex)} onChange={handleValueForce("force_x")} /> x
                  <InputNumber onlyNumbers name="force_x" value={forcex} round={4} handleValue={handleValueForce} handleLocalValue={handleValueLocalForce} /> <br />
                  <FunctionButton equation={isNaN(forcey) ? forcey : parseFloat(forcey)} onChange={handleValueForce("force_y")} /> y
                  <InputNumber onlyNumbers name="force_y" value={forcey} round={4} handleValue={handleValueForce} handleLocalValue={handleValueLocalForce} />
                </span>
              </div>
            </div>
          </div>
        </span>
      </Grid>
    </Grid>
  );
}

export default Potentials;
