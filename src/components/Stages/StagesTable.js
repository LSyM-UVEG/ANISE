import React, { Component, useEffect } from "react";
import xmlData from "../../context/xmlData";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import Grid from "@material-ui/core/Grid";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import { InputNumber } from "../Potentials/InputNumber";
import { IconButton } from "@material-ui/core";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import Switch from "@material-ui/core/Switch";

export const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

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

class StagesTable extends Component {
  render() {
    return (
      <Grid component="span" container spacing={2} justify={"center"}>
        <Grid item xs={12} md={11}>
          <xmlData.Consumer>
            {(state) =>
              state &&
              state.stages && (
                <div>
                  <ul>{/*JSON.stringify(state.stages)*/}</ul>
                  <ThemeProvider theme={theme}>
                    <MaterialTable
                      icons={tableIcons}
                      title=""
                      header="False"
                      columns={[
                        { title: "Order", field: "order", editable: "never", align: "left" },
                        { title: "Frames", field: "duration", type: "numeric", align: "left" },
                        { title: "Intermediate", field: "intermediate", type: "numeric", hidden: true, align: "left" },
                        { title: "Mechanics", field: "mechanics", type: "boolean", align: "left" },
                        { title: "Growth", field: "growth", type: "boolean", align: "left" },
                        { title: "Proteins", field: "proteins", type: "boolean", align: "left" },
                        { title: "Total time", field: "realTime", type: "numeric", align: "left" },
                      ]}
                      data={state.stages.map((stage, i) => {
                        if (stage) {
                          return {
                            order: i + 1,
                            duration: stage.$.duration,
                            intermediate: stage.$.intermediate,
                            mechanics: typeof stage.mechanics !== "undefined",
                            growth: typeof stage.growth !== "undefined",
                            proteins: typeof stage.proteins !== "undefined",
                            realTime: (stage.$.duration * stage.$.intermediate * state.global.deltat)
                              .toLocaleString("en-US", {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2,
                              })
                              .replace(/,/g, ""),
                          };
                        } else {
                          return {};
                        }
                      })}
                      onRowClick={(evt, selectedRow) => {
                        this.props.handlerSelected(selectedRow.tableData.id);
                      }}
                      options={{
                        search: false,
                        paging: false,
                        toolbar: false,
                        showTitle: false,
                        rowStyle: (rowData) => ({
                          backgroundColor: this.props.selected === rowData.tableData.id ? "#2196F3" : "#FFF",
                        }),
                      }}
                      //   cellEditable={{
                      //     cellStyle: {},
                      //     onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                      //         return new Promise((resolve, reject) => {
                      //           setTimeout(() => {
                      //             rowData[columnDef.field] = newValue;
                      //             if(columnDef.field === 'duration' || columnDef.field === 'realTime')
                      //               rowData.intermediate = Math.max(1, Math.round( rowData.realTime / (state.global.deltat *rowData.duration)));

                      //             this.props.handlerUpdate(rowData, rowData.order -1);
                      //             resolve();
                      //           }, 0)
                      //         });
                      //     }
                      // }}
                      //editable={{
                      // onRowAdd: newData =>
                      //   new Promise((resolve, reject) => {
                      //     setTimeout(() => {
                      //       if(typeof newData.realTime !== "undefined" && typeof newData.duration !== "undefined")
                      //         newData.intermediate = Math.max(1, Math.round( newData.realTime / (state.global.deltat *newData.duration)));
                      //       else
                      //         newData.intermediate = 1;
                      //       if(typeof newData.duration === "undefined")
                      //         newData.duration = 1;
                      //       this.props.handlerAdd(newData);
                      //       resolve();
                      //     }, 0)
                      //   }),
                      // onRowUpdate: (newData, oldData) =>
                      //   new Promise((resolve, reject) => {
                      //     setTimeout(() => {
                      //       this.props.handlerUpdate(newData, oldData.tableData.id);
                      //       resolve();
                      //     }, 1000)
                      //   }),
                      // onRowDelete: oldData =>
                      //   new Promise((resolve, reject) => {
                      //     setTimeout(() => {
                      //       this.props.handlerDelete(oldData.tableData.id);
                      //       resolve();
                      //     }, 0)
                      //   }),
                      //}}
                    />
                  </ThemeProvider>
                </div>
              )
            }
          </xmlData.Consumer>
        </Grid>
      </Grid>
    );
  }
}

export function StageData(props) {
  const [inputTime, setInputTime] = React.useState(props.value.$.duration * props.value.$.intermediate * props.deltat);

  let totalTime = props.value.$.duration * props.value.$.intermediate * props.deltat;
  totalTime = Math.round(parseFloat(totalTime) * 10000) / 10000;

  useEffect(() => {
    setInputTime(totalTime);
    // eslint-disable-next-line 
  }, [props.value.$.order])

  const handleSwitch = (property) => (event) => {
    let newData = {
      duration: props.value.$.duration,
      intermediate: props.value.$.intermediate,
      mechanics: typeof props.value.mechanics !== "undefined",
      growth: typeof props.value.growth !== "undefined",
      proteins: typeof props.value.proteins !== "undefined",
    };
    newData[property] = event.target.checked;
    if (property === "growth" && event.target.checked)
      newData["mechanics"] = event.target.checked;
    props.handlerUpdate(newData, props.value.$.order - 1);
  };

  const handleValue = (property) => (newValue) => {
    if (property === "intermediate") {
      setInputTime(newValue);
      // Convert from total time to intermediate
      newValue = newValue / (props.value.$.duration * props.deltat);
      newValue = Math.ceil(newValue);
    }
    let newData = {
      duration: props.value.$.duration,
      intermediate: props.value.$.intermediate,
      mechanics: typeof props.value.mechanics !== "undefined",
      growth: typeof props.value.growth !== "undefined",
      proteins: typeof props.value.proteins !== "undefined",
    };
    newData[property] = newValue + "";
    props.handlerUpdate(newData, props.value.$.order - 1);
  };

  const handleChangePhase = (change) => () => {
    let increment = change === "next" ? 1 : -1;
    let currentStageId = parseInt(props.value.$.order) - 1;
    let nextStageId = (((currentStageId + increment) % props.newStages) + props.newStages) % props.newStages; // Calculo de modulo (% es resto)
    props.handlerSelected(nextStageId);
  };

  return (
    <span style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", margin: "20px" }}>
      <IconButton aria-label="before_phase" onClick={handleChangePhase("before")}>
        <ArrowBackIosOutlinedIcon color="primary" />
      </IconButton>

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignContent: "space-evenly",
          flexWrap: "wrap",
          backgroundColor: "rgba(33, 150, 243, 0.314)",
          borderRadius: "4px",
          margin: "10px",
          padding: "10px",
          flexGrow: "0",
          boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
          width: "500px",
          height: "400px",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          style={{
            width: "440px",
            borderRadius: "4px",
            boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "dodgerblue"
          }}
        >
          Stage {props.value.$.order} selected
        </Typography>


        <span style={{ width: "70px" }}> </span>
        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "160px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Frames
          </Typography>
          <InputNumber name="duration" value={props.value.$.duration} minValue={1} increment={1} round={0} handleValue={handleValue} />
        </span>
        <span style={{ width: "20px" }}> </span>
        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "160px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom> Intermediate </Typography>
          <Typography color="textSecondary" variant="h4"> {props.value.$.intermediate} </Typography>
        </span>
        <span style={{ width: "70px" }}> </span>


        <span style={{ width: "40px" }}> </span>
        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "120px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Mechanics
          </Typography>
          <Switch checked={typeof props.value.mechanics !== "undefined"} onChange={handleSwitch("mechanics")} />
        </span>
        <span style={{ width: "20px" }}> </span>
        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "120px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Growth
          </Typography>
          <Switch checked={typeof props.value.growth !== "undefined"} onChange={handleSwitch("growth")} />
        </span>
        <span style={{ width: "20px" }}> </span>
        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "120px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Proteins
          </Typography>
          <Switch checked={typeof props.value.proteins !== "undefined"} onChange={handleSwitch("proteins")} />
        </span>
        <span style={{ width: "40px" }}> </span>


        <span style={{ width: "70px" }}> </span>
        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "160px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom>
            Input time
          </Typography>
          <InputNumber name="intermediate" value={inputTime} minValue={0} round={5} handleValue={handleValue} />
        </span>
        <span style={{ width: "20px" }}> </span>
        <span style={{ borderStyle: "solid", borderRadius: "4px", width: "160px", backgroundColor: "GhostWhite" }}>
          <Typography color="textSecondary" variant="h5" gutterBottom> Time </Typography>
          <Typography color="textSecondary" variant="h4" gutterBottom> {totalTime + ""} </Typography>
        </span>
        <span style={{ width: "70px" }}> </span>
      </div>
      <IconButton aria-label="next_phase" onClick={handleChangePhase("next")}>
        <ArrowForwardIosOutlinedIcon color="primary" />
      </IconButton>
    </span>
  );
}

export default StagesTable;
