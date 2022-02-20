import { ClickAwayListener, Grow, MenuList, Dialog, DialogTitle, DialogActions, DialogContentText, DialogContent, Button } from "@material-ui/core";
import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

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
    paddingBottom: "10px",
    paddingRight: "15px",
    paddingTop: "10px",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",

    "&:hover": {
      cursor: "pointer",
      backgroundColor: "aliceblue",
      //backgroundImage: "linear-gradient( rgb(207, 232, 252),rgb(128, 199, 255))",
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
    <Popper open={Boolean(props.anchorEl)} anchorEl={props.anchorEl} role={undefined} transition disablePortal style={{ zIndex: "100" }}>
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

function SwitchWithAlertDialog(props) {
  // props.allStages
  // props.setAllStages
  // props.handleMenuItemClickStage
  // props.currentStage

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (agree) => () => {
    setOpen(false);
    if (agree) handleAllStages();
  };

  const handleAllStages = () => {
    let newAllStages = !props.allStages;
    props.setAllStages(newAllStages);
    props.handleMenuItemClickStage(newAllStages ? "all" : "1");
  };

  return (
    <React.Fragment>
      <Switch checked={props.allStages} onChange={() => handleClickOpen()} name="allStages" color="primary" />
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle
          id="alert-dialog-title"
          style={{
            //backgroundColor: "#cfe8fc",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
          }}
        >
          <Typography variant="h5" align="center">
            {" "}
            Warning{" "}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {/* <Typography variant="h5"> */}
              {props.allStages
                ? "If you disable all, different values can be configured for each stage. By default its values will be a copy of the stage all."
                : "If you enable all, the particular values of each stage will be lost. The stage all will copy the values of stage " + props.currentStage + "."}
            {/* </Typography> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose(true)} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const useStyles = makeStyles(styles);
export function SelectorStageCelltype(props) {
  const [anchorElCellType, setAnchorElCellType] = React.useState(null);
  const [anchorElStage, setAnchorElStage] = React.useState(null);
  const [allStages, setAllStages] = React.useState(props.stageSelected === "all");
  const classes = useStyles();

  useEffect(() => {
    setAllStages(props.stageSelected === "all");
  }, [props.stageSelected])

  const handleClickCellType = (event) => {
    setAnchorElCellType(event.currentTarget);
  };
  const handleClickStage = (event) => {
    if (!allStages) setAnchorElStage(event.currentTarget);
  };

  const handleMenuItemClickCellType = (value) => {
    props.celltypeHandler(value);
    setAnchorElCellType(null);
  };

  const handleMenuItemClickStage = (value) => {
    props.stageHandler(value);
    setAnchorElStage(null);
  };

  const handleCloseCellType = (e) => {
    setAnchorElCellType(null);
  };
  const handleCloseStage = (e) => {
    setAnchorElStage(null);
  };

  const getIndexCellTypeSelected = () => {
    return Object.keys(props.celltypeList).findIndex((element) => element === props.celltypeSelected);
  };

  const colorStyle = (index) => {
    return {
      backgroundColor: typeof props.cellTypeColorList !== "undefined" ? props.cellTypeColorList[index] : "red",
      width: "30px",
      height: "20px",
      marginLeft: "10px",
    };
  };

  return (
    <div
      style={{
        backgroundColor: "#cfe8fc",
        borderRadius: "10px",
        height: "80px",
        boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        display: "flex",
        justifyContent: "space-evenly",
      }}
    >
      <div className={classes.divSelector}>
        <Typography variant="h5" style={{ marginRight: "10px" }}>
          {" "}
          Stage:{" "}
        </Typography>
        <span onClick={handleClickStage} className={!allStages ? classes.spanOption : classes.spanOptionDisabled}>
          <Typography variant="h4" align="center" style={{ paddingLeft: "20px", paddingRight: "20px", width: "1em" }}>
            {props.stageSelected === "all" ? "" : props.stageSelected}
          </Typography>
        </span>
        <SelectMenu anchorEl={anchorElStage} handleClose={handleCloseStage}>
          <MenuList autoFocusItem={Boolean(anchorElStage)} id="menu-list-grow-stage">
            {Object.keys(props.stageList).map((item, i) => (
              <MenuItem key={item} onClick={() => handleMenuItemClickStage(item)}>
                <Typography variant="h4">{item}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </SelectMenu>
        <SwitchWithAlertDialog allStages={allStages} setAllStages={setAllStages} handleMenuItemClickStage={handleMenuItemClickStage} currentStage={props.stageSelected}/>
        <Typography variant="h5" style={{ marginRight: "10px" }} color={allStages ? "primary" : "black"}>
          {" "}
          all{" "}
        </Typography>
      </div>
      { typeof props.celltypeList !== "undefined" && 
      <div className={classes.divSelector}>
        <Typography variant="h5" style={{ marginRight: "10px" }}>
          {" "}
          Cell type:{" "}
        </Typography>

        <span onClick={handleClickCellType} className={classes.spanOption}>
          <Typography variant="h4" style={{ paddingLeft: "20px" }}>
            {props.celltypeSelected}
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
      }
    </div>
  );
}
