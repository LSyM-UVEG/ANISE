import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  root: {
    display: "flex",
    flexFlow: "row nowrap",
    flexDirection: "row",
    width: "555",
    height: "100px",
    justifyContent: "stretch",
  },
  block: {
    backgroundColor: "rgba(220, 220, 220, 0.35)",
    flexGrow: "1",
    "&:hover": {
      backgroundColor: "rgba(63, 180, 255, 0.35)",
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

    backgroundColor: "#0000ff",
    "&:hover": {
      backgroundColor: "#rgba(63, 180, 255, 1.0)",
    },
  },
}));

const getPercentage = (current, max) => (100 * current) / max;

export function ResizableStages(props) {
  const classes = useStyles();
  const [arrayWidth, setArrayWidth] = React.useState([]); // datos

  const sliderRef = React.useRef();
  const diff = React.useRef();
  const selectedSeparator = React.useRef();
  const arrayMolon = React.useRef();

  const handleMouseDown = (e, id, left) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
    diff.current = e.clientX - e.target.getBoundingClientRect().left;
    selectedSeparator.current = id;
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);

    //let id = selectedSeparator.current;
    //props.handleChangeProps(id, "prop", null)(null, arrayMolon.current[id] / 100);
    // props.handleChangeProps(
    //   id + 2,
    //   "prop",
    //   null
    // )(null, arrayMolon.current[id + 1] / 100);
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

      
    props.handleChangeProps(id, "prop", null)(null, newPercentage / 100.0);
    },
    [arrayWidth, props]
  );

  function DivSelected(witdhValue, index) {
    return (
      <div
        className={classes.block}
        style={{ width: `${witdhValue}%`, backgroundColor: "#2196F380" }}
        onClick={(e) => props.handleChangePhase(e, index + 1)}
      ><h1>{index + 1}</h1>
      </div>
    );
  }

  function DivUnSelected(witdhValue, index) {
    return (
      <div
        className={classes.block}
        style={{ width: `${witdhValue}%` }}
        onClick={(e) => props.handleChangePhase(e, index + 1)}
      ><h1>{index + 1}</h1>
      </div>
    );
  }

  // Actualiza el array de anchuras en funcion del parametro sizes de entrada
  if(props.sizes.length)
  {
    let totalSize = props.sizes.reduce(
      (total, value) => (total = parseFloat(total) + parseFloat(value))
    );
    let arraySizes = [];
    for (let s of props.sizes)
      arraySizes.push((parseFloat(s) / parseFloat(totalSize)) * 100);

    let hasToUpdate = false;
    if(arraySizes.length === arrayWidth.length){
      arraySizes.map((pr, id) => {
        hasToUpdate = hasToUpdate || Math.abs( pr - arrayWidth[id]) > 0.01;
        return {};
      });
    }
    else
      hasToUpdate = true;

    if(hasToUpdate)
      setArrayWidth(arraySizes);
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
    <div style={{ boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}}>
      <div ref={sliderRef} className={classes.root}>
        {divPanel}
      </div>
    </div>
  );
}
