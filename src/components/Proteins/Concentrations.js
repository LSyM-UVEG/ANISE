import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import { ClickAwayListener, Grow, MenuList } from "@material-ui/core";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import { InputNumber } from "../Potentials/InputNumber"


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
    color: "gray"
  },
  fieldInput: {
    textAlign: "center",
    fontSize: theme.typography.h4.fontSize,
    WebkitAppearance: "textfield",
    appearance: "textfield",
    mozAppearance: "textfield",
    "&:hover": {
      WebkitAppearance: "textfield",
      appearance: "textfield",
      mozAppearance: "textfield",
    },
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

export default function Concentrations(props) {

  const [celltypeSelected, setCellTypeSelected] = React.useState(Object.keys(props.celltypeList)[0]);
  const [anchorElCellType, setAnchorElCellType] = React.useState(null);
  const classes = useStyles();

  const handleClickCellType = (event) => {
    setAnchorElCellType(event.currentTarget);
  };

  const handleMenuItemClickCellType = (value) => {
    setCellTypeSelected(value);
    setAnchorElCellType(null);
  };

  const handleCloseCellType = (e) => {
    setAnchorElCellType(null);
  };

  const getIndexCellTypeSelected = () => {
    return Object.keys(props.celltypeList).findIndex((element) => element === celltypeSelected);
  };


  //////////// ICONCENTRATION PARAMETERS /////////////////////

  const getIconcentrationParameter = (parameterName) => {
    let idx = props.iconcentration.findIndex(e => e.$.t === celltypeSelected);
    if (idx >= 0) {
      if (parameterName === "value") {
        return props.iconcentration[idx]._;
      } else if (parameterName === "dispersion") {
        return props.iconcentration[idx].$.dispersion;
      } else if (parameterName === "stochastic") {
        return props.iconcentration[idx].$.stochastic;
      }
    }
    return null;
  }

  const setIconcentrationParameter = (parameterName) => (newValue) => {
    let idx = props.iconcentration.findIndex(e => e.$.t === celltypeSelected);
    if (idx >= 0) {
      let newIconcentration = [...props.iconcentration];
      if (parameterName === "value") {
        newIconcentration[idx]._ = newValue;
      } else if (parameterName === "dispersion") {
        newIconcentration[idx].$.dispersion = newValue;
      } else if (parameterName === "stochastic") {
        newIconcentration[idx].$.stochastic = newValue;
      }
      props.handleIconcentration(newIconcentration);
    }
  }

  const colorStyle = (index) => {
    return {
      backgroundColor: typeof props.cellTypeColorList !== "undefined" ? props.cellTypeColorList[index] : "red",
      width: "30px",
      height: "20px",
      marginLeft: "10px",
    };
  };

  return (
    <div style={{ display: "flex", alignItems: "stretch", flexDirection: "column" }}>
      <div style={{ display: "flex", borderStyle: "solid", borderRadius: "4px", padding: "10px", margin: "4px 0px", textAlign: "center", alignItems: "center", justifyContent: "center"}}>
        <Switch checked={props.negval === 'y'} onChange={props.handleNegval} />
        <Typography color="textSecondary" variant="h6">
          {" "}Allow negative values{" "}
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "column", margin: "4px 0px", borderStyle: "solid", borderRadius: "4px"}}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", backgroundColor: "rgb(207, 232, 252)" }}>
          <Typography variant="h5">Initial values</Typography>
          <Divider orientation="vertical" flexItem />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" style={{ marginRight: "10px" }}> Cell type: </Typography>
            
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "5px",
          }}
        >
          <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "10px", textAlign: "center", width: "120px", flexShrink: "0" }}>
            <Typography color="textSecondary" variant="h6" gutterBottom>
              {" "}
              Value{" "}
            </Typography>
            <InputNumber name="value" minValue={0.0} value={getIconcentrationParameter("value")} round={0} handleValue={setIconcentrationParameter} />
          </div>
          <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "10px", marginLeft: "10px", textAlign: "center", width: "120px", flexShrink: "0" }}>
            <Typography color="textSecondary" variant="h6" gutterBottom>
              {" "}
              Dispersion{" "}
            </Typography>
            <InputNumber disabled={getIconcentrationParameter("stochastic") !== "y"} name="dispersion" minValue={0.0} value={getIconcentrationParameter("dispersion")} round={4} handleValue={setIconcentrationParameter} />
          </div>
          <div style={{ padding: "10px", marginLeft: "10px", textAlign: "center" }}>
          <Typography color="textSecondary" variant="h6" gutterBottom>
              {" "}
              Stochastic{" "}
            </Typography>
            <Switch
              checked={getIconcentrationParameter("stochastic") === "y"}
              onChange={(event) => setIconcentrationParameter("stochastic")(event.target.checked ? 'y' : 'n')}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}
