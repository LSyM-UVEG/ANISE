import Typography from "@material-ui/core/Typography";
import React from "react";
import { Tooltip } from "@material-ui/core";
import { InputNumber } from "../Potentials/InputNumber";

export function CycleDuration(props) {
  const handleDuration = (name) => (newValue) => {

    let duration = parseFloat(newValue);
    
    if (!isNaN(duration)) {
      let speedValue = (1551.008) / duration ;
      props.setPropertyValue(null, name, null)(null, speedValue);
    }
  };

  let speedValue = props.getPropertyValue("speed");
  let duration = 0;
  if (!isNaN(speedValue)) {
    speedValue = parseFloat(speedValue);
    if (speedValue > 0) {
      duration = 1551.008 / speedValue;
      //duration = Math.round(duration * 10) / 10;
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap", width: "150px" }}>
    <Typography variant="h5" align="center" style={{width: "100px"}}>
     <Tooltip title={<Typography>Expected, average, duration of the cell cycle (dimensionless units) in the absence of mechanical stresses: {duration === 0 ? "unknown": duration}</Typography>}>
      <span> Duration </span>
     </Tooltip>
     </Typography>
     <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "0px", width: "150px" }}>
        
          {duration !== 0 && <InputNumber onlyNumbers name="speed" value={duration} minValue={0.0} round={1} handleValue={handleDuration} /> }
        {duration === 0 && <div style={{width: "150px", height:"50.85px", backgroundColor: "rgba(220, 220, 220, 0.5)"}}> </div>}
       </div>
  </div>
  );
}
