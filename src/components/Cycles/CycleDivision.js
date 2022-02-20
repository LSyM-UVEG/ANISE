import React from "react";
import Card from "@material-ui/core/Card";
//import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
//import Button from "@material-ui/core/Button";

import { HexagonCut } from "./HexagonCut";
import { DispersionChart } from "./DispersionChart";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import "../../assets/css/App.css";
import { FunctionButton } from "./FunctionEditor";
import { InputNumber } from "../Potentials/InputNumber";

export function CycleDivision(props) {
  const [divisionShift, setDivisionShift] = React.useState(props.divisionShift);
  const [divisionDispersion, setDivisionDispersion] = React.useState(parseFloat(props.divisionDispersion)); // datos
  const [divisionDispersionLimit, setDivisionDispersionLimit] = React.useState(parseFloat(props.divisionDispersionLimit));
  const [id, setId] = React.useState({ stage: props.stage, celltype: props.celltype });

  if (id.stage !== props.stage || id.celltype !== props.celltype) {
    setId({ stage: props.stage, celltype: props.celltype });
    setDivisionDispersionLimit(parseFloat(props.divisionDispersionLimit));
    setDivisionShift(isNaN(props.divisionShift) ? props.divisionShift : parseFloat(props.divisionShift));
    setDivisionDispersion(parseFloat(props.divisionDispersion));
    return null;
  }

  const handlerValue = (property) => (newValue) => {
    if (newValue !== null) handlerUpdate(property, newValue);
  };

  const handlerLocalValue = (property) => (newValue) => {
    if (newValue !== null) {
      if (property === "divisiondispersion") setDivisionDispersion(newValue);
      else if (property === "divisionshift") setDivisionShift(newValue);
      else if (property === "divisiondispersionlimit") setDivisionDispersionLimit(newValue);
    }
  };

  const handlerUpdate = (property, newValue) => {
    props.handlerUpdate([], property, null)(null, newValue); // TODO. Mejorar
  };

  const setAndUpdateDivisionShift = (newValue) => {
    if (newValue !== null) {
      setDivisionShift(newValue);
      handlerUpdate("divisionshift", newValue);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "20px",
        flexWrap: "wrap",
      }}
    >
      <Card
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "rgba(220, 220, 220, 0.5)",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Division Shift
          </Typography>
          <HexagonCut
            shift={isNaN(divisionShift) ? divisionShift : parseFloat(divisionShift)}
            dispersionLimit={parseFloat(divisionDispersionLimit)}
            handleShift={setDivisionShift}
            handleDispersionLimit={setDivisionDispersionLimit}
            handleUpdate={handlerUpdate}
          />
        </CardContent>
        {/* <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions> */}
      </Card>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          alignContent: "stretch",
          justifyContent: "space-around",
          width: "200px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      >
        <span
          style={{
            backgroundColor: "rgba(0, 0, 255, 0.1)",
            borderRadius: "4px",
            margin: "10px 10px",
            borderColor: "rgba(0, 0, 255, 0.5)",
            borderStyle: "solid",
          }}
        >
          <Typography color="textSecondary" variant="h5" gutterBottom>
            <FunctionButton equation={divisionShift} onChange={setAndUpdateDivisionShift} />
            <Tooltip title={<Typography>Shift angle, from the principal axis of the inertia tensor, that defines the cell division orientation</Typography>}>
              <span> Shift </span>
            </Tooltip>
          </Typography>

          <Tooltip title={<Typography>{divisionShift}</Typography>} aria-label="equation">
            <InputNumber
              onlyNumbers
              name="divisionshift"
              value={divisionShift}
              minValue={0}
              maxValue={1.571}
              round={5}
              handleValue={handlerValue}
              handleLocalValue={handlerLocalValue}
            />
          </Tooltip>
        </span>
        <span
          style={{
            backgroundColor: "rgba(75,192,192,0.1)",
            borderRadius: "4px",
            margin: "10px 10px",
            borderColor: "rgba(75,192,192,0.5)",
            borderStyle: "solid",
          }}
        >
          <Tooltip title={<Typography>Random orientation using a Normal distribution (&sigma;, mean) </Typography>}>
            <Typography color="textSecondary" variant="h5" gutterBottom>
              {" "}
              Dispersion{" "}
            </Typography>
          </Tooltip>
          <InputNumber name="divisiondispersion" value={divisionDispersion} minValue={0} round={5} handleValue={handlerValue} handleLocalValue={handlerLocalValue} />
        </span>
        <span
          style={{
            backgroundColor: "rgba(153, 50, 204, 0.1)",
            borderRadius: "4px",
            margin: "10px 10px",
            borderColor: "rgba(153, 50, 204, 0.5)",
            borderStyle: "solid",
          }}
        >
          <Tooltip title={<Typography>Bounds (limit value) to the tails of the Normal distribution</Typography>}>
            <Typography color="textSecondary" variant="h5" gutterBottom>
              {" "}
              Limit{" "}
            </Typography>
          </Tooltip>
          <InputNumber
            name="divisiondispersionlimit"
            value={divisionDispersionLimit}
            minValue={0.0}
            maxValue={1.571}
            round={5}
            handleValue={handlerValue}
            handleLocalValue={handlerLocalValue}
          />
        </span>
      </div>

      <Card
        style={{
          width: "400px",
          height: "400px",
          backgroundColor: "rgba(220, 220, 220, 0.5)",
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Division Dispersion
          </Typography>
          <DispersionChart
            dispersion={parseFloat(divisionDispersion)}
            dispersionLimit={parseFloat(divisionDispersionLimit)}
            handleDispersion={setDivisionDispersion}
            handleDispersionLimit={setDivisionDispersionLimit}
            handleUpdate={handlerUpdate}
          />
        </CardContent>
        {/* <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions> */}
      </Card>
    </div>
  );
}
