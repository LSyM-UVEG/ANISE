import { Component } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { InputNumber } from "../Potentials/InputNumber";

const styles = () => ({
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
    width: "80%",
  },
  input: {
    width: 75,
  },
});

class NumberObj extends Component {
  changeProperty = (property) => (newValue) => {
    this.props.handler(this.props.path, this.props.name, newValue);
  };

  handlerValue(event) {
    event.preventDefault();
    this.props.handler(this.props.path, this.props.name, event.target.value);
  }
  handlerSlider(event, newValue) {
    event.preventDefault();
    this.props.handler(this.props.path, this.props.name, newValue + "");
  }

  render() {
    const { classes } = this.props;
    const marks = [
      { value: this.props.min, label: this.props.min },
      { value: this.props.max, label: this.props.max },
    ];

    return (
      <div style={{ borderTop: "1px solid LightGray" }}>
        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "flex-end", height: "64px" }}>
          <span style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "320px" }}>
            <Typography variant="h5"> {this.props.label} </Typography>
            <Slider
              className={classes.slider}
              name={this.props.name}
              step={this.props.step}
              min={this.props.min}
              max={this.props.max}
              value={this.props.value}
              marks={marks}
              style={{ width: "160px",  marginLeft: "10px"}}
              onChange={this.handlerSlider.bind(this)}
              aria-labelledby="input-slider"
              valueLabelDisplay="off"
            />
          </span>
          <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "0px", marginLeft: "10px", width: "120px", alignSelf: "center" }}>
            <InputNumber
              name="dispersion"
              value={this.props.value}
              minValue={this.props.min}
              maxValue={this.props.max}
              increment={this.props.step}
              round={this.props.round}
              handleValue={this.changeProperty.bind(this)}
              handleLocalValue={this.changeProperty.bind(this)}
            />
          </div>

          {/* <Input
            className={classes.input}
            value={this.props.value}
            margin="dense"
            onChange={this.handlerValue.bind(this)}
            //onBlur={handleBlur}
            inputProps={{
              step: this.props.step,
              min: this.props.min,
              max: this.props.max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(NumberObj);
