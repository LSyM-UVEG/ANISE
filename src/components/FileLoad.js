import React from "react";
import { Dialog, InputBase, DialogContent, DialogContentText, DialogActions, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import { Link } from "react-router-dom";
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
export function FileLoad(props) {
  const [text, setText] = React.useState("config");
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleValidation = (value) => {
    let formIsValid = true;
    if (!value) formIsValid = false;
    if (typeof value !== "undefined") {
      if (!value.match(/^[a-zA-Z0-9_]{1,12}$/))  formIsValid = false;
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
    if (agree) props.handlerSave(text);
  };

  return (
    <React.Fragment>
      <div>
        <Grid container spacing={2} justify={"center"}>
          <Grid item>
            <Link to="/manual" style={{ display: "table-cell", textDecoration: 'none' }} target="_blank">
              <Button
                variant="contained"
                component="label"
                color="primary"
                startIcon={<MenuBookIcon />}
              >
                Manual
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              color="primary"
              startIcon={<CloudUploadIcon />}
            >
              Load file
              <input
                type="file"
                hidden
                onChange={props.handlerLoad()}
              />
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              component="label"
              color="primary"
              startIcon={<CloudDownloadIcon />}
              onClick={() => setOpen(true)}
            >
              Save file
            </Button>
          </Grid>
        </Grid>
      </div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h5" style={{ marginRight: "10px" }}>File Name:</Typography>
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
