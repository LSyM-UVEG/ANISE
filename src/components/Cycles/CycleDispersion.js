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
    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", width: "500px", flexWrap: "wrap" }}>
      <Typography variant="h5" style={{ marginRight: "10px", width: "500px" }}>
          {" "}
          Cell cycle{" "}
        </Typography>
        <Typography variant="h6" style={{ marginRight: "10px" }}>
          {" "}
          Stochastic{" "}
        </Typography>
      
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
      <Typography variant="h6" style={{ marginRight: "10px" }}>
          {" "}
          Deterministic{" "}
        </Typography>
      <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "0px", marginLeft: "10px", width: "120px" }}>
        <InputNumber name="dispersion" value={props.getPropertyValue("dispersion")} minValue={0} maxValue={1} round={4} handleValue={handleValue} handleLocalValue={handleValue}/>
      </div>
    </div>
  );
}
