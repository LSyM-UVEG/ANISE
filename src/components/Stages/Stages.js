import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { AddCircle, RemoveCircle } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

import StagesTable from "./StagesTable";
import { StageData } from "./StagesTable";
import MultiSlider from "./MultiSlider";

//Helpers
import { deleteCyclesOfStage, deletePotetialsOfStage, deleteConstantsOfStage } from '../Deleters'

class Stages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
    };
  }

  changeSelected = (newSelected) => {
    if (this.state.selectedRow !== newSelected) this.setState({ selectedRow: newSelected });
  };

  handlerUpdateStage = (newValue, id) => {
    var newRow = {
      $: { order: id + 1 + "",
          duration: newValue.duration + "",
          intermediate: newValue.intermediate + ""},
    }
    if(newValue.mechanics)
      newRow.mechanics = null;
    if(newValue.growth)
      newRow.growth = null;
    if(newValue.proteins)
      newRow.proteins = null;

    var newStages = [...this.props.value.stages]; //... hace copia
    newStages[id] = newRow;
    this.props.handlerValue([], null, newStages);
  }

  handlerAddStage = () => {
    let newRow = {
      $: { order: this.props.value.stages.length + 1 + "",
          duration: "1",
          intermediate: "1"},
    }
    let newStages = [...this.props.value.stages, newRow]; //... hace copia
    this.props.handlerValue([], null, newStages);
    this.setState({selectedRow: this.props.value.stages.length})
  }

  handlerDeleteStage = () => {
    if(this.props.value.stages.length > 1)
    {
      let newStages = [...this.props.value.stages]; //... hace copia
      newStages.splice(this.state.selectedRow, 1); //Borra 1 elemento a partir de ese id

      //Recalcula order
      for(let i = this.state.selectedRow; i < newStages.length; i++)
        newStages[i].$.order--;

      // Clean cycles and potentials
      let newCycles = [...this.props.value.cycles];
      newCycles = deleteCyclesOfStage(newCycles, this.state.selectedRow);
      this.props.handlerCycles([], null, newCycles);

      let newPotentials = [...this.props.value.potentials];
      newPotentials = deletePotetialsOfStage(newPotentials, this.state.selectedRow);
      this.props.handlerPotentials([], null, newPotentials);

      //Clean proteins
      let newProteins = Object.assign({}, this.props.value.proteins);
      newProteins.constants = deleteConstantsOfStage(newProteins.constants, this.state.selectedRow);
      this.props.handlerProteins(newProteins);
      
      // change index selected if needed
      let newRow = this.state.selectedRow >= newStages.length ? newStages.length - 1 : this.state.selectedRow;
      this.setState({selectedRow: newRow});
      this.props.handlerValue([], null, newStages);
    }
  }

  render() {
    return (
      <Grid component="span" container justify={"center"} alignContent={"center"}>
        <Grid style={{ backgroundColor: "GhostWhite", padding: "0 0 0", width: "1100px" }}>
          <div style={{ maxWidth: "1100px", marginTop: "70px" }}>
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
              }}
            >
              <Grid item xs={3} justify="stretch">
                <Button variant="text" fullWidth="true" endIcon={<AddCircle />} onClick={this.handlerAddStage}
                style={{
                  borderRadius: "10px",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}>
                  Add New Stage
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Typography align="center" variant="h5">
                  {" "}
                  Stages{" "}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button variant="text" fullWidth="true" startIcon={<RemoveCircle />} onClick={this.handlerDeleteStage}
                style={{
                  borderRadius: "10px",
                  paddingTop: "10px",
                  paddingBottom: "10px"
                }}>
                  Remove Stage {this.state.selectedRow + 1}
                </Button>
              </Grid>
            </Grid>
            <MultiSlider
              value={this.props.value}
              handlerValue={this.props.handlerValue}
              selected={this.state.selectedRow}
              handlerSelected={this.changeSelected}
            />
            <StageData
              value={this.props.value.stages[this.state.selectedRow]}
              deltat={this.props.value.global.deltat}
              newStages={this.props.value.stages.length}
              selected={this.state.selectedRow}
              handlerSelected={this.changeSelected}
              handlerUpdate={this.handlerUpdateStage}
            />
            <StagesTable
              value={this.props.value}
              selected={this.state.selectedRow}
              handlerSelected={this.changeSelected}
              handlerUpdate={this.handlerUpdateStage}
            />
          </div>
        </Grid>
      </Grid>
      //  </div>
      //  </div>
    );
  }
}

export default Stages;
