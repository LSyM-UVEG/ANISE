import React, {useEffect, useState} from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { ColorPicker } from "material-ui-color";
import { InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  fieldInput: {
    //textAlign: "center",
    fontSize: theme.typography.h5.fontSize,
    WebkitAppearance: "textfield",
    appearance: "textfield",
    cursor: "pointer",
    //borderRadius: "4px",
    //boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
  }
});

const useStyles = makeStyles(styles);
function ItemList(props) {
  const classes = useStyles();
  const [keyNameModified, setKeyNameModified] = useState([]);

  useEffect(() => {
    // initial check
    setKeyNameModified(Object.keys(props.value));
  }, [props.value, Object.keys(props.value).length]);

  const handleValidation = (value) => {
    let formIsValid = true;
    if (!value) formIsValid = false;
    
    if (typeof value !== "undefined") {
      if (!value.match(/^[a-zA-Z0-9_]{1,10}$/)) formIsValid = false;
      else if (value[0].match(/^[0-9]+$/)) formIsValid = false;
    }
    return formIsValid;
  };

  const checkInconsistency = (keyName) => {
     let inconsistent = false;
     inconsistent = (Object.keys(props.value).indexOf(keyName) !== -1);
     return inconsistent;
  };

  // Only its checking the newValue
  const handlerChangeName = (keyName, i) => (event) => {
    // si tiene el mismo valor, no hace nada
    if (event.target.value === keyNameModified[i]) return;

    // si es valido el texto o vacio, se registra en variable local (se esta escribiendo)
    if (handleValidation(event.target.value) || !event.target.value) {
      let newNames = keyNameModified.map((element,item) => i === item ? event.target.value : element);
      setKeyNameModified(newNames);
    }
  };


  const checkAndSave = (oldValue, newValue) => {
    if (oldValue !== newValue && !checkInconsistency(newValue))
      props.handler("types", oldValue)(null, newValue);
    else {
      setKeyNameModified(Object.keys(props.value));
    }
  };

  return (
    <span style={{ width: "400px", maxHeight: "250px", overflowY: "auto" }}>
      <List component="nav" aria-label="list" dense="true" disablePadding="true">
        {Object.keys(props.value).map((item, i) => {
          if (props.colorList.length <= i) return props.addColor();
          else
            return (
              <ListItem key={i} alignItems="center" divider>
                <ListItemIcon>
                  <ColorPicker hideTextfield disableAlpha value={props.colorList[i]} onChange={(color) => props.colorHandler(i, color)} />
                </ListItemIcon>
                {/* <Typography variant="h5" aling="center">
                  {item}
                </Typography> */}
                <InputBase
                  color="primary"
                  name={item}
                  type={"text"}
                  value={keyNameModified[i]}
                  inputProps={{ className: classes.fieldInput }}
                  onChange={handlerChangeName(item, i)}
                  onBlur={() => checkAndSave(item, keyNameModified[i])}
                />

                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={(event) => props.handlerRemoveCelltype(item)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
        })}
      </List>
    </span>
  );
}

export default ItemList;
