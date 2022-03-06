import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import React from "react";
import DialogAlert from "../DialogAlert";
import { SelectorStageCelltype } from "../Cycles/SelectorStageCelltype";
import { InputNumber } from "../Potentials/InputNumber";
import { makeStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  fieldInput: {
    textAlign: "center",
    fontSize: theme.typography.h5.fontSize,
    WebkitAppearance: "textfield",
    appearance: "textfield",
    cursor: "pointer",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
  },
  divSelected: {
    "&:hover": {
      backgroundColor: "rgba(63, 180, 255, 1.0) !important",
    },
  },
});

const useStyles = makeStyles(styles);
export function Constants(props) {
  const [idStageSelected, setIdStageSelected] = React.useState(0);
  const [rowSelected, setRowSelected] = React.useState(0);
  const [inconsistency, setInconsistency] = React.useState(false);
  const [keyNameModified, setKeyNameModified] = React.useState(null);
  const [removeOperation, setRemoveOperation] = React.useState(null);
  const classes = useStyles();

  let proteins = props.proteins;

  // Se comprueba que constants sea un array
  if (!Array.isArray(props.proteins.constants)) {
    if (typeof proteins.constants === "undefined")
      proteins = {"constants":[{$:{stage:"all"}}]};
    else
      proteins.constants = [proteins.constants];
    props.handlerValue(proteins);
    //return;
  }

  if (keyNameModified === null) {
    let arrayKeys = Object.keys(proteins.constants[idStageSelected]);
    if (arrayKeys.length > rowSelected + 1) {
      setKeyNameModified(arrayKeys[rowSelected + 1]);
      return;
    }
  }

  const handleMenuItemClickStage = (stagesList) => (value) => {
    let objSelected = { index: 0 };
    let proteins = props.proteins;

    if (checkStage(stagesList)(proteins.constants, value, objSelected)) props.handlerValue(proteins);

    // Update current state
    setIdStageSelected(objSelected.index);
  };

  const checkStage =
    (stagesList) =>
    (constants, stage, idConstantFound, remove = false) => {
      let modified = false;

      // constant index in main constant array with "stage"
      idConstantFound.index = 0;

      // finding constant index for "stage"
      let constantSelected = constants.map((value, index) => {
        if (value.$.stage === stage) {
          idConstantFound.index = index;
          return value;
        }
        return null;
      });

      // if constant with "stage" does not exist --> do copy with from 0 index or stage all.
      if (constantSelected[idConstantFound.index] === null) {
        // si el stage no es all, se copia su valor en todos los stages
        if (stage !== "all") {
          // de donde copia
          let constantCopy = JSON.parse(JSON.stringify(constants.filter((value) => value.$.stage === "all")));
          if (constantCopy.length === 0) constantCopy = JSON.parse(JSON.stringify(constants.filter((value) => value.$.stage === "1")));

          // Se crea la nueva lista de constantes
          let newConstants = Object.keys(stagesList).map((idStage) => {
            let constantFound = constants.filter((value) => value.$.stage === idStage);
            if (constantFound.length === 0) {
              // si no hay constantes para ese stage se copia uno nuevo
              let constantCopyAux = JSON.parse(JSON.stringify(constantCopy));
              constantCopyAux[0].$.stage = idStage + "";
              return constantCopyAux[0];
            } else {
              return constantFound[0];
            }
          });
          constants.splice(0, constants.length);
          constants.push(...newConstants);
          idConstantFound.index = 0;
          modified = true;
        } else {
          // si no hay stage all y es all -> borrar todo y stage all sera copia del stage selected
          let constantCopy = JSON.parse(JSON.stringify(constants.filter((value) => value.$.stage === idStageSelected + 1 + ""))); // Copia el actual
          if (constantCopy.length === 0) constantCopy = JSON.parse(JSON.stringify(constants[0])); // TODO. mas robusto crear uno desde 0

          constantCopy[0].$.stage = "all";
          constants.splice(0, constants.length);
          constants.push(constantCopy[0]);
          idConstantFound.index = 0;
          modified = true;
        }
      } else if (remove) {
        // Si se ha encontrado y se quiere eliminar
        constants.splice(idConstantFound.index);
        idConstantFound.index = 0;
        modified = true;
      }

      return modified;
    };

  const changeSelectedRow = (newSelected, event) => {
    event.preventDefault();

    if (rowSelected !== newSelected) {
      setRowSelected(newSelected);
      let arrayKeys = Object.keys(props.proteins.constants[idStageSelected]);
      if (arrayKeys.length > newSelected + 1) setKeyNameModified(arrayKeys[newSelected + 1]);
    }
  };

  const addConstant = (event) => {
    if (event) event.preventDefault();
    let newProteins = Object.assign({}, props.proteins); //... hace copia
    newProteins.constants.map((constant, i) => {
      constant["NewName" + Object.keys(constant).length] = "0";
      return "";
    });
    props.handlerValue(newProteins);
  };

  const checkRemoveConstant = (keyName, event) => {
    if (event) event.preventDefault();
    setRemoveOperation(true);

    let arrayKeys = Object.keys(props.proteins.constants[idStageSelected]);
    if (arrayKeys.length > rowSelected + 1) {
      if (!checkInconsistency(arrayKeys[rowSelected + 1])) removeConstant();
    }
  };

  const removeConstant = () => {
    let newProteins = Object.assign({}, props.proteins); //... hace copia
    newProteins.constants.map((constant, i) => {
      if (Object.keys(constant).length > rowSelected) delete constant[Object.keys(constant)[rowSelected + 1]];
      return "";
    });
    props.handlerValue(newProteins);
    setRowSelected(0);
    setKeyNameModified(null);
  };

  const handlerChangeValue = (keyName) => (newValue) => {
    //event.preventDefault();
    if (idStageSelected >= props.proteins.constants.length) return;

    let newProteins = Object.assign({}, props.proteins); //... hace copia
    if (typeof newProteins.constants[idStageSelected][keyName] !== "undefined") newProteins.constants[idStageSelected][keyName] = newValue;

    props.handlerValue(newProteins);
  };

  const handleValidation = (value) => {
    let formIsValid = true;
    if (!value) {
      formIsValid = false;
      //setError("Cannot be empty");
    }
    if (typeof value !== "undefined") {
      if (!value.match(/^[a-zA-Z0-9_]{1,14}$/)) {
        formIsValid = false;
        //setError("Only alphanumeric");
      } else if (value[0].match(/^[0-9]+$/)) {
        formIsValid = false;
        //setError("Do not start with number");
      }
    }
    return formIsValid;
  };

  // Solo comprueba la validez del nombre, pero no lo modifica
  const handlerChangeName = (keyName) => (event) => {
    // si tiene el mismo valor, no hace nada
    if (event.target.value === keyNameModified) return;

    // si es valido el texto o vacio, se registra en variable local (se esta escribiendo)
    if (handleValidation(event.target.value) || !event.target.value) {
      if (keyNameModified === keyName) checkInconsistency(keyName);
      setKeyNameModified(event.target.value);
    }
  };

  const extract = (str, pattern) => (str.match(pattern) || []).pop() || "";
  const handlerSaveName = (keyName) => (event) => {
    // si tiene el mismo valor, no hace nada
    if (event.target.value === keyName || inconsistency) return;

    // si no es valido el texto, no hace nada
    if (!handleValidation(event.target.value)) return;

    let newKey = extract(event.target.value, "[0-9a-zA-Z]+"); //Only alphanumeric
    let newProteins = Object.assign({}, props.proteins); //... hace copia

    // recorre el vector de constantes de cada stage y crea nuevo ArrayDeConstantes
    let arrayConstants = [];
    props.proteins.constants.forEach((constant) => {
      let newConstant = {};
      Object.keys(constant).forEach((key) => {
        if (key === keyName) newConstant[newKey] = constant[key];
        else newConstant[key] = constant[key];
      });
      arrayConstants.push(newConstant);
    });
    newProteins.constants = arrayConstants;
    props.handlerValue(newProteins);
  };

  const checkInconsistency = (keyName) => {
    let inconsistent = false;
    props.proteins.protein.map((protein) => {
      inconsistent = inconsistent || protein.dynamics._.search(keyName) !== -1;
      return "";
    });

    setInconsistency(inconsistent);
    return inconsistent;
  };

  const cancelInconsistentOperation = () => {
    setKeyNameModified(null);
    setInconsistency(false);
    removeOperation && setRemoveOperation(false);
  };

  const acceptInconsistentOperation = () => {
    setInconsistency(false);
    if (removeOperation) {
      removeConstant();
      setRemoveOperation(false);
    }
  };

  let constantArray = idStageSelected < proteins.constants.length ? proteins.constants[idStageSelected] : proteins.constants[0];
  let keys = Object.keys(constantArray);
  let vals = Object.values(constantArray);
  keys.splice(0, 1);
  vals.splice(0, 1);

  return (
    <React.Fragment>
      <DialogAlert
        open={inconsistency !== false} //TODO update state
        title={"Warning"}
        message={"If you remove or rename this constant, there may be inconsistencies."}
        handleCancel={() => cancelInconsistentOperation()}
        handleOk={() => {
          acceptInconsistentOperation();
        }}
      />
      <div
        style={{
          borderRadius: "14px",
          marginLeft: "20px",
          marginTop: "70px",
          width: "450px",
          maxHeight: "calc(100vh - 79px)",
          backgroundColor: "GhostWhite",
          overflowY: "auto",
          overflowX: "hidden",
          boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        }}
      >
        <SelectorStageCelltype
          stageList={props.stageLookup}
          stageSelected={proteins.constants[idStageSelected].$.stage}
          stageHandler={handleMenuItemClickStage(props.stageLookup)}
          style={{ width: "100%" }}
        />

        {/* Bloque para agregar/eliminar contantes  */}
        <Grid
          component="div"
          container
          justify={"center"}
          alignItems={"center"}
          alignContent={"stretch"}
          style={{
            backgroundColor: "lightsteelblue",
            borderRadius: "10px",
            boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
          }}
        >
          <Grid item xs={3} justify="stretch">
            <Button
              variant="text"
              fullWidth="true"
              endIcon={<AddCircle />}
              onClick={(evt) => addConstant(evt)}
              style={{
                borderRadius: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Typography align="center" variant="h5">
              {" "}
              Constants{" "}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="text"
              fullWidth="true"
              startIcon={<RemoveCircle />}
              onClick={(evt) => checkRemoveConstant(evt)}
              style={{
                borderRadius: "10px",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              Remove
            </Button>
          </Grid>
        </Grid>

        {/* Lista de contante-valor*/}
        {keys.map((key, l) => {
          return (
            <div
              className={classes.divSelected}
              style={{ display: "flex", justifyContent: "center", backgroundColor: l === rowSelected ? "#2196F3" : "rgba(0,0,0,0)" }}
              onClick={(evt) => changeSelectedRow(l, evt)}
            >
              <InputBase
                color="primary"
                name={keys[l]}
                type={"text"}
                value={l === rowSelected ? keyNameModified : keys[l]}
                inputProps={{ className: classes.fieldInput }}
                onChange={handlerChangeName(keys[l])}
                onBlur={handlerSaveName(keys[l])}
              />

              <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "0px", marginLeft: "10px", width: "120px", alignSelf: "center" }}>
                <InputNumber name={keys[l]} value={vals[l]} increment={0.001} round={5} handleValue={handlerChangeValue} />
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Constants;
