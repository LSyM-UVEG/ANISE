import Typography from "@material-ui/core/Typography";
import React from "react";
import { FunctionButton } from "./FunctionEditor";
import { Tooltip } from "@material-ui/core";
import { InputNumber } from "../Potentials/InputNumber";

export function CycleSpeed(props) {
  const handleSpeed = (name) => (newValue) => {
    props.setPropertyValue(null, name, null)(null, newValue);
  };

  let speedValue = props.getPropertyValue("speed");
  if (!isNaN(speedValue)) speedValue = parseFloat(speedValue);

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", width: "200px" }}>
      <Typography variant="h5" align="right">
        <FunctionButton equation={speedValue} onChange={handleSpeed("speed")} />
        <Tooltip title={<Typography>Growth rate of the apical area</Typography>}>
          <span> Growth speed </span>
        </Tooltip>
      </Typography>
      <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "0px", width: "120px" }}>
        <Tooltip title={<Typography>{speedValue}</Typography>} aria-label="equation">
          <InputNumber onlyNumbers name="speed" value={props.getPropertyValue("speed")} minValue={0.0} round={4} handleValue={handleSpeed} />
        </Tooltip>
      </div>
    </div>
  );
}
