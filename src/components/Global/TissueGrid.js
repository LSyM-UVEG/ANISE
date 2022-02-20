import React, { useState } from "react";
import "../../assets/css/tissueGrid.css";


function Hexagon({i, j, onMouseDown, onMouseEnter, onMouseUp, onMouseDrag, color, outlined, selected})
{
  let x = 30 + 15 * j;
  let y = 50 + i * 18 - (j % 2) * 9;
  let transf = "translate(" + x.toString() + ", " + y.toString() + ")";

  return  <g transform={transf}>
            <polygon
              className="hexagon"
              stroke={outlined ? "#FFFFFF" : "#000000"}
              strokeWidth="1.0"
              i={i} j={j}
              fill={color}
              fillOpacity={(selected || outlined) ? 0.6 : 1.0}
              onMouseDown={(event) => onMouseDown(event, {i: i, j: j})}
              onMouseEnter={(event) => onMouseEnter(event, {i: i, j: j})}
              onMouseUp={(event) => onMouseUp(event, {i: i, j: j})}
              onMouseMove={(event) => onMouseDrag(event, {i: i, j: j})}
              points="5,-9 -5,-9 -10,0 -5,9 5,9 10,0"
            />

          </g>
}
const MemoizedHexagon = React.memo(Hexagon);


function TissueGrid(props) {
  const [selectedHex, setSelectedHex] = useState(null);
  const [initCoords, setInitCoords] = useState(null);
  const [operatingSquare, setOperatinSquare] = useState(0);
  //const [colorBrush, setColorBrush] = useState(1);
  //const [hexagons, setHexagons] = useState(getHexagons());
  const [selectedHexagons, setSelectedHexagons] = useState(Array(props.data.ncellsx * props.data.ncellsy).fill(false));
  
  /*
  useEffect(() => {
    setHexagons(getHexagons);
  }, [props.data.ncellsx, props.data.ncellsy])*/

  function getHexagons () {
    let mapWidth = props.data.ncellsx;
    let mapHeight = props.data.ncellsy;
    let new_hexagons = [];

    for (let j = 0; j < mapWidth; j++) {
      for (let i = 0; i < mapHeight; i++) {
        let hex = {};
        hex.hextype = 0;
        hex.selected = false;
        hex.i = i;
        hex.j = j;
        new_hexagons.push(hex);
      }
    }

    updateColors(new_hexagons);

    return new_hexagons;
  }

  function getSquareFromHexagon(sourceHexagon) {
    if (typeof props.data.square === "undefined")
      return "undefined";
    
    let square = "undefined";

    if (!Array.isArray(props.data.square)) {
      props.data.square = [props.data.square]
    }

    for (var k = 0; k < props.data.square.length; k++) {
      let layer = props.data.square[k].$;

      let limitx = parseInt(layer.ix) + parseInt(layer.sizex);
      let limity = parseInt(layer.iy) + parseInt(layer.sizey);

      let mapHeight = props.data.ncellsy;
      let click_i = mapHeight - sourceHexagon.i - 1;
      let click_j = sourceHexagon.j;

      if (click_i >= layer.iy && click_i < limity
        && click_j >= layer.ix && click_j < limitx) {
          square = k;
      }
    }
    
    return square;
  }


  function updateColors(hexagons) {
    let mapWidth = props.data.ncellsx;
    let mapHeight = props.data.ncellsy;
    
    var colorMat = getColorMatrix(mapWidth, mapHeight);
    
    let count = 0;
    for (let j = 0; j < mapWidth; j++) {
      for (let i = 0; i < mapHeight; i++) {
        hexagons[count].hextype = colorMat[i][j];
        count++;
      }
    }
  }


  function outlineHexagons(hexagons) {
    let mapWidth = props.data.ncellsx;
    let mapHeight = props.data.ncellsy;
    
    var outlineMat = getOutlineMatrix(mapWidth, mapHeight);
    
    let count = 0;
    for (let j = 0; j < mapWidth; j++) {
      for (let i = 0; i < mapHeight; i++) {
        hexagons[count].outlined = outlineMat[i][j];
        count++;
      }
    }
  }

  function getOutlineMatrix(mapWidth, mapHeight) {
    // Crear la matriz de outlines por defecto a falso
    var outlineMat = Array(parseInt(mapHeight)).fill().map(()=>Array(parseInt(mapWidth)).fill(false));

    if (typeof props.data.square === "undefined")
      return outlineMat;

    if (!Array.isArray(props.data.square)) {
      props.data.square = [props.data.square]
    }

     // Rellenar la matriz de outline para cada square
     for (var k = 0; k < props.data.square.length; k++) {
      let layer = props.data.square[k].$;

      var limitx = Math.min(parseInt(layer.ix) + parseInt(layer.sizex), mapWidth);
      var limity = Math.min(parseInt(layer.iy) + parseInt(layer.sizey), mapHeight);

      let valueToFill = k === parseInt(props.selectedSquare) ? true : false;
      
      for (var x = layer.ix; x < limitx; x++) {
        for (var y = layer.iy; y < limity; y++) {
          outlineMat[mapHeight - 1 - y][x] = valueToFill;
        }
      }
    }

    return outlineMat;
  }

  /*
  function drawSelection(hexagons, startHex, endHex) {
    // Sombreado
    let targetHex = endHex;
    let start_i, start_j, targetHex_i, targetHex_j, hex_i, hex_j;

    if (startHex) {
      start_i = startHex.i;
      start_j = startHex.j;
      targetHex_i = targetHex.i;
      targetHex_j = targetHex.j;

      for (let i = 0; i < hexagons.length; i++)
      {
        hex_i = hexagons[i].i;
        hex_j = hexagons[i].j;
        
        let row_condition =
          (hex_i >= start_i && hex_i <= targetHex_i) ||
          (hex_i <= start_i && hex_i >= targetHex_i);
        let col_condition =
          (hex_j >= start_j && hex_j <= targetHex_j) ||
          (hex_j <= start_j && hex_j >= targetHex_j);
        
        hexagons[i].selected = row_condition && col_condition;
      }
    }
    else {
      for (let i = 0; i < hexagons.length; i++)
      {
        hexagons[i].selected = false;
      }
    }
  }
  */
 function drawSelection(startHex, endHex) {
    let mapWidth = props.data.ncellsx;
    let mapHeight = props.data.ncellsy;
    // Sombreado
    let targetHex = endHex;
    let start_i, start_j, targetHex_i, targetHex_j;

    let selectedHexagons = [];

    if (startHex) {
      start_i = startHex.i;
      start_j = startHex.j;
      targetHex_i = targetHex.i;
      targetHex_j = targetHex.j;

      for (let hex_j = 0; hex_j < mapWidth; hex_j++) {
        for (let hex_i = 0; hex_i < mapHeight; hex_i++) {
          let row_condition =
            (hex_i >= start_i && hex_i <= targetHex_i) ||
            (hex_i <= start_i && hex_i >= targetHex_i);
          let col_condition =
            (hex_j >= start_j && hex_j <= targetHex_j) ||
            (hex_j <= start_j && hex_j >= targetHex_j);
        
          selectedHexagons.push(row_condition && col_condition);
        }
      }
    }
    else {
      for (let hex_j = 0; hex_j < mapWidth; hex_j++) {
        for (let hex_i = 0; hex_i < mapHeight; hex_i++) {
          selectedHexagons.push(false);
        }
      }
    }

    return selectedHexagons;
  }


  function getColorMatrix(mapWidth, mapHeight) {
    // Crear la matriz de colores con el color de fondo
    var backgroundColor = Object.keys(props.types).indexOf(props.data.backgroundcells);
    var colorMat = Array(parseInt(mapHeight)).fill().map(()=>Array(parseInt(mapWidth)).fill(backgroundColor));

    if (typeof props.data.square === "undefined")
      return colorMat;

    if (!Array.isArray(props.data.square)) {
      props.data.square = [props.data.square]
    }

    // Rellenar la matriz de colores para cada square
    for (var k = 0; k < props.data.square.length; k++) {
      let layer = props.data.square[k].$;

      var limitx = Math.min(parseInt(layer.ix) + parseInt(layer.sizex), mapWidth);
      var limity = Math.min(parseInt(layer.iy) + parseInt(layer.sizey), mapHeight);
      
      for (var x = layer.ix; x < limitx; x++) {
        for (var y = layer.iy; y < limity; y++) {
            if (Object.keys(props.types).indexOf(layer.t) >= 0) {
              colorMat[mapHeight - 1 - y][x] = Object.keys(props.types).indexOf(layer.t);
            } else {
              colorMat[mapHeight - 1 - y][x] = 0;
            }
        }
      }
    }
    return colorMat;
  }


  function onMouseDown(event, sourceHexagon) {
    let square;
    switch (props.tool) {
      case 1:
        if (selectedHex === null) {
          setSelectedHex(sourceHexagon)
          setSelectedHexagons(drawSelection(sourceHexagon, sourceHexagon));
        }
        break;
      case 2:
        square = getSquareFromHexagon(sourceHexagon);
        if (square !== "undefined") {
          props.selectedSquareHandler(square);
        }
        break;
      case 3:
        square = getSquareFromHexagon(sourceHexagon);
        if (square !== "undefined") {
          props.handleChangeSquareVector("remove", square)(event);
        }
        break;
      case 4:
      case 5:
        square = getSquareFromHexagon(sourceHexagon);
        if (square !== "undefined") {
          props.selectedSquareHandler(square);
          setSelectedHex(sourceHexagon)
        }
        setInitCoords(sourceHexagon);
        setOperatinSquare(square);
        break;
      default:
        break;
      //setHexagons([...hexagons]);
    }
  }//, [selectedHex, props.tool, props.selectedSquareHandler, props.handleChangeSquareVector, drawSelection, getSquareFromHexagon]);

  function onMouseUp(event, sourceHexagon) {
    if (props.tool === 4 || props.tool === 5) {
      if (selectedHex) {
        setSelectedHex(null);
        setSelectedHexagons(Array(props.data.ncellsx * props.data.ncellsy).fill(false));
        setInitCoords(null);
      }
    }
    if (props.tool === 1) {
      if (selectedHex) {
        var start_i = props.data.ncellsy - selectedHex.i - 1;
        var start_j = selectedHex.j;
        var end_i = props.data.ncellsy - sourceHexagon.i - 1;
        var end_j = sourceHexagon.j;

        var corner_i = Math.min(start_i, end_i);
        var corner_j = Math.min(start_j, end_j);

        var sizei = Math.abs(start_i - end_i) + 1;
        var sizej = Math.abs(start_j - end_j) + 1;

        setSelectedHex(null)
        let layer = {$: {ix: corner_j, iy: corner_i, sizex: sizej, sizey: sizei, t: Object.keys(props.types)[props.colorBrush]}};
        //props.handlerValue(["itissue"], "square", [...props.data.square, layer])(event);
        props.handleChangeSquareVector("add", layer)(event);

        setSelectedHexagons(Array(props.data.ncellsx * props.data.ncellsy).fill(false));
      }
      //setHexagons([...hexagons]);
    }
  };//, [/*hexagons, */selectedHex, selectedHexagons, props.colorBrush, props.types, props.data.square, props.data.ncellsy, props.tool]);

  function onMouseDrag(event, sourceHexagon) {
    if (props.tool === 4) {
      if (selectedHex && initCoords) {
        let diffI = sourceHexagon.i - initCoords.i;
        let diffJ = sourceHexagon.j - initCoords.j;
        props.handleMoveSquareVector(operatingSquare, diffI, diffJ);
        setInitCoords(sourceHexagon);
        setSelectedHexagons(Array(props.data.ncellsx * props.data.ncellsy).fill(false));
      }
    }
    if (props.tool === 5) {
      if (selectedHex && initCoords) {
        let diffI = sourceHexagon.i - initCoords.i;
        let diffJ = sourceHexagon.j - initCoords.j;
        props.handleScaleSquareVector(operatingSquare, diffI, diffJ);
        setInitCoords(sourceHexagon);
        setSelectedHexagons(Array(props.data.ncellsx * props.data.ncellsy).fill(false));
      }
    }
  };

  function onMouseEnter(event, sourceHexagon) {
    if (selectedHex) {
      setSelectedHexagons(drawSelection(selectedHex, sourceHexagon));
      //setHexagons([...hexagons]);
    }
  };//, [/*hexagons, */selectedHex]);

  /*
  */

  let newHexagons = getHexagons();
  outlineHexagons(newHexagons);

  return (
    <g>
    {newHexagons.map((hex, i) => (
      !hex.outlined && <MemoizedHexagon
          i={hex.i}
          j={hex.j}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseUp={onMouseUp}
          onMouseDrag={onMouseDrag}
          color={props.colorList[hex.hextype]}
          outlined={hex.outlined}
          selected={selectedHexagons[i]}
        />
    ))}
    {newHexagons.map((hex, i) => (
      hex.outlined && <MemoizedHexagon
          i={hex.i}
          j={hex.j}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseUp={onMouseUp}
          onMouseDrag={onMouseDrag}
          color={props.colorList[hex.hextype]}
          outlined={hex.outlined}
          selected={selectedHexagons[i]}
        />
    ))}
    </g>
  );
}

export default TissueGrid;
