import Typography from "@material-ui/core/Typography";
import React from "react";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import {InputNumber} from "../Potentials/InputNumber"
import "../../assets/css/App.css";

export function CycleDispersion(props) {

  const handleValue = (name) => (value) => {
    props.setPropertyValue(null, name, null)(null, value);
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
      <Tooltip title={<Typography>Dispersion: Amount of stochasticity in the duration of the cell cycle</Typography>}>
        <Typography variant="h5" style={{ marginRight: "10px" }}>
          {" "}
          Dispersion:{" "}
        </Typography>
      </Tooltip>
      {" "}
      <Slider //className={classes.slider}
        name={"dispersion"}
        step={0.01}
        min={0.0}
        max={1.0}
        value={props.getPropertyValue("dispersion")}
        style={{width:"160px"}}
        onChange={(e, value) => props.setPropertyValue(null, "dispersion", null)(e, value)}
        aria-labelledby="input-slider"
        valueLabelDisplay="off"
      />
      <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "0px", marginLeft: "10px", width: "120px" }}>
        <InputNumber name="dispersion" value={props.getPropertyValue("dispersion")} minValue={0} maxValue={1} round={4} handleValue={handleValue} handleLocalValue={handleValue}/>
      </div>
    </div>
  );
}
