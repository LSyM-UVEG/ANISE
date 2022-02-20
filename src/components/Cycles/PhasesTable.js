import React from "react";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { tableIcons } from "../Stages/StagesTable";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { InputNumber } from "../Potentials/InputNumber";
import { IconButton } from "@material-ui/core";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";

const theme = createMuiTheme({
  palette: {
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
  },
  overrides: {
    MuiTableRow: {
      hover: {
        "&:hover": {
          backgroundColor: "rgba(63, 180, 255, 1.0) !important",
        },
      },
    },
  },
});

// props.phasesArray
// props.updateValue
// props.handleChangePhase
// props.selected

export function PhaseData(props) {
  const data = props.phasesArray.map((phase, i) => {
    if (phase) {
      return {
        phase: phase._,
        a0i: phase.$.a0i,
        a0f: phase.$.a0f,
        reldiv: phase.$.reldiv,
        prop: parseFloat(phase.$.prop).toFixed(2),
      };
    } else {
      return {};
    }
  });

  const selected = (props.selected < data.length) ? props.selected : 0;
  
  // handle, check phase proportions
  const updateValue = (phase, property, newValue) => {
    // check the proportion property, changing the neighbour prop
    if (property === "prop") {
      let oldProportion = parseFloat(props.phasesArray[parseInt(phase) - 1].$.prop);
      let idPhaseNeighbour = parseInt(phase) < props.phasesArray.length ? parseInt(phase) + 1 : parseInt(phase) - 1;
      let diffProportion = newValue - oldProportion;

      if (idPhaseNeighbour > 0 && newValue <= oldProportion + parseFloat(props.phasesArray[idPhaseNeighbour - 1].$.prop)) {
        props.updateValue(phase, property, newValue);
        let newProportionNeighbour = parseFloat(props.phasesArray[idPhaseNeighbour - 1].$.prop) - diffProportion;
        props.updateValue(idPhaseNeighbour, property, newProportionNeighbour);
      }
    } else props.updateValue(phase, property, newValue);
  };

  const handleValue = (propertyName) => (newValue) => {
    if (newValue === "") newValue = "0";
    let phaseId = data[selected].phase;
    updateValue(phaseId, propertyName, newValue);
  };

  const handleChangePhase = (change) => () => {
    let increment = change === "next" ? 1 : -1;
    let currentPhaseId = parseInt(data[selected].phase) - 1;
    let nextPhase = (((currentPhaseId + increment) % data.length) + data.length) % data.length; // Calculo de modulo (% es resto)
    props.handleChangePhase(null, nextPhase + 1 + "");
  };

  return (
    <span style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "20px" }}>
      <IconButton aria-label="before_phase" onClick={handleChangePhase("before")}>
        <ArrowBackIosOutlinedIcon color="primary" />
      </IconButton>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
          backgroundColor: "rgba(33, 150, 243, 0.314)",
          borderRadius: "4px",
          margin: "10px",
          padding: "10px",
          flexGrow: "1",
          boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        }}
      >
        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "160px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Initial
          </Typography>
          <InputNumber name="a0i" value={data[selected].a0i} minValue={1} round={5} handleValue={handleValue} />
        </span>

        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "160px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Final
          </Typography>
          <InputNumber name="a0f" value={data[selected].a0f} minValue={1} round={5} handleValue={handleValue} />
        </span>

        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "160px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Interpolation
          </Typography>
          <InputNumber name="reldiv" value={data[selected].reldiv} minValue={0} maxValue={1} round={5} handleValue={handleValue} />
        </span>

        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "160px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Proportion
          </Typography>
          <InputNumber name="prop" value={data[selected].prop} minValue={0.0} maxValue={1.0} round={5} handleValue={handleValue} />
        </span>
      </div>
      <IconButton aria-label="next_phase" onClick={handleChangePhase("next")}>
        <ArrowForwardIosOutlinedIcon color="primary" />
      </IconButton>
    </span>
  );
}

export function PhasesTable(props) {
  // handle, check phase proportions
  const updateValue = (phase, property, newValue) => {
    // check the proportion property, changing the neighbour prop
    if (property === "prop") {
      let oldProportion = parseFloat(props.phasesArray[parseInt(phase) - 1].$.prop);
      let idPhaseNeighbour = parseInt(phase) < props.phasesArray.length ? parseInt(phase) + 1 : parseInt(phase) - 1;
      let diffProportion = newValue - oldProportion;

      props.updateValue(phase, property, newValue);
      if (idPhaseNeighbour > 0) {
        let newProportionNeighbour = parseFloat(props.phasesArray[idPhaseNeighbour - 1].$.prop) - diffProportion;
        props.updateValue(idPhaseNeighbour, property, newProportionNeighbour);
      }
    } else props.updateValue(phase, property, newValue);
  };

  return (
    <Grid component="span" container spacing={2} justify={"center"}>
      <Grid item xs={12} md={12} lg={12}>
        <ThemeProvider theme={theme}>
          <MaterialTable
            icons={tableIcons}
            title=""
            header="False"
            columns={[
              { title: "Phase number", field: "phase", editable: "never", align: "left" },
              { title: "Apical area (initial)", field: "a0i", type: "numeric", align: "left" },
              { title: "Apical area (final)", field: "a0f", type: "numeric", align: "left" },
              { title: "Linear interpolation", field: "reldiv", type: "numeric", align: "left" },
              { title: "Proportional duration", field: "prop", align: "left" },
            ]}
            components={{
              EditField: (props) => (
                <TextField
                  fullWidth
                  type="number"
                  inputProps={{ step: "0.01", min: "0" }}
                  onChange={(e) => {
                    props.onChange(
                      parseFloat(
                        e.target.value
                          .toLocaleString("en-US", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          })
                          .replace(/,/g, "")
                      )
                    );
                  }}
                  value={props.value}
                />
              ),
            }}
            data={props.phasesArray.map((phase, i) => {
              if (phase) {
                return {
                  phase: phase._,
                  a0i: phase.$.a0i,
                  a0f: phase.$.a0f,
                  reldiv: phase.$.reldiv,
                  prop: parseFloat(phase.$.prop).toFixed(2),
                };
              } else {
                return {};
              }
            })}
            onRowClick={(evt, selectedRow) => {
              props.handleChangePhase(evt, selectedRow.tableData.id + 1);
            }}
            options={{
              search: false,
              paging: false,
              toolbar: false,
              //  actionsColumnIndex: 6,
              rowStyle: (rowData) => ({
                backgroundColor: props.selected === rowData.tableData.id ? "#2196F350" : "#FFF",
              }),
            }}
            cellEditable={{
              cellStyle: {},
              onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                return new Promise((resolve, reject) => {
                  setTimeout(() => {
                    rowData[columnDef.field] = newValue;
                    // console.log("newValue: " + newValue);
                    updateValue(rowData["phase"], columnDef.field, newValue);
                    resolve();
                    //setTimeout(resolve, 4000);
                  }, 0);
                });
              },
            }}
          />
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
