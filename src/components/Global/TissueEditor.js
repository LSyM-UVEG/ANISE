import React, { useState, useLayoutEffect, useEffect } from "react";
import TissueGrid from "./TissueGrid";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from "@material-ui/core/Button";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import ZoomOutMap from "@material-ui/icons/ZoomOutMap";
import BrushIcon from "@material-ui/icons/Brush";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import PanToolIcon from "@material-ui/icons/PanTool";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import "../../assets/css/tissueGrid.css";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import { ClickAwayListener, Grow, MenuList } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";

const styles = (theme) => ({
  divSelector: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  spanOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    "&:hover": {
      cursor: "pointer",
      //backgroundColor: "rgb(128, 199, 255)",
      backgroundImage: "linear-gradient( rgb(207, 232, 252),rgb(128, 199, 255))",
    },
  },
  spanOptionDisabled: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    color: "gray",
  },
});

function SelectMenu(props) {
  //props: anchorEl, handleClose
  return (
    <Popper open={Boolean(props.anchorEl)} anchorEl={props.anchorEl} role={undefined} transition disablePortal style={{ zIndex: "1" }}>
      {({ TransitionProps, placement }) => (
        <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}>
          <ClickAwayListener onClickAway={props.handleClose}>
            <Paper elevation="1">{props.children}</Paper>
          </ClickAwayListener>
        </Grow>
      )}
    </Popper>
  );
}

const useStyles = makeStyles(styles);
function TissueEditor(props) {
  const [zoom, setZoom] = useState(0);
  const [tool, setTool] = useState(0);
  const [provisionalMove, setProvisionalMove] = useState(false);
  const [colorBrush, setColorBrush] = useState(0);

  // States for the moving tool
  const [mousePosition, setMousePosition] = useState(null);
  const [viewportInitialOffset, setViewportInitialOffset] = useState(null);
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 800, height: 800 });

  const [celltypeSelected, setCellTypeSelected] = React.useState(Object.keys(props.celltypeList)[0]);
  const [anchorElCellType, setAnchorElCellType] = React.useState(null);
  const classes = useStyles();



  if (!Object.keys(props.celltypeList).find(value => value === celltypeSelected)) {
    setCellTypeSelected(Object.keys(props.celltypeList)[0]);
  }

  const handleClickCellType = (event) => {
    setAnchorElCellType(event.currentTarget);
  };

  const handleMenuItemClickCellType = (value) => {
    setCellTypeSelected(value);
    setColorBrush(Object.keys(props.celltypeList).indexOf(value));
    setAnchorElCellType(null);
  };

  const handleCloseCellType = (e) => {
    setAnchorElCellType(null);
  };

  const getIndexCellTypeSelected = () => {
    return Object.keys(props.celltypeList).findIndex((element) => element === celltypeSelected);
  };

  const colorStyle = (index) => {
    return {
      backgroundColor: typeof props.cellTypeColorList !== "undefined" ? props.cellTypeColorList[index] : "red",
      width: "30px",
      height: "20px",
      marginLeft: "10px",
    };
  };

  const onKeyDown = (event) => {
    // if (event.key === "Delete") {
    //   props.handleChangeSquareVector("remove", props.selectedSquare)(event);
    // }
  };

  const zoomAll = () => {
    let newZoom = 75;
    let mapWidth = props.data.ncellsx * 15 + 40;
    let mapHeight = props.data.ncellsy * 18 + 70;
    let viewport = document.getElementById("viewport");
    let size = viewport.getBoundingClientRect();
    
    let zoomWidth = size.width / mapWidth;
    let zoomHeight = size.height / mapHeight;
    newZoom = zoomWidth > zoomHeight ? zoomHeight * 50.0 : zoomWidth * 50.0;
    newZoom = Math.min(Math.max(newZoom, 1), 100);
    changeZoom(newZoom, 0.5, 0.5);

    let offsetx = -(size.width * 50 / newZoom - mapWidth) * 0.5;
    let offsety = -(size.height * 50 / newZoom - mapHeight) * 0.5;
    setViewportOffset({ x: offsetx, y: offsety });
  }

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line 
  }, [props.selectedSquare]);

  const onKeyDownTool = (event) => {
    if (event.key === "m") {
      setProvisionalMove(true);
    }
  };

  const onKeyUpTool = (event) => {
    if (event.key === "m") {
      setProvisionalMove(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDownTool);
    window.addEventListener("keyup", onKeyUpTool);

    return () => {
      window.removeEventListener("keydown", onKeyDownTool);
      window.removeEventListener("keyup", onKeyUpTool);
    };
  }, []);

  useLayoutEffect(() => {
    if (zoom === 0) // Doing zoom all in the first render
      zoomAll();
    else {
      let viewport = document.getElementById("viewport");
      let size = viewport.getBoundingClientRect();
      let ratio = 50.0 / zoom;
      let viewportSize = { x: size.width * ratio, y: size.height * ratio };

      let viewBoxSize = viewportOffset.x.toString() + " " + viewportOffset.y.toString();
      viewBoxSize += " " + viewportSize.x.toString() + " " + viewportSize.y.toString();

      viewport.setAttribute("viewBox", viewBoxSize);
    }
  });

  const changeZoom = (newValue, propX, propY) => {
    setZoom(newValue);

    let viewport = document.getElementById("viewport");
    let size = viewport.getBoundingClientRect();

    let ratio = 50.0 / zoom;
    let viewportSize = { width: size.width * ratio, height: size.height * ratio };

    let newRatio = 50.0 / newValue;
    let viewportNewSize = { width: size.width * newRatio, height: size.height * newRatio };

    let offset = viewportOffset;
    offset.x += (viewportSize.width - viewportNewSize.width) * propX;
    offset.y += (viewportSize.height - viewportNewSize.height) * propY;

    setViewportSize(viewportNewSize);
    setViewportOffset(offset);
  };

  const handleZoomChange = (event, newValue) => {
    changeZoom(newValue, 0.5, 0.5);
  };

  const handleZoomWheel = (event) => {
    event.preventDefault();
    let newZoom = zoom;
    if (event.deltaY < 0) newZoom += 2;
    else if (event.deltaY >= 0) newZoom -= 2;

    if (newZoom < 1) newZoom = 1;
    else if (newZoom > 100) newZoom = 100;

    let viewport = document.getElementById("viewport");
    let size = viewport.getBoundingClientRect();

    let propX = (event.clientX - size.x) / size.width;
    let propY = (event.clientY - size.y) / size.height;

    changeZoom(newZoom, propX, propY);
  };

  const handleTool = (event, newValue) => {
    setTool(newValue);
  };

  const onDragStarting = (event) => {
    if (tool === 0 || provisionalMove) {
      setMousePosition({ x: event.clientX, y: event.clientY });
      let offsetInitial = { x: viewportOffset.x, y: viewportOffset.y };
      setViewportInitialOffset(offsetInitial);
    }
  };

  const onDrag = (event) => {
    if ((tool === 0 || provisionalMove) && mousePosition) {
      let offset = { x: viewportInitialOffset.x, y: viewportInitialOffset.y };
      let ratio = 50.0 / zoom;
      offset.x += (mousePosition.x - event.clientX) * ratio;
      offset.y += (mousePosition.y - event.clientY) * ratio;
      setViewportOffset(offset);
    }
  };

  const onDragEnding = (event) => {
    if ((tool === 0 || provisionalMove) && mousePosition) {
      setMousePosition(null);
      setViewportInitialOffset(null);
    }
  };

  // VIEWPORT CONFIGURATION
  let viewBoxSize = viewportOffset.x.toString() + " " + viewportOffset.y.toString();
  viewBoxSize += " " + viewportSize.width.toString() + " " + viewportSize.height.toString();

  let divCursor = "hex-grid";
  if (provisionalMove) divCursor += " moving";
  else {
    switch (tool) {
      case 0:
        divCursor += " moving";
        break;
      case 1:
        divCursor += " create";
        break;
      case 2:
        divCursor += " select";
        break;
      case 4:
        divCursor += " moving";
        break;
      default:
        divCursor += "";
        break;
    }
  }

  return (
    <div
      style={{
        borderRadius: "14px",
        marginLeft: "20px",
        marginRight: "20px",
        marginTop: "10px",
        marginBottom: "10px",
        backgroundColor: "#cfe8fc",
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={6} style={{ marginLeft: "20px", backgroundColor: "#cfe8fc" }}>
          <div
            style={{
              backgroundColor: "#cfe8fc",
              borderRadius: "10px",
              height: "40px",
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div className={classes.divSelector}>
              <Typography variant="h5" style={{ marginRight: "10px" }}>
                {" "}
                Brush cell type:{" "}
              </Typography>

              <span onClick={handleClickCellType} className={classes.spanOption} style={{ paddingRight: "20px" }}>
                <Typography variant="h4" style={{ paddingLeft: "20px" }}>
                  {celltypeSelected}
                </Typography>
                <Container fixed style={{ paddingTop: "5px", paddingRight: "10px" }}>
                  <Typography component="div" style={colorStyle(getIndexCellTypeSelected())} />
                </Container>
              </span>

              <SelectMenu anchorEl={anchorElCellType} handleClose={handleCloseCellType}>
                <MenuList autoFocusItem={Boolean(anchorElCellType)} id="menu-list-grow">
                  {Object.keys(props.celltypeList).map((item, i) => (
                    <MenuItem key={item} onClick={() => handleMenuItemClickCellType(item)} style={{ justifyContent: "space-between" }}>
                      <Typography variant="h4">{item}</Typography>
                      <Typography component="div" style={colorStyle(i)} />
                    </MenuItem>
                  ))}
                </MenuList>
              </SelectMenu>
            </div>
          </div>
        </Grid>
        <Grid container item xs={3} style={{ marginTop: "5px" }}>
          <Grid item xs={3}>
            <Button onClick={(ev) => handleZoomChange(ev, Math.max(zoom - 5, 1))}>
              <ZoomOutIcon />
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Slider value={zoom} min={1} max={100} onChange={handleZoomChange} aria-labelledby="continuous-slider" />
          </Grid>
          <Grid item xs={3}>
            <Button onClick={(ev) => handleZoomChange(ev, Math.min(zoom + 5, 100))}>
              <ZoomInIcon />
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => zoomAll()}>
            <Tooltip title={<Typography>Zoom all</Typography>}>
              <ZoomOutMap />
              </Tooltip>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <ToggleButtonGroup value={tool} exclusive onChange={handleTool} aria-label="text alignment">
            <ToggleButton value={0} aria-label="centered">
              <Tooltip title={<Typography>Move the tissue graph</Typography>}>
                <PanToolIcon />
              </Tooltip>
            </ToggleButton>

            <ToggleButton value={1} aria-label="left aligned">
              <Tooltip title={<Typography>Draw a square region using the selected cell type</Typography>}>
                <BrushIcon />
              </Tooltip>
            </ToggleButton>

            {/* <ToggleButton value={2} aria-label="centered">
                            <Tooltip title={<Typography>Select a square (to change its properties)</Typography>}>
                                <SelectAllIcon />
                                </Tooltip>
                            </ToggleButton> */}

            <ToggleButton value={3} aria-label="right aligned">
              <Tooltip title={<Typography>Remove a region</Typography>}>
                <LayersClearIcon />
              </Tooltip>
            </ToggleButton>

            <ToggleButton value={4} aria-label="right aligned">
              <Tooltip title={<Typography>Move a region</Typography>}>
                <OpenWithIcon />
              </Tooltip>
            </ToggleButton>

            <ToggleButton value={5} aria-label="right aligned">
              <Tooltip title={<Typography>Scale a region</Typography>}>
                <SelectAllIcon />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <div
            className={divCursor}
            style={{ backgroundColor: "white" }}
            onMouseDown={onDragStarting}
            onMouseMove={onDrag}
            onMouseUp={onDragEnding}
            onContextMenu={(e) => e.preventDefault()}
            onWheel={handleZoomWheel}
          >
            <svg id="viewport" width="100%" height="calc(100vh - 161px)" viewBox={viewBoxSize}>
              <TissueGrid
                tool={tool}
                data={props.data}
                types={props.types}
                handlerValue={props.handlerValue}
                colorBrush={colorBrush}
                selectedSquare={props.selectedSquare}
                selectedSquareHandler={props.selectedSquareHandler}
                handleChangeSquareVector={props.handleChangeSquareVector}
                handleMoveSquareVector={props.handleMoveSquareVector}
                handleScaleSquareVector={props.handleScaleSquareVector}
                colorList={props.colorList}
              />
            </svg>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default TissueEditor;
