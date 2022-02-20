import { Component } from "react";
import NumberObj from "./Number";
import { ChoiceList } from "./ChoiceList";
import React from "react";
import { IconButton } from "@material-ui/core";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(3),
    textAlign: "center",
    backgroundColor: "#cfe8fc",
  },
  text: {
    fontSize: "17px",
  },
});

const Accordion = withStyles({
  root: {
    width: "100%",
    margin: "0px",
    padding: "0px",
  },
  content: {
    width: "100%",
    margin: "0px",
    padding: "0px",
  },
  expanded: {
    margin: "0px",
    padding: "0px",
  },
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    margin: "0px",
    padding: "0px",
    backgroundColor: "#cfe8fc",
    height: "60px",
    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
  },
  content: {
    margin: "0px",
    padding: "0px",
  },
  expanded: {
    margin: "0px",
    padding: "0px",
  },
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    margin: "0px",
    padding: "0px",
  },
  content: {
    margin: "0px",
    padding: "0px",
  },
  expanded: {
    margin: "0px",
    padding: "0px",
  },
}))(MuiAccordionDetails);

/*
function newSquareVector(currentSquareVector, idVector) {
  const newVector =
    typeof idVector === "object"
      ? [...currentSquareVector, idVector]
      : Object.keys(currentSquareVector)
          .filter((index) => parseInt(index) !== parseInt(idVector))
          .map((id) => currentSquareVector[id]);
  return newVector;
}*/

const useStyles = makeStyles(styles);

function SquareTitle(props) {
  const classes = useStyles();
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#cfe8fc",
        width: "100%",
      }}
    >
      <Grid container spacing={0} justify="center" alignItems="center">
        <Grid item xs={4} style={{ backgroundColor: "#cfe8fc" }}>
          <Typography className={classes.text}>
            <b>Add Region</b>
          </Typography>
        </Grid>
        <Grid item xs={3} style={{ backgroundColor: "#cfe8fc" }}>
          <IconButton color="primary" aria-label="Add Square" component="span" onClick={props.handler("add")}>
            <AddCircle />
          </IconButton>

          <IconButton color="primary" aria-label="Remove Square" component="span" onClick={props.handler("remove", props.selectedSquare)}>
            <RemoveCircle />
          </IconButton>
        </Grid>
        <Grid item xs={4} style={{ backgroundColor: "#cfe8fc" }}>
          <Typography className={classes.text}>
            <b>Remove Region</b>
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

class Squares extends Component {
  constructor(props) {
    super(props);
    //this.handleChangeSquareVector = this.handleChangeSquareVector.bind(this);
    this.handleChangeSelection = this.handleChangeSelection.bind(this);
  }
  /*
  // Manejador para agregar o borrar squares
  handleChangeSquareVector(action) {
    let currentSquareVector = this.props.data.itissue.square;
    const newSquare = {
      $: {
        t: Object.keys(this.props.data.types)[0],
        ix: "0",
        iy: "0",
        sizex: "1",
        sizey: "1",
      },
    };
    const idVector = action === "add" ? newSquare : this.props.selectedSquare;
    return (event) => {
      // genera el nuevo vector de squares
      let vector = newSquareVector(
        this.makeArray(currentSquareVector),
        idVector
      );

      // si el vector tiene elementos se guarda
      if (vector.length > 0)
        this.props.handler(["itissue"], "square", vector)(event);
      else {
        // si no quedan squares se elimina la propiedad del vector (¿Puede haber XML sin squares?)
        var bla = this.props.data.itissue;
        delete bla.square;
        this.props.handler([], "itissue", bla)(event);
      }

      this.props.selectedSquareHandler(vector.length - 1 + "");
    };
  }*/

  handleChangeSelection(path, name, value) {
    this.props.selectedSquareHandler(value);
  }

  makeArray(objectToConvert) {
    return Array.isArray(objectToConvert) ? objectToConvert : typeof objectToConvert !== "undefined" ? [objectToConvert] : [];
  }

  render() {
    const { classes } = this.props;
    const choiceData =
      typeof this.props.data.itissue.square !== "undefined" &&
      Object.keys(this.props.data.itissue.square).map((value, index) => {
        return index;
      });
    const selectedSquare = this.props.selectedSquare;
    const squareData = this.makeArray(this.props.data.itissue.square);
    const dataPath = ["itissue", "square", selectedSquare, "$"];

    // Check selectedSqauer correct value
    if (selectedSquare !== "0" && parseInt(selectedSquare) >= squareData.length) {
      this.props.selectedSquareHandler("0");
      return null;
    }

    const newSquare = {
      $: {
        t: Object.keys(this.props.data.types)[0],
        ix: "0",
        iy: "0",
        sizex: "1",
        sizey: "1",
      },
    };

    return (
      <div className={classes.root}>
        <Accordion style={{ margin: "0px", padding: "0px", width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={{ margin: "0px", padding: "0px", width: "100%" }}
          >
            {/* <div style={{ width: "100%" }}>
              <Typography className={classes.text}>
                <b>SQUARES</b>
              </Typography> */}
              <Typography variant="h5" align="center" style={{width: "100%"}}>Regions</Typography>
            {/* </div> */}
          </AccordionSummary>
          <AccordionDetails>
            <div style={{ width: "100%" }}>
              <SquareTitle
                // handler={props.handler}
                handler={this.props.handleChangeSquareVector}
                squareData={squareData}
                newSquare={newSquare}
                selectedSquare={selectedSquare}
              />
              {squareData.length > 0 && (
                <div style={{ width: "100%" }}>
                  <ChoiceList label="Selected region:" name="Select:" value={choiceData} selected={selectedSquare} path={dataPath} handler={this.handleChangeSelection} />
                  <ChoiceList
                    label="Cell type:"
                    name="t"
                    value={this.props.data.types}
                    selected={squareData[selectedSquare].$.t}
                    path={dataPath}
                    isColor
                    colorList={this.props.colorList}
                    handler={this.props.handler}
                  />
                  <NumberObj
                    label="Init Pos. X"
                    name="ix"
                    path={dataPath}
                    step={this.props.syntaxis.ix._step}
                    min={this.props.syntaxis.ix._lower_limit}
                    max={this.props.data.itissue.ncellsx}
                    value={squareData[selectedSquare].$.ix}
                    handler={this.props.handler}
                    round={0}
                  />
                  <NumberObj
                    label="Init Pos. Y"
                    name="iy"
                    path={dataPath}
                    step={this.props.syntaxis.iy._step}
                    min={this.props.syntaxis.iy._lower_limit}
                    max={this.props.data.itissue.ncellsy}
                    value={squareData[selectedSquare].$.iy}
                    handler={this.props.handler}
                    round={0}
                  />
                  <NumberObj
                    label="Num. Cells X"
                    name="sizex"
                    path={dataPath}
                    step={this.props.syntaxis.sizex._step}
                    min={this.props.syntaxis.sizex._lower_limit}
                    max={this.props.data.itissue.ncellsx - squareData[selectedSquare].$.ix}
                    value={squareData[selectedSquare].$.sizex}
                    handler={this.props.handler}
                    round={0}
                  />
                  <NumberObj
                    label="Num. Cells Y"
                    name="sizey"
                    path={dataPath}
                    step={this.props.syntaxis.sizey._step}
                    min={this.props.syntaxis.sizey._lower_limit}
                    max={this.props.data.itissue.ncellsy - squareData[selectedSquare].$.iy}
                    value={squareData[selectedSquare].$.sizey}
                    handler={this.props.handler}
                    round={0}
                  />
                </div>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
}
export default withStyles(styles)(Squares);
