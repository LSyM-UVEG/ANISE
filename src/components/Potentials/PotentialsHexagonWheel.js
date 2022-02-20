import React, {useState, useEffect} from "react";


function PotentialsHexagon(props) {
  let transf = "translate(" + props.xTrans.toString() + ", " + props.yTrans.toString() + ")";

  return (
    <g transform={transf}>
        <polygon
          stroke={"#000000"}
          strokeWidth="0.6"
          stroke-dasharray={props.empty ? "1,1" : ""}
          fill={props.color}
          style={{transition: "fill 0.25s"}}
          points="-9,5 -9,-5 0,-10 9,-5 9,5 0,10"
        />
    </g>
  );
}

function PotentialsHexagonWheel(props) {

  const getHexagonType = (idx) => {
    let list = ["empty"];
    list.push(...Object.keys(props.celltypes))

    let n = list.length;
    idx = ((idx%n)+n)%n;    // Module operation

    return list[idx];
  }

  const getHexagonsWheel = () => {
    let list = [];
    list.push(getHexagonType(0));
    list.push(getHexagonType(1));
    list.push(getHexagonType(2));
    list.push(getHexagonType(-3));
    list.push(getHexagonType(-2));
    list.push(getHexagonType(-1));
    return list;
  }

  const [rotation, setRotation] = useState(0);
  const [intermediateRotation, setIntermediateRotation] = useState(0);
  const hexagonsWheel = [{x: 18, y: 0}, {x: 9, y: 15}, {x: -9, y: 15}, {x: -18, y: 0}, {x: -9, y: -15}, {x: 9, y: -15}];
  const [hexagonsWheelTypes, setHexagonsWheelTypes] = useState(getHexagonsWheel());
  const [rotationFromParent, setRotationFromParent] = useState(0);
  
  useEffect(() => {
    setHexagonsWheelTypes(getHexagonsWheel());
    // eslint-disable-next-line 
  }, [props.celltypes])

  const onDrag = (event) => {
    if (event.buttons > 0) {
      let newIntermediateRotation = intermediateRotation + event.movementY * 0.5;
      if (newIntermediateRotation > 60) {
        newIntermediateRotation = 60;
      } else if (newIntermediateRotation < -60) {
        newIntermediateRotation = -60;
      }
      rotateWheel(rotation*60 + newIntermediateRotation);
      setIntermediateRotation(newIntermediateRotation);
    }
  };

  const onMouseUp = (event) => {
    if (intermediateRotation > 30) {
      changeRotation(1);
    } else if (intermediateRotation < -30) {
      changeRotation(-1);
    } else {
      changeRotation(0);
    }
    setIntermediateRotation(0);
  };

  const handlerWheel = (event) => {
    event.preventDefault();
    let newIntermediateRotation = intermediateRotation + event.deltaY;

    if (newIntermediateRotation <= -120) {
      newIntermediateRotation = 0;
      changeRotation(-1);
    } else if (newIntermediateRotation >= 120) {
      newIntermediateRotation = 0;
      changeRotation(1);
    }
    setIntermediateRotation(newIntermediateRotation);
  };  

  const changeRotation = (offsetRot) => {
    let newRotation = rotation + offsetRot;
    rotateWheel(newRotation*60);
    setRotation(newRotation);
    props.handlerOtherCellTypeSelected(getHexagonType(-newRotation));

    let idx = (-rotation + 3);
    let n = 6;
    idx = ((idx%n)+n)%n;    // Module operation
    if (offsetRot < 0) {
      hexagonsWheelTypes[idx] = getHexagonType(3 - rotation);
    } else if (offsetRot > 0) {
      hexagonsWheelTypes[idx] = getHexagonType(-3 - rotation);
    }
    setHexagonsWheelTypes(hexagonsWheelTypes);
  }

  const rotateWheel = (value) => {
    document.getElementById("wheelHexagons").setAttribute("style", "transform: rotate(" + value.toString() + "deg)");
    document.getElementById("mainHexagon").setAttribute("style", "transform: rotate(" + value.toString() + "deg)");
  }

  const checkRotationFromParent = () => {
    if (props.rotation !== rotationFromParent) {
      if (props.rotation > rotationFromParent)
        changeRotation(1);
      else
        changeRotation(-1);
      setIntermediateRotation(0);
      setRotationFromParent(props.rotation);
    }
  }

  checkRotationFromParent();
  
  return (
    <div>
      <svg width="300px" height="400px" onMouseMove={onDrag} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} onWheel={handlerWheel}>
        <defs>
          <linearGradient id="grad1">
            <stop offset="35%" stop-color="rgba(234, 234, 237, 1.0)" stopOpacity="1"/>
            <stop offset="80%" stop-color="rgba(234, 234, 237, 1.0)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        <g transform="translate(75, 200) scale(7,7)">
          <g id="wheelHexagons" class="hexagons">
            {hexagonsWheel.map((hex, i) => (
            <PotentialsHexagon
              color={hexagonsWheelTypes[i] !== "empty" ? props.colorList[Object.keys(props.celltypes).findIndex((value) => value === hexagonsWheelTypes[i])] : "rgba(1,1,1,0"}
              empty={hexagonsWheelTypes[i] === "empty"}
              xTrans={hex.x}
              yTrans={hex.y}
            />

          ))}
          </g>
          
          <rect width="40" height="60" fill="rgba(234, 234, 237, 1.0)" transform="translate(0,0) translate(-40, -30)" />
          <rect width="30" height="60" fill="url(#grad1)" transform="translate(0,0) rotate(30) translate(-15, -30)" />
          <rect width="30" height="60" fill="url(#grad1)" transform="translate(0,0) rotate(-30) translate(-15, -30)" />

          <rect/>
  <foreignObject>
    <body xmlns="http://www.w3.org/1999/xhtml">
      <div>
        Hello, <b>World</b>!
      </div>
    </body>      
  </foreignObject>

          <g id="mainHexagon" class="hexagons">
            <PotentialsHexagon
              color={props.cellTypeSelected !== "empty" ? props.colorList[Object.keys(props.celltypes).findIndex((value) => value === props.cellTypeSelected)] : "rgba(1,1,1,0"}
              empty={props.cellTypeSelected === "empty"}
              xTrans="0"
              yTrans="0"
            />
          </g>

          <text class="not-selectable" x="0" y="0" fill="black" text-anchor="middle" style={{fontSize: 3}}>{props.cellTypeSelected}</text>
          <text class="not-selectable" x="18" y="0" fill="black" text-anchor="middle" style={{fontSize: 3}}>{props.otherCellTypeSelected}</text>
        </g>
      </svg>
    </div>
  );
}

export default PotentialsHexagonWheel;