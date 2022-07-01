import React, { useEffect } from "react";
import { Button, IconButton, OutlinedInput, Typography, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import xmlData from "../../context/xmlData";
import Link from "@material-ui/core/Link";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import AddCircle from "@material-ui/icons/AddCircle";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },

  hexagonStyle: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  divSelected: {
    transition: "background-color 0.4s",
    "&:hover": {
      backgroundColor: "rgba(63, 180, 255, 1.0) !important",
    },
  },
}));

const getProteinsList = (proteinsData) => {
  const proteinsList = [];
  if (proteinsData.protein)
    proteinsData.protein.forEach((value) => proteinsList.push(value.$.species));
  return proteinsList;
};


function FunctionEditor(props) {
  const properties = [["area", "area", "Cell apical area"], ["perimeter", "perimeter", "Cell perimeter"], ["Type","ctype", "Cell type"], ["x","x", "X coordinate of the cell center"], ["y","y", "Y coordinate of the cell center"], ["Γ","k_gamma", "GAMMA (Γ): Global cortical tension" ], ["Κ","k_kappa", "KAPPA (K): Elastic constant or Young modulus"]]; // area_growth only in potencials y proteins
  const predefinedFunctions = [
    ["Negative", "+ 1.0 * function_hill_f(x,k,n)", "function_hill_f(x,k,n) = k^n / (k^n + x^n)"],
    ["Positive", "+ 1.0 * function_hill_f_inverse(x,k,n)", "function_hill_f_inverse(x,k,n) = x^n / (k^n + x^n)"]
  ];
  const combinedFunctions = [
    ["Juxtacrine (Receptor-Ligand)", "signal", "Weighted amount of proteinName in neighboring cells, weighted for every neighbor by the amount of shared “membrane” (edge length) relative to the perimeters of the neighboring cells"],
    ["Paracrine (Diffusion)", "diffusion", "Diffusion, the number of protein molecules is conserved"]];
  const { onClose, update, inputEquation, disabled } = props;
  const [equation, setEquation] = React.useState(inputEquation);
  const [localUpdate, setLocalUpdate] = React.useState(update);
  const [functionSelected, setFunctionSelected] = React.useState(null);

  useEffect(()=> {
    setEquation(inputEquation);
  }, [inputEquation]);

  if (disabled && equation !== "") {  
    setEquation("");
    return;
  }

  if (localUpdate !== update) {
    setLocalUpdate(update);
    setEquation(inputEquation);
    return;
  }

  const handleProteinSelected = (newValue) => {
    if (functionSelected) {
      handleEquationChange(equation + " " + functionSelected + "_" + newValue + "()");
      setFunctionSelected(null);
    } else handleEquationChange(equation + " " + newValue);
  };

  const handleEquationChange = (newValue) => {
    setEquation(typeof newValue === "undefined" ? "" : newValue);
  };

  const handleClickApplyEquation = () => {
    // Save equation
    if (equation !== inputEquation) onClose(equation);
  };

  const handleMouseDownApplyEquation = (event) => {
    event.preventDefault();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <OutlinedInput
        aria-label="empty textarea"
        value={equation}
        disabled={disabled}
        rows={2}
        fullWidth
        multiline
        variant="outlined"
        placeholder="Write"
        onChange={(event) => handleEquationChange(event.target.value)}
        style={{fontSize: "1.25rem", marginBottom: "10px"}}
        startAdornment={
          <InputAdornment position="start">
            <IconButton disabled={equation === inputEquation || disabled} aria-label="toggle password visibility" onClick={handleClickApplyEquation} onMouseDown={handleMouseDownApplyEquation} edge="start">
              <DoneIcon color={equation !== inputEquation ? "primary" : "disabled"} />
            </IconButton>
          </InputAdornment>
        }
      />

      <div style={{ display: "flex", justifyContent: "space-evenly", height: "265px", overflow: "auto", width: "100%" }}>
        <div>
          <Typography align="center">Cell properties</Typography>
          <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group" fullWidth>
            {properties.map((value) => (
              <Tooltip title={<Typography> {value[2]} </Typography>} placement="top">
              <Button disabled={disabled} onClick={() => handleEquationChange(equation + " (c->" + value[1] + ")")}>{value[0]}</Button>
              </Tooltip>
            ))}
          </ButtonGroup>
        </div>

        <div>
        <Typography align="center">Regulatory Hill functions</Typography>
          <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group" fullWidth>
            {predefinedFunctions.map((value) => (
              <Tooltip title={<Typography> {value[2]} </Typography>} placement="top">
              <Button disabled={disabled} onClick={() => handleEquationChange(equation + " " + value[1])}>{value[0]}</Button>
              </Tooltip>
            ))}
          </ButtonGroup>

          <p></p>

          <Typography align="center">Signaling functions</Typography>
          <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group" fullWidth>
            {combinedFunctions.map((value) => (
              <Tooltip title={<Typography> {value[2]} </Typography>} placement="top">
              <Button disabled={disabled} variant={value[1] === functionSelected ? "contained" : "outlined"} onClick={() => setFunctionSelected(functionSelected !== value[1] ? value[1] : null)}>
                {value[0]}
              </Button>
              </Tooltip>
            ))}
          </ButtonGroup>
        </div>

        <div>
        <Typography align="center">Proteins</Typography>
          <xmlData.Consumer>
            {(contextValue) => (
              <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group" fullWidth style= {{height: "240px", overflow: "auto"}}>
                {getProteinsList(contextValue.proteins).map((value) => (
                  <Button disabled={disabled} onClick={() => handleProteinSelected(value)}>{value}</Button>
                ))}
              </ButtonGroup>
            )}
          </xmlData.Consumer>
        </div>
      </div>
      <Link href="https://osf.io/3g2t5/download" style={{ display: "table-cell" }} target="_blank">
        {" "}
        See manual for more possibilities{" "}
      </Link>
    </div>
  );
}

export function ProteinList(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
    <div style={{
      height:"50px",
      borderRadius:"14px",
      backgroundColor: "#cfe8fc",
      boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Typography variant="h5" align="center">Protein list</Typography>
    </div>
    <div style={{maxHeight: "200px", overflow: "hidden auto"}}>
      {props.proteins.protein && props.proteins.protein.map((protein, i) => {
        return (
          <div
            className={classes.divSelected}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: protein.$.species === props.selectedProtein ? "#2196F3" : "rgba(0,0,0,0)",
              boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.1), 0px 1px 5px 0px rgba(0,0,0,0.1)",
              borderRadius: "14px"
            }}
            onClick={(evt) => props.changeSelectedProtein && props.changeSelectedProtein(protein.$.species, evt)}
          >
            <Typography variant="h6" align="left" style={{overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingLeft: "10px"}}>
              {"d " + protein.$.species + " / dt = " + protein.dynamics._}
            </Typography>
            <span style={{width: "80px", flexShrink: "0"}}>
              <IconButton edge="end" aria-label="config" onClick={() => props.onModifyProtein(protein.$.species)}> <EditIcon /> </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={() => props.onRemoveProtein(i)}> <DeleteIcon /> </IconButton>
            </span>
          </div>
        );
      })}
    </div>
    </React.Fragment>
  );
}

export function FormulaEditor(props) {
  const [updateInfo, setUpdateInfo] = React.useState(true);
  const [selectedProteinName, setSelectedProteinName] = React.useState("");



  if (selectedProteinName === "" && props.proteins.protein) {
    if (!Array.isArray(props.proteins.protein)) props.proteins.protein = [props.proteins.protein];
    if (props.proteins.protein.length) {
      setSelectedProteinName(props.proteins.protein[0].$.species);
      return;
    }
  }

  const changeSelectedProtein = (newSelected, event) => {
    event && event.preventDefault();
    if (selectedProteinName !== newSelected) {
      setSelectedProteinName(newSelected);
      setUpdateInfo(!updateInfo);
    }
  };

  const handleValue = (newValue) => {
    let indexArray = props.proteins.protein.findIndex((value) => value.$.species === selectedProteinName);
    props.onChangeFormula(indexArray, newValue);
  };

  let inputDisabled = true;
  let auxSelectedRow = -1;
  if (props.proteins.protein) {
    // Prevent errors on removing proteins
    inputDisabled = props.proteins.protein.length === 0;
    auxSelectedRow = props.proteins.protein.findIndex((value) => value.$.species === selectedProteinName);
    if (auxSelectedRow === -1 && props.proteins.protein.length) {
      setSelectedProteinName(props.proteins.protein[0].$.species);
      setUpdateInfo(!updateInfo);
      return;
    }
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        //backgroundColor: "rgba(220, 220, 220, 0.5)",
        borderRadius: "14px",
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      }}
    >
      <FunctionEditor
        onClose={handleValue}
        update={updateInfo}
        disabled={inputDisabled}
        inputEquation={inputDisabled ? " " : props.proteins.protein[auxSelectedRow].dynamics._}
      />

      <ProteinList
        selectedProtein={selectedProteinName}
        changeSelectedProtein={changeSelectedProtein}
        proteins={props.proteins}
        onModifyProtein={props.onModifyProtein}
        onRemoveProtein={props.onRemoveProtein}
      />

      <div style={{ display: "flex", justifyContent: "center", backgroundColor: "lightsteelblue" }}>
        <Button
          variant="text"
          fullWidth="true"
          endIcon={<AddCircle />}
          color="primary"
          onClick={() => props.onNewProtein({ x: 50 + 700 * Math.random(), y: 10 + 350 * Math.random()})}
          style={{ borderRadius: "10px", paddingTop: "10px", paddingBottom: "10px", width: "300px" }}
        >
          Add New Protein
        </Button>
      </div>
    </div>
  );
}
