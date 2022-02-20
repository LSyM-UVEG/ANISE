import { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
//import Radio from '@material-ui/core/Radio';
//import RadioGroup from '@material-ui/core/RadioGroup';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormControl from '@material-ui/core/FormControl';
//import FormLabel from '@material-ui/core/FormLabel';

import { ResizableStages } from "./ResizableStages";

const AirbnbSlider = withStyles({
    root: {
      color: '#3a8589',
      height: 3,
      padding: '13px 0',
    },
    thumb: {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      marginTop: -12,
      marginLeft: -13,
      boxShadow: '#ebebeb 0 2px 2px',
      '&:focus, &:hover, &$active': {
        boxShadow: '#ccc 0 2px 3px 1px',
      },
      '& .bar': {
        // display: inline-block !important;
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
      '&:hover': {
        background: "#2196F3",
      },
    },
    active: {},
    track: {
      height: 3,
    },
    rail: {
      color: '#d8d8d8',
      opacity: 1,
      height: 3,
    },
  })(Slider);

function highlight(x) {
    //let actualValue = x['aria-valuenow'];
    //Crear state.selectedStage??
}

function ThumbComponent(props) {
    
//aria-valuenow tiene el valor del punto
    return (
      <span onMouseOver={highlight(props)} {...props}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
    );
  }

class MultiSlider extends Component {

  max = 0;

  constructor(props) {
    super(props);
    this.state = {
      proportions: [],
      typeScaleTime: "intermediate"
    };
  }

  getStagesProps = () => {
    let values = [];
    let propor = [];
    let max = 0.0;
    if(this.props.value.stages && this.props.value.global){
      //Calculate max
      for(let i=0; i < this.props.value.stages.length; ++i)
      {
        values[i] = (this.props.value.stages[i].$.duration * this.props.value.stages[i].$.intermediate * this.props.value.global.deltat);
        max += values[i];
      }

      //From max get proportion
      values.map((value) => {
        return propor.push(value / max);
      });
    }
    let hasToUpdate = false;
    if(propor.length === this.state.proportions.length){
      propor.map((pr, id) => {
        hasToUpdate = hasToUpdate || Math.abs( pr - this.state.proportions[id]) > 0.0;
        return {};
      });
    }
    else
      hasToUpdate = true;

    if(hasToUpdate)
      this.setState({ proportions: propor});
    return;
  };

    handlerOnChange = () => (event, newValue) => {
      if(event && typeof event !== "undefined")
        event.preventDefault();

        var newStages = [...this.props.value.stages]; //... hace copia
        this.props.value.stages.map((stage, i) => {
            let time = i === 0 ? newValue[i] : i === this.props.value.stages.length -1? this.max - newValue[i-1]: newValue[i] - newValue[i-1];
            // d * i * dt = t
            //t / (dt * (i o d))
            if(this.state.typeScaleTime === "intermediate")
              newStages[i].$.intermediate = Math.round( time / (this.props.value.global.deltat * newStages[i].$.duration) );
            else
              newStages[i].$.duration = Math.round( time / (this.props.value.global.deltat * newStages[i].$.intermediate) );
            return {};
        });

        this.props.handlerValue([], null, newStages);
    };

    handlerRadio = (event) => {
      this.setState({ typeScaleTime: event.target.value});
    };

    handlerOnChangeDiv = (path, name, data) => (event, newValue) => {
      if(event && typeof event !== "undefined")
      event.preventDefault();
      
      const idModified = path;
      let diff = newValue - this.state.proportions[idModified];
      let max = 0;
      for(let i=0; i < this.props.value.stages.length; ++i)
        max += (this.props.value.stages[i].$.duration * this.props.value.stages[i].$.intermediate * this.props.value.global.deltat);
  
      var newStages = [...this.props.value.stages]; //... hace copia
  
      let realTime1 = newStages[idModified].$.duration * newStages[idModified].$.intermediate * this.props.value.global.deltat;
      realTime1 += max * diff;
  
      let realTime2 = newStages[idModified + 1].$.duration * newStages[idModified + 1].$.intermediate * this.props.value.global.deltat;
      realTime2 -= max * diff;
  
      newStages[idModified].$.intermediate = Math.round( realTime1 / (this.props.value.global.deltat * newStages[idModified].$.duration) );
      newStages[idModified+1].$.intermediate = Math.round( realTime2 / (this.props.value.global.deltat * newStages[idModified+1].$.duration) );
  
      this.props.handlerValue([], null, newStages);
  };

  changeSelectedDiv = (e, newSelected) => {
    this.props.handlerSelected(newSelected - 1);
  };

  render() {
    this.getStagesProps();

    var values = [];
    this.max = 0;
    if(this.props.value.stages && this.props.value.global){
      for(let i=0; i < this.props.value.stages.length -1; ++i)
      {
        values[i] = this.max + (this.props.value.stages[i].$.duration * this.props.value.stages[i].$.intermediate * this.props.value.global.deltat);
        this.max = values[i];
      }
      if(this.props.value.stages.length > 0)
        this.max += (this.props.value.stages[this.props.value.stages.length -1].$.duration * this.props.value.stages[this.props.value.stages.length -1].$.intermediate * this.props.value.global.deltat);
    }

    var marks = [
        { value: 0, label: '0' },
        { value: this.max, label: this.max.toLocaleString('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).replace(/,/g, "")},
      ];

    return (
      <div>
        {/*
        <FormControl component="fieldset">
        <FormLabel component="legend">Time scale</FormLabel>
        <RadioGroup aria-label="timeType" name="timeType" value={this.state.typeScaleTime} onChange={this.handlerRadio}>
          <FormControlLabel value="duration" control={<Radio />} label="Duration" />
          <FormControlLabel value="intermediate" control={<Radio />} label="Intermediate" />
        </RadioGroup>
      </FormControl>
        */}
      <Grid component="span" container spacing={2} justify={"center"}>
        <Grid item xs={12} md={11}>
        <ResizableStages
          sizes={this.state.proportions}
          handleChangePhase={this.changeSelectedDiv}
          handleChangeProps={this.handlerOnChangeDiv}
          selected={this.props.selected}
        />
        <div style={{height:'10px'}}></div>
        <AirbnbSlider 
            ThumbComponent={ThumbComponent}
            track={false}
            aria-labelledby="track-false-range-slider"
            getAriaLabel={() => ('custom thumb label')}
            value={values}
            marks={marks}
            max={this.max}
            onChange={this.handlerOnChange()}
        />
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default MultiSlider;
