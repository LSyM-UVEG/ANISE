import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase"

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    flexDirection: "row",
    width: "100%",
    height: "200px",
    justifyContent: "stretch",
  },
  block: {
    backgroundColor: "rgba(220, 220, 220, 0.5)",
    flexGrow: "1",
    "&:hover": {
      backgroundColor: "rgba(63, 180, 255, 0.5)",
    },
  },
  separator: {
    width: "10px",
    cursor: "ew-resize",
    position: "relative",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
      
    backgroundColor: "#3f51b5",
    "&:hover": {
      backgroundColor: "#002984",
    },
  },

  legend: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "200px",
    width: "100px"
    //justiyContent: "center",
    // alignItems: "stretch",
    //alignContent: "stretch"
  },
  fieldInput: {
    textAlign: "center",
    fontSize: theme.typography.h6.fontSize,
    WebkitAppearance: "textfield",
    appearance: "textfield",
    padding: "0 0 0",
    fontFamily: "Roboto,Helvetica,Arial",
    "&:input":{
      fontFamily: "Roboto,Helvetica,Arial",
    }
  },
}));

function VerticalSlider(props) {
  let marginStr = typeof props.rightSide !== "undefined" ? "0px -1em" : "0px 0px";
  return (
    <div className="Controls-slider-wrap" style={{zIndex:"1"}}>
      <input
        className="verticalSlider"
        type="range"
        min="1.0"
        max={props.maxValue}
        onChange={props.handle}
        onMouseUp={props.handleSave}
        step="0.01"
        value={props.value}
      />
      <Typography className='Controls-slider-label' style={{margin: `${marginStr}`}}>
      {parseFloat(props.value).toFixed(2)} 
      </Typography>
    </div>
  );
}

function Line(props) {
  return (
    <svg
      width="100%"
      height="175px"
      viewBox="0 0 100% 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="0%"
        y1="50"
        x2="100%"
        y2="50"
        stroke="darkGray"
        strokeWidth="2px"
      />
      <line
        x1="0%"
        y1="100"
        x2="100%"
        y2="100"
        stroke="darkGray"
        strokeWidth="2px"
      />
      <line
        x1="0%"
        y1="150"
        x2="100%"
        y2="150"
        stroke="darkGray"
        strokeWidth="2px"
      />
      <line
        class="line1"
        x1="0%"
        y1={150 - (props.start / props.max * 100)}
        x2="100%"
        y2={150 - (props.end / props.max * 100)}
        strokeWidth="2px"
      />
    </svg>
  );
}

function AreaLine(props) {
  return (
    <svg
      width="40px"
      height="200px"
      viewBox="0 0 100% 100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{marginRight:"-15px", zIndex:"1"}}
    >
      <defs>
        <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polyline points="0,3 5,5 0,7" stroke="#3f51b5" fill="#3f51b5" />
        </marker>
      </defs>
      <line
        x1="50%"
        y1="100%"
        x2="50%"
        y2="0%"
        stroke="#3f51b5"
        strokeWidth="5px"
        markerEnd="url(#arrowHead)"
      />
    </svg>
  );
}

function TimeLine(props) {
  return (
    <React.Fragment>
    <svg
      width="100%"
      height="40px"
      viewBox="0 0 100% 100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{marginTop:"-20px", paddingLeft:"97px", paddingRight:"60px"}}
    >
      {/* <defs>
        <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto">
          <polyline points="0,3 10,5 0,10" />
        </marker>
      </defs> */}
      <line
        x1="0%"
        y1="50%"
        x2="100%"
        y2="50%"
        stroke="#3f51b5"
        strokeWidth="5px"
        markerEnd="url(#arrowHead)"
      />
    </svg>
    <span style={{display:"flex", justifyContent:"space-between", marginTop:"-20px", paddingLeft:"40px", paddingRight:"20px"}}>
      <Typography variant="h6">Start cell cycle</Typography>
      <Typography variant="h6" color="textSecondary">time</Typography>
      <Typography variant="h6">End cell cycle</Typography>
    </span>
    </React.Fragment>
  );
}


function GrowthPhase(props) {
  const [startingPoint, setStartingPoint] = React.useState(null); // datos
  const [endingPoint, setEndingPoint] = React.useState(null); // datos
  const [internUpdate, setInternUpdate] = React.useState(false);
  //alert(props.start);
  if (!internUpdate) {
    if (parseFloat(startingPoint) !== parseFloat(props.start)) {
      setStartingPoint(parseFloat(props.start));
      return;
    }
    if (parseFloat(endingPoint) !== parseFloat(props.end)) {
      setEndingPoint(parseFloat(props.end));
      return;
    }
  }

  const changePointValue = (point) => (e) => {
    setInternUpdate(true); // Only intern update
    point === "start"
      ? setStartingPoint(e.target.value)
      : setEndingPoint(e.target.value);
  };

  const savePointValue = (point) => (e) => {
    let property = point === "start" ? "a0i" : "a0f";
    props.handlerSavePoint(property, e.target.value);
    setInternUpdate(false); // Allowing external updates
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "-32px",
      }}
    >
      {props.enabled && (
        <VerticalSlider
          value={startingPoint}
          maxValue={props.max}
          handle={changePointValue("start")}
          handleSave={savePointValue("start")}
        />
      )}
      <Line start={startingPoint-1.0} end={endingPoint-1.0} max={props.max-1.0} />
      {props.enabled && (
        <VerticalSlider
          value={endingPoint}
          maxValue={props.max}
          handle={changePointValue("end")}
          handleSave={savePointValue("end")}
          rightSide
        />
      )}
    </div>
  );
}

const getPercentage = (current, max) => (100 * current) / max;

export function ResizablePanel(props) {
  const classes = useStyles();
  const [arrayWidth, setArrayWidth] = React.useState([]); // datos
  const [maxGrowth, setMaxGrowth] = React.useState(2.0); 
  const [internalUpdate, setInternalUpdate] = React.useState(false);

  const sliderRef = React.useRef();
  const diff = React.useRef();
  const selectedSeparator = React.useRef();
  const arrayMolon = React.useRef();

  let phasesArray = props.phasesArray;
  if (!Array.isArray(phasesArray)) phasesArray = [phasesArray];

  const handleMouseDown = (e, id, left) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    diff.current = e.clientX - e.target.getBoundingClientRect().left;
    selectedSeparator.current = id;
    setInternalUpdate(true);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);

    let id = selectedSeparator.current;
    if (typeof arrayMolon.current === "undefined")
      return;
    props.handleChangeProps(
      id + 1,
      "prop",
      arrayMolon.current[id] / 100);
    props.handleChangeProps(
      id + 2,
      "prop",
      arrayMolon.current[id + 1] / 100);

    setInternalUpdate(false);
  };

  const handleMouseMove = useCallback(
    (e) => {
      let newX =
        e.clientX -
        diff.current -
        sliderRef.current.getBoundingClientRect().left;

      let copyArray = arrayWidth.slice();
      const id = selectedSeparator.current;

      let sliderWidthWithoutSeparator = sliderRef.current.offsetWidth;
      for (let i = 0; i < copyArray.length - 1; i++)
        sliderWidthWithoutSeparator -= 10; // Se resta el tamaño de los separadores

      for (let i = 0; i < id; i++)
        newX -= 10; // Se resta el tamaño de los separadores

      // compute percentage
      let newPercentage = getPercentage(newX, sliderWidthWithoutSeparator);
      for (let i = 0; i < id; i++) newPercentage -= copyArray[i];

      // percentage limits
      const start = 0;
      const end = copyArray[id] + copyArray[id + 1];
      if (newPercentage < start) {
        newPercentage = 0;
      }
      if (newPercentage > end) {
        newPercentage = end;
      }

      // set new values
      copyArray[id] = newPercentage;
      copyArray[id + 1] = end - newPercentage;

      arrayMolon.current = copyArray;
      setArrayWidth(copyArray);
    },
    [arrayWidth]
  );

  // check maxGroth value
  let newMaxGrowth = maxGrowth;
  phasesArray.forEach(phase => {
    newMaxGrowth = Math.max(newMaxGrowth, parseFloat(phase.$.a0i));
    newMaxGrowth = Math.max(newMaxGrowth, parseFloat(phase.$.a0f));
  });
  if (newMaxGrowth !== maxGrowth) {
    setMaxGrowth(newMaxGrowth);
    return;
  }

  const saveValue = (idPhase) => (property, value) => {
    //let id = selectedSeparator.current;

    props.handleChangeProps(idPhase, property, value);
  };

  function DivSelected(witdhValue, index) {
    if (typeof phasesArray[index] === "undefined")
      return(<div></div>);
      
    return (
      <div
        className={classes.block}
        style={{ width: `${witdhValue}%`, backgroundColor: "#2196F350" }}
        onClick={(e) => props.handleChangePhase(e, index + 1)}
      >
        {/* {witdhValue.toFixed(2)} */}
        <Typography variant="h5"> {index + 1} </Typography>
        <GrowthPhase
          enabled
          start={phasesArray[index].$.a0i}
          end={phasesArray[index].$.a0f}
          max={maxGrowth}
          handlerSavePoint={saveValue(index + 1)}
        />
        {witdhValue.toFixed(2)}%
      </div>
    );
  }

  function DivUnSelected(witdhValue, index) {

    if (typeof phasesArray[index] === "undefined")
      return(<div></div>);

    return (
      <div
        className={classes.block}
        style={{ width: `${witdhValue}%` }}
        onClick={(e) => props.handleChangePhase(e, index + 1)}
      >
        <Typography variant="h5"> {index + 1} </Typography>
        <GrowthPhase
          start={phasesArray[index].$.a0i}
          end={phasesArray[index].$.a0f}
          max={maxGrowth}
        />
        {witdhValue.toFixed(2)}%
      </div>
    );
  }

  // Actualiza el array de anchuras si ha variado algun valor
  if(props.sizes.length !== arrayWidth.length || !internalUpdate)
  {
    let totalSize = props.sizes.reduce(
      (total, value) => (total = parseFloat(total) + parseFloat(value))
    );
    let arraySizes = [];
    for (let s of props.sizes)
      arraySizes.push((parseFloat(s) / parseFloat(totalSize)) * 100);

    let needsUpdate = arraySizes.length !== arrayWidth.length;
    if (!needsUpdate)
      for (let i = 0; i < arraySizes.length; ++i) {
        if (arraySizes[i] !== arrayWidth[i])
          needsUpdate = true;
    }

    if (needsUpdate) {
      setArrayWidth(arraySizes);
      return;
    }
  }

  // Crea las particiones en funcion del arrayWidth
  let divPanel = arrayWidth.map((witdhValue, index) => {
    return (
      <React.Fragment>
        {index === props.selected
          ? DivSelected(witdhValue, index)
          : DivUnSelected(witdhValue, index)}
        {arrayWidth.length > index + 1 && (
          <div
            className={classes.separator}
            onMouseDown={(e) => handleMouseDown(e, index)}
          ></div>
        )}
      </React.Fragment>
    );
  });

  return (
    <React.Fragment>
    <div style={{display: "flex", alignItems: "center"}}>
      <div class={classes.legend} /*style={{alignItems:"flex-end"}}*/>
        <Typography variant="h6">Max area</Typography>
        <InputBase
            className="specialInputNumber"
            color="primary"
            type="number"
            value={maxGrowth}
            inputProps={{ className: classes.fieldInput, step: "0.01", min: "0"}}
            onChange={(e) => setMaxGrowth(
				parseFloat(e.target.valueAsNumber.toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2
                          }).replace(/,/g, ""))
			)}
            style={{backgroundColor: "rgba(0,0,255,0.1)", borderRatio: "10px", borderColor: "rgba(0,0,255,0.5)", borderStyle: "solid"}}
          />
        <Typography variant="h6">{(0.5 * (maxGrowth + 1.0)).toFixed(1)}</Typography>
        <Typography variant="h6">1.0</Typography>
        <Typography variant="h6">Min area</Typography>
      </div>
      <AreaLine/>
      <div style={{display:"flex", flexDirection:"column", width:"100%"}}>
        <div ref={sliderRef} className={classes.root}> {divPanel} </div>
      </div>
      <div style={{width:"100px"}}></div>
      {/* <div class={classes.legend}>
        <Typography variant="h6">Max</Typography>
        <InputBase
            className="specialInputNumber" 
            color="primary"
            type="number"
            value={maxGrowth}
            inputProps={{ className: classes.fieldInput, step: "0.01", min: "0"}}
            onChange={(e) => setMaxGrowth(
				parseFloat(e.target.valueAsNumber.toLocaleString('en-US', {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 2
                          }).replace(/,/g, ""))
			)}
            style={{backgroundColor: "rgba(0,0,255,0.1)", borderRatio: "10px", borderColor: "rgba(0,0,255,0.5)", borderStyle: "solid"}}
          />
        <Typography variant="h6">{(0.5 * (maxGrowth + 1.0)).toFixed(1)}</Typography>
        <Typography variant="h6">1.0</Typography>
        <Typography variant="h6">Min</Typography>
      </div> */}
    </div>
    <TimeLine/>
    </React.Fragment>
  );
}
