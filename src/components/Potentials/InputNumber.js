import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


const useScrollBlock = () => {
  const scroll = React.useRef(false)

  const blockScroll = () => {
    if (typeof document === "undefined") return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style || scroll.current) return

    const scrollBarWidth = window.innerWidth - html.clientWidth
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue("padding-right")) || 0

    /**
     * 1. Fixes a bug in iOS and desktop Safari whereby setting
     *    `overflow: hidden` on the html/body does not prevent scrolling.
     * 2. Fixes a bug in desktop Safari where `overflowY` does not prevent
     *    scroll if an `overflow-x` style is also applied to the body.
     */
    html.style.position = "relative" /* [1] */
    body.style.position = "relative" /* [1] */
    html.style.overflow = "hidden" /* [2] */
    body.style.overflow = "hidden" /* [2] */
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`

    scroll.current = true
  }

  const allowScroll = () => {
    if (typeof document === "undefined") return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style || !scroll.current) return

    html.style.position = ""
    html.style.overflow = ""
    body.style.position = ""
    body.style.overflow = ""
    body.style.paddingRight = ""

    scroll.current = false
  }

  return [blockScroll, allowScroll]
}

const styles = (theme) => ({
    text: {
      backgroundColor: "#cfe8fc",
      width: 100,
      height: "100%",
    },
    slider: {
      width: 250,
    },
    input: {
      width: 75,
    },
  
    fieldInput: {
      textAlign: "center",
      fontSize: theme.typography.h4.fontSize,
      WebkitAppearance: "textfield",
      appearance: "textfield",
      backgroundColor: "white",
    },
  });
  
  const useStyles = makeStyles(styles);
export function InputNumber(props) {
    // props.value
    // props.name
    // props.handleValue
    // props.handlelocalvalue
    // props.minValue
    // props.maxValue
    // props.increment
    // props.round
    const [interValue, setInternalValue] = useState(props.value + "");
    const [foco, setFoco] = useState(false);
    const [blockScroll, allowScroll] = useScrollBlock();
    const value = React.useRef();
  
    const classes = useStyles();
    const handlerEnableWheelEvent = (enable) => {
      if (enable && !foco) {
        value.current = props.value + "";
        blockScroll();
        setFoco(true);
      } else {
        props.handleValue(props.name)(value.current);
        if (foco) {
          allowScroll();
          setFoco(false);
        }
      }
    };

    const exportInternalValue = (newValue) => {
      if (props.handleLocalValue)
        props.handleLocalValue(props.name)(newValue);
    }
  
    const checkLimits = (val) => {
      if (val === "") val = 0;
      if (typeof props.minValue !== "undefined")
        val = parseFloat(val) < props.minValue ? props.minValue : val;
      if (typeof props.maxValue !== "undefined")
        val = parseFloat(val) > props.maxValue ? props.maxValue : val;
      return val;
    }

    const handlerWheelMouse = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      if (foco) {

        let absIncrement = (typeof props.increment === "undefined") ? 0.01 : props.increment;

        let increment = ev.deltaY === 0 ? 0.0 : ev.deltaY > 0 ? absIncrement : -absIncrement;
        value.current = isNaN(value.current) ? value.current : parseFloat(value.current) + increment + "";
        if (!isNaN(value.current)) {
          // limits
          value.current = checkLimits(value.current);
          // round
          let roRound = (typeof props.round !== "undefined") ? Math.pow(10, props.round) : 100;
          value.current = Math.round(parseFloat(value.current) * roRound) / roRound + "";
        }
        setInternalValue(value.current);
        exportInternalValue(value.current);
      }
    };
  
    const handlerChangeEvent = (ev) => {

      //let pattern = /-?[1-9][0-9]?.?[0-9]{0,2}|-?[0](.[0-9]{0,2})?/g;
      let pattern = /-?[0-9]*(\.[0-9]{0,4})?/g;
      if (typeof props.round !== "undefined")
        pattern = new RegExp("-?[0-9]*(\.[0-9]{0," + props.round + "})?");
        //pattern = new RegExp("-?[1-9][0-9]?.?[0-9]{0," + props.round + "}|-?[0](.[0-9]{0," + props.round + "})?", "g");
      let validation = ev.target.value.match(pattern);
      let newValue = validation != null ? validation[0] : ev.target.value;
      //let newValue = ev.target.validity.valid && !isNaN(ev.target.value) ? parseFloat(ev.target.value) : interValue;
      newValue = !isNaN(newValue) ? newValue : interValue;
      if (Number.isNaN(newValue))
        // si el campo es vacío ponemos 0
        newValue = checkLimits("0");
      if (props.value !== newValue) {
        newValue = checkLimits(newValue);
        // round
        let toRound = (typeof props.round !== "undefined") ? Math.pow(10, props.round) : 100;
        if ((newValue[newValue.length - 1] !== "." && newValue[newValue.length - 1] !== "0") || toRound === 1)
          newValue = Math.round(parseFloat(newValue) * toRound) / toRound + "";
        value.current = newValue;
        setInternalValue(newValue);
        exportInternalValue(newValue);
        props.handleValue(props.name)(newValue); // TODO. sobra el ev
      }
    };

 
    if (!foco && interValue !== props.value + "") {
      setInternalValue(props.value + "");
      return;
    }
  
    return (
      <Tooltip title={isNaN(interValue) ? <Typography>{interValue}</Typography> : ""} aria-label="equation">
        <InputBase
          className="specialInputNumber"
          color="primary"
          disabled={typeof props.disabled === "undefined" ? false : props.disabled}
          name={props.name}
          type={"text"}
          value={!isNaN(interValue) ? interValue : (props.onlyNumbers) ? "f(x)" : interValue}
          inputProps={{ className: classes.fieldInput /*, pattern: "^-?[0-9]{1,2}.?[0-9]{0,2}", title:"bla" */ }}
          onChange={(e) => handlerChangeEvent(e)}
          onClick={(e) => handlerEnableWheelEvent(true)}
          onBlur={(e) => handlerEnableWheelEvent(false)}
          onWheel={(e) => handlerWheelMouse(e)}
        />
      </Tooltip>
    );
  }