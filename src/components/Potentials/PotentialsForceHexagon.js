import React, {useState} from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

function PotentialsHexagon(props) {
  let transf = "translate(" + props.xTrans.toString() + ", " + props.yTrans.toString() + ")";

  return (
    <g transform={transf}>
        <polygon
          stroke={"#000000"}
          strokeWidth="5"
          stroke-dasharray={props.empty ? "10,10" : ""}
          fill={props.color}
          style={{transition: "fill 0.25s"}}
          points="-81,45 -81,-45 0,-90 81,-45 81,45 0,90"
        />
    </g>
  );
}


function PotentialsForceHexagon(props) {
  const hexagonVertices = [{x: -81, y: 45}, {x: -81, y: -45}, {x: 0, y: -90}, {x: 81, y: -45}, {x: 81, y: 45}, {x: 0, y: 90}]
  const [changingForce, setChangingForce] = useState(false);

  const onMouseDown = (event) => {
    setChangingForce(true);
  };

  const onDrag = (event) => {
      if (changingForce) {
        let newForce = {};
        newForce.x = parseFloat(props.force.x) - event.movementX + "";
        newForce.y = parseFloat(props.force.y) + event.movementY + "";
        props.handlerForce(newForce);
      }
  };

  const onMouseUp = (event) => {
    setChangingForce(false);
    props.handlerForceValue(props.force);
  };

  return (
    <div>
      
      <svg width="300px" height="400px" viewBox="-200 -250 400 500" onMouseDown={onMouseDown} onMouseMove={onDrag} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}>
        <defs>
            <marker id="arrowhead" markerWidth="5" markerHeight="4" 
            refX="0" refY="2" orient="auto">
            <polygon points="0 0, 5 2, 0 4" fill="black"/>
            </marker>
        </defs>

        <g>
          <g class="hexagons">
            <PotentialsHexagon
              color={props.cellTypeSelected !== "empty" ? props.colorList[Object.keys(props.celltypes).findIndex((value) => value === props.cellTypeSelected)] : "rgba(1,1,1,0"}
              empty={props.cellTypeSelected === "empty"}
              xTrans="0"
              yTrans="0"
            />
            { !isNaN(props.force.x) && !isNaN(props.force.y) &&  
              hexagonVertices.map((vert, i) => (
            <g><line x1={vert.x} x2={vert.x - parseFloat(props.force.x)} y1={vert.y} y2={vert.y + parseFloat(props.force.y)} stroke="black" stroke-width="5" marker-end="url(#arrowhead)" />
            <circle cx={vert.x - parseFloat(props.force.x)} cy={vert.y + parseFloat(props.force.y)} r="15" fill="rgb(0,0,0,0)"  /></g>
            ))}
            )
          </g>
        </g>
      </svg>
    </div>
  );
}

export default PotentialsForceHexagon;