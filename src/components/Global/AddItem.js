import Button from "@material-ui/core/Button";
import { AddCircle } from "@material-ui/icons";
import React from "react";
import { Dialog, InputBase, DialogContent, DialogContentText, DialogActions, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
export function AddItem(props) {
  const [text, setText] = React.useState("");
  //const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  //TODO: Mover a App.js para que sea comun
  const handleValidation = (value) => {
    let formIsValid = true;

    if (!value) {
      formIsValid = false;
      //setError("Cannot be empty");
    }

    if (typeof value !== "undefined") {
      if (!value.match(/^[a-zA-Z0-9_]{1,10}$/)) {
        formIsValid = false;
        //setError("Only alphanumeric");
      } else if (value[0].match(/^[0-9]+$/)) {
        formIsValid = false;
        //setError("Do not start with number");
      }
    }
    return formIsValid;
  };

  const handleChange = (e) => {
    let newValue = e.target.value;
    if (handleValidation(newValue) || !newValue) setText(newValue);
  };

  const handlerValue = () => {
    if(handleValidation(text)) {
      props.addColor();
      props.handler(props.name, text, null);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (agree) => () => {
    setOpen(false);
    if (agree) handlerValue();
    setText("");

    //if (agree) handleAllStages();
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        fullWidth="true"
        endIcon={<AddCircle />}
        color="primary"
        onClick={() => handleClickOpen()}
        style={{
          borderRadius: "10px",
          paddingTop: "10px",
          paddingBottom: "10px",
          width: "300px",
        }}
      >
        Add New Cell Type
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" style={{marginRight:"10px"}}>New Cell Type:</Typography>
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

export default AddItem;
