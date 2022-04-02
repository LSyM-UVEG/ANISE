import React from "react";
import { Button, DialogActions, DialogContent, IconButton, Typography, OutlinedInput } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import xmlData from "../../context/xmlData";
import Link from "@material-ui/core/Link";

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
}));

const getProteinsList = (proteinsData) => {
  const proteinsList = [];
  if (!proteinsData.protein)
    return proteinsList;
    
  if(!Array.isArray(proteinsData.protein)) proteinsData.protein = [proteinsData.protein];
  proteinsData.protein.forEach((value) => proteinsList.push(value.$.species));
  return proteinsList;
};

function PotentialsHexagon(props) {
  const classes = useStyles();
  let transf = "translate(" + props.xTrans.toString() + ", " + props.yTrans.toString() + ")";

  return (
    <g transform={transf} class={classes.hexagonStyle}>
      <polygon
        stroke={"#3f51b5"}
        strokeWidth="1"
        fill={props.color}
        style={{ transition: "fill 0.25s" }}
        points="-32,18 -32,-18 0,-36 32,-18 32,18 0,36"
        onMouseDown={props.handle}
      />
    </g>
  );
}

function FunctionDialog(props) {
  const properties = [["area", "area"], ["perimeter", "perimeter"], ["type","ctype"], ["number of neighbors", "neighboringcells"], ["number of vertexes", "ncellvertexes"],  ["x","x"], ["y","y"]]; // area_growth only in potencials y proteins
  const classes = useStyles();
  const { onClose, open, inputEquation } = props;
  const [equation, setEquation] = React.useState(inputEquation);
  const [cellSelected, setCellSelected] = React.useState("c1");
  const [localUpdate, setLocalUpdate] = React.useState(open);
  const blueColor = "#3f51b5";
  const lightBlueColor = "rgb(207, 232, 252)";

  const handleClose = (returnValue) => {
    let value = returnValue;
    if (value === "") value = 0;
    else if (!isNaN(value) && value !== null) value = parseFloat(returnValue);
    onClose(value);
  };

  if (localUpdate !== open) {
    setLocalUpdate(open);
    setEquation(inputEquation);
    return;
  }

  const handleCellChange = (newValue) => () => {
    setCellSelected(newValue);
  };

  //   const handleListItemClick = (value) => {
  //     onClose(value);
  //   };

  const handleEquationChange = (newValue) => {
    setEquation(typeof newValue === "undefined" ? "" : newValue);
  };

  return (
    <Dialog onClose={handleClose} maxWidth={"md"} aria-labelledby="function-dialog" open={open}>
      <DialogTitle id="simple-dialog-title">Function editor</DialogTitle>
      <DialogContent>
        <Grid component="span" container spacing={2} justify={"center"}>
          <Grid item xs={12}>
            <OutlinedInput
              aria-label="empty textarea"
              value={equation}
              rows={2}
              fullWidth
              multiline
              variant="outlined"
              
              placeholder="Write"
              onChange={(event) => handleEquationChange(event.target.value)}
              style={{fontSize: "1.25rem", marginBottom: "10px"}}
            />
          </Grid>
          <Grid item xs={4} className={classes.root}>
            Cellular environment 
            <svg width="160px" height="200px">
              <PotentialsHexagon color={cellSelected === "c1" ? blueColor : "white"} xTrans="50" yTrans="100" handle={handleCellChange("c1")} />
              <PotentialsHexagon color={cellSelected === "c2" ? lightBlueColor : "white"} xTrans="114" yTrans="100" handle={handleCellChange("c2")} />
              <PotentialsHexagon color={cellSelected === "cp2" ? lightBlueColor : "white"} xTrans="82" yTrans="154" handle={handleCellChange("cp2")} />
              <PotentialsHexagon color={cellSelected === "cp1" ? lightBlueColor : "white"} xTrans="82" yTrans="46" handle={handleCellChange("cp1")} />

              <text
                class="not-selectable"
                x="50"
                y="108"
                fill={cellSelected === "c1" ? "white" : blueColor}
                text-anchor="middle"
                style={{ fontSize: "15px", fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
              >
                C1
              </text>
              <text
                class="not-selectable"
                x="114"
                y="108"
                fill={blueColor}
                text-anchor="middle"
                style={{ fontSize: "15px", fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
              >
                C2
              </text>
              <text
                class="not-selectable"
                x="82"
                y="162"
                fill={blueColor}
                text-anchor="middle"
                style={{ fontSize: "15px", fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
              >
                CP2
              </text>
              <text
                class="not-selectable"
                x="82"
                y="54"
                fill={blueColor}
                text-anchor="middle"
                style={{ fontSize: "15px", fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}
              >
                CP1
              </text>
            </svg>
          </Grid>
          <Grid item xs={4} className={classes.root}>
            Cell properties
            <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group" fullWidth>
              {properties.map((value) => (
                <Button onClick={() => handleEquationChange(equation + " (%" + cellSelected + "property." + value[1] + ")")}>{value[0]}</Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Grid item xs={4} className={classes.root}>
            Proteins
            <xmlData.Consumer>
              {(contextValue) => (
                <ButtonGroup orientation="vertical" color="primary" aria-label="vertical outlined primary button group" fullWidth style= {{height: "240px", overflow: "auto"}}>
                  {getProteinsList(contextValue.proteins).map((value) => (
                    <Button onClick={() => handleEquationChange(equation + " (%" + cellSelected + "." + value + ")")}>{value}</Button>
                  ))}
                </ButtonGroup>
              )}
            </xmlData.Consumer>
          </Grid>
          <Link href="https://osf.io/3g2t5/download" style={{ display: "table-cell" }} target="_blank">
            {" "}
            Check TiFoSi manual for more possibilities{" "}
          </Link>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleEquationChange(inputEquation)}>Reset</Button>
        <Button autoFocus color="secondary" onClick={() => handleClose(null)}>
          Cancel
        </Button>
        <Button color="primary" onClick={() => handleClose(equation)}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function FunctionButton(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (typeof value === "string" || typeof value === "number") props.onChange(value);
  };

  return (
    <React.Fragment>
      <Tooltip
        title={
          <React.Fragment>
            <Typography>Open equation editor</Typography>
          </React.Fragment>
        }
        aria-label="equation"
        placement="left"
      >
        <IconButton
          variant="contained"
          color={isNaN(props.equation) ? "secondary" : "primary"}
          arial-label="enable function"
          component="span"
          edge="start"
          style={{ marginTop: "-4px", marginLeft: "-24px", padding: "0" }}
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <FunctionDialog onClose={handleClose} open={open} inputEquation={props.equation} />
    </React.Fragment>
  );
}
