import React, { useCallback } from "react";

export function HexagonCut(props) {
  const initPos = React.useRef();
  const selection = React.useRef();
  const [update, setUpdate] = React.useState(false);

  const handleMouseDown = (e, s) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    initPos.current = e.clientY; // - e.target.getBoundingClientRect().left;
    selection.current = s;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
    setUpdate(true);
  };

  const handleMouseMove = useCallback(
    (e) => {

      const setAngle = (angle) => {
        if(!isNaN(angle))
          props.handleShift(angle);
      }
    
      const setAngleLimit = (angle) => {
        props.handleDispersionLimit(angle);// / Math.PI * 100.0);
      }

      const shiftIsNotANumber = isNaN(props.shift);
      let angle = parseFloat(props.shift);
      let angleLimit = props.dispersionLimit;
      let diff = e.clientY - initPos.current;
      //- sliderRef.current.getBoundingClientRect().left;

      if (selection.current === "angle" && !shiftIsNotANumber) {
        let newAngle = angle + diff * 0.01;
        newAngle = Math.min(newAngle, Math.PI * 0.5);
        newAngle = Math.max(newAngle, 0);
        newAngle = Math.round(newAngle * 1000) / 1000;
        setAngle(newAngle);
      } else {
        let newLimit = angleLimit + diff * 0.01;
        newLimit = Math.min(newLimit, Math.PI * 0.5);
        newLimit = Math.max(newLimit, 0);
        newLimit = Math.round(newLimit * 1000) / 1000;
        setAngleLimit(newLimit);
      }
    },
    [props]
  );

  function inDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  function inRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    let angleInRadians = inRadians(angleInDegrees);

    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  }

  function describeArc(x, y, radius, startAngle, endAngle, closed) {
    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);

    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    let d = [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ];
    d = closed ? [...d, "L", x, y] : d;
    d = d.join(" ");

    //let d2 = "M 200 100 A 100 100, 0, 0, 0, 175 25 L 100 100 Z";

    return d;
  }

  const shiftIsNotANumber = isNaN(props.shift);
   // Se comprueba si debe actualizar el json
  if (update) {
    setUpdate(false);

    if (selection.current === "angle" && !shiftIsNotANumber)
      props.handleUpdate("divisionshift", props.shift);
    else
      props.handleUpdate("divisiondispersionlimit", props.dispersionLimit);

    return null;
  }

  let angle = shiftIsNotANumber ? 0.0 : parseFloat(props.shift);
  let newAngle = -Math.PI * 0.25 + angle;
  let xAngle = Math.cos(newAngle) * 100.0;
  let yAngle = Math.sin(newAngle) * 100.0;
  let limit = props.dispersionLimit;// /100.0 * Math.PI;
  let angleLimit1 = polarToCartesian(
    100.0,
    100.0,
    100.0,
    inDegrees(newAngle + limit)
  );
  let angleLimit2 = polarToCartesian(
    100.0,
    100.0,
    100.0,
    inDegrees(newAngle - limit)
  );

  //let xAngleLimit = Math.cos(newAngle + limit) * 100.0;
  //let yAngleLimit = Math.sin(newAngle + limit) * 100.0;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 180"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <text x="0" y="15" fill="red">
        I love SVG!
      </text> */}
      <line class="lineAxis" x1="0" y1="0" x2="150" y2="150" />
      <line class="lineAxis" x1="75" y1="125" x2="175" y2="25" />

      <path
        //class="line3"
        d={describeArc(100, 100, 80, -45, (angle * 180) / Math.PI - 45, false)}
        fill="none"
        stroke="blue"
        strokeWidth="2.0px"
        opacity="0.5"
      />

      <path
        d={describeArc(
          100,
          100,
          95,
          inDegrees(angle - limit) - 45,
          inDegrees(angle + limit) - 45,
          true
        )}
        fill="rgba(75,192,192,1)"
        stroke="rgba(75,192,192,1)"
        strokeWidth="2.0px"
        opacity="0.5"
        onMouseDown={(e) => handleMouseDown(e, "limit")}
      />
      <line
        class="line3"
        x1="100"
        y1="100"
        x2={angleLimit1.x}
        y2={angleLimit1.y}
        onMouseDown={(e) => handleMouseDown(e, "limit")}
      />
      <line
        class="line3"
        x1="100"
        y1="100"
        x2={angleLimit2.x}
        y2={angleLimit2.y}
        onMouseDown={(e) => handleMouseDown(e, "limit")}
      />
      <line
        class="angleLine"
        x1="100"
        y1="100"
        x2={100 + xAngle}
        y2={100 + yAngle}
        onMouseDown={(e) => handleMouseDown(e, "angle")}
      />
      {/* <path
       class="line3"
        stroke="#000000"
        stroke-width="1.5"
        //fill={"red"}
        fillOpacity={"0.5"}
        path={describeArc(100, 100, 100, -45, angle * 180 / Math.PI - 45)}
       /> */}
      <polygon
        class="hexagon"
        stroke="#000000"
        stroke-width="1.5"
        //fill={"red"}
        fillOpacity={"0.5"}
        fill="none"
        //points="150,0 50,0 0,90 50,180 150,180 200,90"
        points="100,51 50,50 51,100 100,150 150,150 150,100"
      />
    </svg>
  );
}
