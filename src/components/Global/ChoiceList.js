import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Popper from "@material-ui/core/Popper";
import { ClickAwayListener, Grow, MenuList, Paper, MenuItem } from "@material-ui/core";
import React from "react";

const styles = (theme) => ({
  text: {
    backgroundColor: "#cfe8fc",
    height: "100%",
    boxShadow: "3px 0px 0px -2px rgba(0,0,0,0.2), 2px 0px 0px 0px rgba(0,0,0,0.14), 1px 0px 0px 0px rgba(0,0,0,0.12)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },
  slider: {
    width: 250,
  },
  input: {
    width: 75,
  },
  divSelector: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
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

const useStyles = makeStyles(styles);

export function ChoiceList(props) {
  // props.label="Celltype"
  // name="backgroundcells"
  // value={state.global.types}
  // selected={state.global.itissue.backgroundcells}
  // path={["itissue"]}
  // isColor
  // handler={this.props.handlerValue}
  // colorList={this.props.colorList}
  const classes = useStyles();

  const [anchorElCellType, setAnchorElCellType] = React.useState(null);

  const handleClickCellType = (event) => {
    setAnchorElCellType(event.currentTarget);
  };

  //var idSelected = typeof props.isColor !== "undefined" ? Object.keys(props.value).findIndex((value) => value === props.selected) : -1;
  const colorStyle = (index) => {
    return {
      backgroundColor: typeof props.colorList !== "undefined" ? props.colorList[index] : "red",
      width: "30px",
      height: "20px",
      marginLeft: "10px",
    };
  };
  
  // function handlerValue(event) {
  //   event.preventDefault();
  //   props.handler(props.path, props.name, event.target.value);
  // }

  
  const handleMenuItemClickCellType = (newValue) => {
    props.handler(props.path, props.name, newValue);
    setAnchorElCellType(null);
  };

  const getIndexCellTypeSelected = () => {
    return Object.keys(props.value).findIndex((element) => element === props.selected);
  };

  const handleCloseCellType = (e) => {
    setAnchorElCellType(null);
  };

  return (
    <div style={{ borderTop: "1px solid LightGray" }}>
      <div className={classes.divSelector}>
        <Typography variant="h5" style={{ marginRight: "10px" }}>
          {" "}
          {props.label ? props.label : "Cell type:"}{" "}
        </Typography>

        <span onClick={handleClickCellType} className={classes.spanOption}>
          <Typography variant="h4" style={{ paddingLeft: "20px" }}>
            {props.selected}
          </Typography>
          {props.isColor && <Container fixed style={{ paddingTop: "5px", paddingRight: "10px" }}>
          <Typography component="div" style={colorStyle(getIndexCellTypeSelected())} />
          </Container> }
        </span>

        <SelectMenu anchorEl={anchorElCellType} handleClose={handleCloseCellType}>
          <MenuList autoFocusItem={Boolean(anchorElCellType)} id="menu-list-grow">
            {Object.keys(props.value).map((item, i) => (
              <MenuItem key={item} onClick={() => handleMenuItemClickCellType(item)} style={{ justifyContent: "space-between" }}>
                <Typography variant="h4">{item}</Typography>
                {props.isColor && <Typography component="div" style={colorStyle(i)} />}
              </MenuItem>
            ))}
          </MenuList>
        </SelectMenu>
      </div>

      {/* <Grid container spacing={0}>
        <Grid item xs={3}>
          <Typography
            noWrap
            className={classes.text}
          >
            {" "}
            {props.label}{" "}
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <FormControl>
          
            <Select
              native
              value={props.selected}
              onChange={handlerValue}
              inputProps={{
                name: "celltype",
                id: "celltype-native-simple",
              }}
              style={{ width: 250 }}
            >
              {Object.keys(props.value).map((item, i) => {
                return (
                  <option key={i} value={item}>
                    {item}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Container fixed style={{ paddingTop: "5px", paddingRight: "10px" }}>
            <Typography component="div" style={colorStyle} />
          </Container>
        </Grid>
      </Grid> */}
    </div>
  );
}
