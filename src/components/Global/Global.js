import { Component } from "react";
import xmlData from "../../context/xmlData";
import NumberObj from "./Number";
import Optional from "./Optional";
import ItemList from "./ItemList";
import { withStyles } from "@material-ui/core/styles";
import sintaxisData from "../../sintaxis.json";
import Typography from "@material-ui/core/Typography";
import AddItem from "./AddItem";
import { ChoiceList } from "./ChoiceList";
import React from "react";
import TissueEditor from "./TissueEditor";
import Squares from "./Squares";
import {Divider} from "@material-ui/core";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DialogAlert from "../DialogAlert";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#cfe8fc",
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

function ItemListAdder(props) {
  return (
    <div style={{ borderTop: "1px solid LightGray" }}>
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column" }}>
        <Typography
          align="center"
          variant="h5"
          style={{
            borderRadius: "4px",
            paddingRight: "15px",
            paddingLeft: "15px",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
          }}
        >
          Cell types:
        </Typography>
        <ItemList
          name="types"
          value={props.types}
          handler={props.handlerOptional}
          handlerRemoveCelltype={props.handlerRemoveCelltype}
          colorList={props.colorList}
          colorHandler={props.colorHandler}
          addColor={props.addColor}
        />
        <AddItem label="New celltype name" name="types" handler={props.handlerValue} addColor={props.addColor} />
      </div>
    </div>
  );
}

function newSquareVector(currentSquareVector, idVector) {
  const newVector =
    typeof idVector === "object"
      ? [...currentSquareVector, idVector]
      : Object.keys(currentSquareVector)
        .filter((index) => parseInt(index) !== parseInt(idVector))
        .map((id) => currentSquareVector[id]);
  return newVector;
}



class Global extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSquare: "0",
      celltypeToRemove: null,
      backgroundcellsDialogOpen: false,
      simulationFileAlert: false
    };
    this.selectedSquareHandler = this.selectedSquareHandler.bind(this);
    this.handleChangeSquareVector = this.handleChangeSquareVector.bind(this);
    this.handleMoveSquareVector = this.handleMoveSquareVector.bind(this);
    this.handleScaleSquareVector = this.handleScaleSquareVector.bind(this);
    this.handlerRemoveCelltype = this.handlerRemoveCelltype.bind(this);
  }

  handlerRemoveCelltype(name) {
    if (this.props.global.itissue.backgroundcells === name) {
      this.setState({backgroundcellsDialogOpen: true});
    } else {
      this.setState({celltypeToRemove: name});
    }
  }

  handleChangeSquareVector(action, square = 0) {
    let currentSquareVector = this.props.global.itissue.square;
    const newSquare =
      square !== 0
        ? square
        : {
          $: {
            t: Object.keys(this.props.global.types)[0],
            ix: "0",
            iy: "0",
            sizex: "1",
            sizey: "1",
          },
        };
    const idVector = action === "add" ? newSquare : square + "";
    return (event) => {
      // genera el nuevo vector de squares
      let vector = newSquareVector(this.makeArray(currentSquareVector), idVector);

      // si el vector tiene elementos se guarda
      if (vector.length > 0) this.props.handlerValue(["itissue"], "square", vector);
      else {
        // si no quedan squares se elimina la propiedad del vector (¿Puede haber XML sin squares?)
        var bla = this.props.global.itissue;
        delete bla.square;
        this.props.handlerValue([], "itissue", bla);
      }

      this.selectedSquareHandler(vector.length - 1 + "");
    };
  }

  handleMoveSquareVector(idSquare, diffI, diffJ) {
    let newSquares = Object.assign([], this.props.global.itissue.square);
    newSquares[idSquare].$.ix = Math.max(0.0, parseInt(newSquares[idSquare].$.ix) + diffJ);
    newSquares[idSquare].$.iy = Math.max(0.0, parseInt(newSquares[idSquare].$.iy) - diffI);
    this.props.handlerValue(["itissue"], "square", newSquares)
  }

  handleScaleSquareVector(idSquare, diffI, diffJ) {
    let newSquares = Object.assign([], this.props.global.itissue.square);
    newSquares[idSquare].$.sizex = Math.max(1.0, parseInt(newSquares[idSquare].$.sizex) + diffJ);
    newSquares[idSquare].$.sizey = Math.max(1.0, parseInt(newSquares[idSquare].$.sizey) - diffI);
    this.props.handlerValue(["itissue"], "square", newSquares)
  }

  makeArray(objectToConvert) {
    return Array.isArray(objectToConvert) ? objectToConvert : typeof objectToConvert !== "undefined" ? [objectToConvert] : [];
  }

  selectedSquareHandler(newSelectedSquare) {
    this.setState({ selectedSquare: newSelectedSquare });
  }

  changeInitializationFile = (path, name) => (event, newValue) => {
    // show a place to write file
    if (newValue === false) {
      this.props.handlerValue(["itissue", "file", "$"], "f", "");
    }
    else
      this.props.handlerValue(["itissue", "file", "$"], "f", name);

    if (newValue && name !== "")
      this.setState({ simulationFileAlert: true });
  }

  render() {
    const { classes } = this.props;
    const globalData = sintaxisData["tissue"]["global"];

    return (
      <div>
        <xmlData.Consumer>
          {(state) =>
            state &&
            state.global && (
              <div>
                <DialogAlert
                  open={this.state.celltypeToRemove !== null}
                  title={"Remove cell type?"}
                  message={"If you remove a cell type, all the related parameters will be removed. Are you sure you want to continue?"}
                  handleCancel={() => this.setState({ celltypeToRemove: null })}
                  handleOk={() => { this.props.handlerOptional("types", this.state.celltypeToRemove)(null, null); this.setState({ celltypeToRemove: null }); }}
                />

                <DialogAlert
                  open={this.state.backgroundcellsDialogOpen}
                  title={"Background cell type"}
                  message={"You cannot remove cell type set as background."}
                  handleOk={() => this.setState({ backgroundcellsDialogOpen: false })}
                />

                <DialogAlert
                  open={this.state.simulationFileAlert}
                  title={"Warning"}
                  message={"The configuration must be consistent with the simulation result file: " + state.global.itissue.file.$.f}
                  handleOk={() => this.setState({ simulationFileAlert: false })}
                />
                {
                  <div className={classes.root} style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
                    <div
                      style={{
                        borderRadius: "14px",
                        marginLeft: "20px",
                        marginTop: "70px",
                        width: "550px",
                        maxHeight: "calc(100vh - 79px)",
                        backgroundColor: "white",
                        overflowY: "auto",
                        overflowX: "hidden",
                        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                      }}
                    >
                      <Accordion defaultExpanded="true" style={{ margin: "0px", padding: "0px", width: "100%" }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          style={{ margin: "0px", padding: "0px", width: "100%" }}
                        >
                          <Typography variant="h5" align="center" style={{ width: "100%" }}>
                            Parameters
                          </Typography>
                          {/* <div className={classes.paper}  style={{width: "100%"}}><b>PARAMETERS</b></div> */}
                        </AccordionSummary>
                        <AccordionDetails>
                          <div style={{ width: "100%" }}>
                            <NumberObj
                              label="Time step"
                              name="deltat"
                              path={[]}
                              step={globalData.deltat._step}
                              min={globalData.deltat._lower_limit}
                              max={globalData.deltat._upper_limit}
                              value={state.global.deltat}
                              handler={this.props.handlerValue}
                              round={4}
                            />
                            <Optional
                              style={{ borderTop: "1px solid WhiteSmoke" }}
                              label="T1 at periphery"
                              name="AllowT1C2"
                              path={[]}
                              value={state.global.AllowT1C2}
                              handler={this.props.handlerOptional}
                              tooltipTitle="Activating this option will allow T1 transitions in cells at the tissue periphery."
                            />
                            <Optional
                              label="Protein binomial distribution"
                              name="ProteinBinomialDistribution"
                              path={[]}
                              value={state.global.ProteinBinomialDistribution}
                              handler={this.props.handlerOptional}
                              tooltipTitle="Activating this option will distribute proteins among cells binomially after cell division. Otherwise proteins are halved among cells."
                            />
                            <Optional
                              label="Use initialization file"
                              name="InitializationFile"
                              path={[]}
                              value={state.global.itissue.file.$.f === "" ? undefined : true }
                              handler={this.changeInitializationFile}
                              buttonData={state.global.itissue.file.$.f}
                            />
                            <div style={{
                              opacity:  (this.props.global && this.props.global.itissue.file.$.f !== "") ? "0.7" : "1.0",
                              pointerEvents: (this.props.global && this.props.global.itissue.file.$.f !== "") ? "none" : "auto" 
                            }}>
                            <ItemListAdder
                              types={state.global.types}
                              handlerOptional={this.props.handlerOptional}
                              handlerValue={this.props.handlerValue}
                              handlerRemoveCelltype={this.handlerRemoveCelltype}
                              colorList={this.props.colorList}
                              colorHandler={this.props.colorHandler}
                              addColor={this.props.addColor}
                            />
                            </div>
                          </div>
                          
                        </AccordionDetails>
                      </Accordion>
                      <Divider style={{ borderTop: "1px solid gray" }} />
                      <div style={{ 
                            opacity:  (this.props.global && this.props.global.itissue.file.$.f !== "") ? "0.7" : "1.0",
                            pointerEvents: (this.props.global && this.props.global.itissue.file.$.f !== "") ? "none" : "auto" 
                      }}>
                      <Accordion defaultExpanded="true" style={{ margin: "0px", padding: "0px", width: "100%" }}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          style={{ margin: "0px", padding: "0px", width: "100%" }}
                        >
                          {/* <div className={classes.paper} style={{width: "100%"}}><b>BACKGROUND</b></div> */}
                          <Typography variant="h5" align="center" style={{ width: "100%" }}>
                            Background
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div style={{ width: "100%" }}>
                            <NumberObj
                              label="Num. cells X"
                              name="ncellsx"
                              path={["itissue"]}
                              step={globalData.itissue.ncellsx._step}
                              min={globalData.itissue.ncellsx._lower_limit}
                              max={globalData.itissue.ncellsx._upper_limit}
                              value={state.global.itissue.ncellsx}
                              handler={this.props.handlerValue}
                              round={0}
                            />
                            <NumberObj
                              label="Num. cells Y"
                              name="ncellsy"
                              path={["itissue"]}
                              step={globalData.itissue.ncellsy._step}
                              min={globalData.itissue.ncellsy._lower_limit}
                              max={globalData.itissue.ncellsy._upper_limit}
                              value={state.global.itissue.ncellsy}
                              handler={this.props.handlerValue}
                              round={0}
                            />
                            <ChoiceList
                              label="Cell type:"
                              name="backgroundcells"
                              value={state.global.types}
                              selected={state.global.itissue.backgroundcells}
                              path={["itissue"]}
                              isColor
                              handler={this.props.handlerValue}
                              colorList={this.props.colorList}
                            />
                          </div>
                        </AccordionDetails>
                      </Accordion>
                      </div>
                      <Divider style={{ borderTop: "1px solid gray" }} />
                      <div style={{ 
                        opacity:  (this.props.global && this.props.global.itissue.file.$.f !== "") ? "0.7" : "1.0",
                        pointerEvents: (this.props.global && this.props.global.itissue.file.$.f !== "") ? "none" : "auto" 
                      }}>
                        <Squares
                          data={state.global}
                          syntaxis={globalData.itissue.square}
                          handler={this.props.handlerValue}
                          handleChangeSquareVector={this.handleChangeSquareVector}
                          selectedSquare={this.state.selectedSquare}
                          selectedSquareHandler={this.selectedSquareHandler}
                          colorList={this.props.colorList}
                        />
                      </div>
                    </div>
                    <div style={{ width: "1000px", marginTop: "60px",
                      opacity:  (this.props.global && this.props.global.itissue.file.$.f !== "") ? "0.7" : "1.0",
                      pointerEvents: (this.props.global && this.props.global.itissue.file.$.f !== "") ? "none" : "auto" 
                    }}>
                      <TissueEditor
                        data={state.global.itissue}
                        types={state.global.types}
                        handlerValue={this.props.handlerValue}
                        selectedSquare={this.state.selectedSquare}
                        selectedSquareHandler={this.selectedSquareHandler}
                        colorList={this.props.colorList}
                        handleChangeSquareVector={this.handleChangeSquareVector}
                        handleMoveSquareVector={this.handleMoveSquareVector}
                        handleScaleSquareVector={this.handleScaleSquareVector}
                        celltypeList={state.global.types}
                        cellTypeColorList={state.colorList}
                      />
                    </div>
                  </div>
                }
              </div>
            )
          }
        </xmlData.Consumer>

        <div className={classes.root}></div>
      </div>
    );
  }
}

export default withStyles(styles)(Global);
