import React, { useEffect } from "react";
import { Switch, Typography, Button } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { Dialog, InputBase, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Tooltip } from "@material-ui/core";

const styles = (theme) => ({
  fieldInput: {
    textAlign: "center",
    fontSize: theme.typography.h4.fontSize,
    WebkitAppearance: "textfield",
    appearance: "textfield",
    cursor: "pointer",
    borderRadius: "4px",
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px"
  },
});

const useStyles = makeStyles(styles);

export default function Optional(props) {
  const classes = useStyles();
  const [text, setText] = React.useState("file.dat");
  const [open, setOpen] = React.useState(false);
  const [textToSave, setTextToSave] = React.useState("file.dat");
  const textSize = typeof props.buttonData === "undefined" ? "320px" : "226px";

  // Initial function
  useEffect(() => {
    setText(props.buttonData);
  }, []);

  // if text to save change && switch on--> save data using handle
  useEffect(() => {
    if (typeof props.value !== "undefined")
      props.handler(props.path, textToSave)(null, props.value);
  }, [textToSave])

  const handleValidation = (value) => {
    let formIsValid = true;
    if (!value) formIsValid = false;
    if (typeof value !== "undefined") {
      if (!value.match(/^[a-zA-Z0-9_/\\:.]{1,100}$/))  formIsValid = false;
      else if (value[0].match(/^[0-9]+$/))  formIsValid = false;
    }
    return formIsValid;
  };

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (handleValidation(newValue) || !newValue) setText(newValue);
  };

  const handleClose = (agree) => () => {
    setOpen(false);
    if (agree) setTextToSave(text);
  };

  // const onFileChange = (event) => {
  //   var lthis = this;
  //   if (event.target.files && event.target.files.length > 0)
  //     setText(event.target.value);
  // };

  const onChangeSwitch = (n, newValue) => {
    // if a singular siwtch --> send change
    if (typeof props.buttonData === "undefined") {
      props.handler(props.path, props.name)(null, newValue);
    }
    else {
      if (textToSave === "")
        setOpen(true);  
      props.handler(props.path, textToSave)(null, newValue);
    }
  }

  return (
    <React.Fragment>
      <div style={{ borderTop: "1px solid LightGray" }}>
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
          <Typography variant="h5" style={{ width: textSize, textAlign: "left" }}> {props.label} </Typography>
          {typeof props.buttonData !== "undefined" &&
            <Tooltip title={text} >
            <Button color="primary" component="label" onClick={() => {setText(textToSave); setOpen(true);}}>
              <EditIcon/>
              {/* <input type="file" hidden onChange={(ev) => onFileChange(ev)}/> */}
            </Button>
            </Tooltip>
          }
          <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "0px", marginLeft: "10px", width: "120px" }}>
            <Switch
              checked={typeof props.value !== "undefined"}
              //onChange={props.handler(props.path, typeof props.buttonData !== "undefined" ? text : props.name)}
              onChange={onChangeSwitch}
              name={props.name}
              color="primary"
            />
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" style={{ marginRight: "10px" }}>Path:</Typography>
            <InputBase
              color="primary"
              name={props.label}
              type={"text"}
              value={text}
              inputProps={{ className: classes.fieldInput }}
              onChange={handleChange}
            />
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