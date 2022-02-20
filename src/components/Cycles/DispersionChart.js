import React, { useCallback } from "react";
import { Line } from "react-chartjs-2";
import Slider from "@material-ui/core/Slider";

export function DispersionChart(props) {
  const lowerBound = -Math.PI * 0.5; //100;
  const upperBound = Math.PI * 0.5; //300;

  const [divisionDispersionRange] = React.useState(
    10
  ); // data
  const [update, setUpdate] = React.useState(false);
  const initPos = React.useRef();

  const changeDivisionDispersion = (e, newValue) => {
    props.handleDispersion(newValue);
  };

  const changeDivisionDispersionCommitted = (e, newValue) => {
    props.handleUpdate("divisiondispersion", props.dispersion);
  }

  const normalY = (x, mean, stdDev) =>
    Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));

  const getMean = (lowerBound, upperBound) => (upperBound + lowerBound) / 2;

  // distance between mean and each bound of a 95% confidence interval
  // is 2 stdDeviation, so distance between the bounds is 4
  const getStdDeviation = (lowerBound, upperBound) =>
    //(upperBound - lowerBound) / 4;
    props.dispersion;

  const range = (start, stop, step = 1) =>
    Array(Math.ceil((stop - start) / step))
      .fill(start)
      .map((x, y) => x + y * step);

  const samples = 101;

  const generatePoints = (lowerBound, upperBound) => {
    //let stdDev = getStdDeviation(lowerBound, upperBound);
    //let min = lowerBound - 2 * stdDev;
    //let max = upperBound + 2 * stdDev;
    let unit = (upperBound - lowerBound) / samples;
    //return _.range(min, max, unit);
    return range(lowerBound, upperBound, unit);
  };

  const handleMouseDown = (e) => {
    if (e.type === "mousedown") {
      document.addEventListener("mouseup", handleMouseUp, true);
      document.addEventListener("mousemove", handleMouseMove, true);
      initPos.current = e.clientX; // - e.target.getBoundingClientRect().left;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
    setUpdate(true);
  };

  const handleMouseMove = useCallback(
    (e) => {
      let diff = e.clientX - initPos.current;

      let newAngleLimit = props.dispersionLimit + diff * 0.01;
      newAngleLimit = Math.min(newAngleLimit, Math.PI * 0.5);
      newAngleLimit = Math.max(newAngleLimit, 0);
      newAngleLimit = Math.round(newAngleLimit * 1000) / 1000;

      // let newLimit = props.dispersionLimit / Math.PI * samples + diff * 0.25;
      // parseInt(newLimit);
      // newLimit = Math.min(newLimit, 50);
      // newLimit = Math.max(newLimit, 1);
      props.handleDispersionLimit(newAngleLimit);
    },
    [props]
  );

  if (update) {
    setUpdate(false);
    props.handleUpdate("divisiondispersionlimit", props.dispersionLimit);
    return null;
  }

  let mean = getMean(lowerBound, upperBound);
  let stdDev = getStdDeviation(lowerBound, upperBound);
  let points = generatePoints(lowerBound, upperBound);

  let seriesData = points.map((x) => ({ x, y: normalY(x, mean, stdDev) }));
  let limit = parseInt(props.dispersionLimit / Math.PI * samples);
  let leftBarPos = 51 - limit;
  let rightBarPos = 51 + limit;
  let seriesDataLeft = seriesData.slice(0, leftBarPos);
  let seriesDataRight = seriesData.slice(rightBarPos);
  seriesData = seriesData.slice(leftBarPos - 1, rightBarPos + 1);
  let limitsData = new Array(samples).fill(0);
  limitsData[leftBarPos] = 1;//110000;
  limitsData[rightBarPos] = 1; //110000;
  let center = new Array(samples).fill(0);
  //center[49] = 1.1;//110000;
  center[50] = 1.1;//110000;

  const state = {
    labels: points,
    datasets: [
      {
        type: "bar",
        label: "Dataset 2",
        backgroundColor: "darkorchid",
        data: limitsData,
        borderColor: "darkorchid",
        barThickness: 4,
      },

      {
        type: "bar",
        label: "Dataset 3",
        backgroundColor: "blue",
        data: center,
        borderColor: "blue",
        barThickness: 4,

      },

      {
        label: "Dispersion1",
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,0.5)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        pointRadius: 0,
        fill: "start",
        data: seriesData,
        hover: false,
      },
      {
        label: "Dispersion2",
        lineTension: 0.5,
        backgroundColor: "rgba(192,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        pointRadius: 0,
        fill: "start",
        data: seriesDataLeft,
      },
      {
        label: "Dispersion3",
        lineTension: 0.5,
        backgroundColor: "rgba(192,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        pointRadius: 0,
        fill: "start",
        data: seriesDataRight,
      },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        //flexFlow: "row wrap"
      }}
    >
      <Slider //className={classes.slider}
        name={"DivisionDipersion"}
        step={0.1}
        min={0}
        max={divisionDispersionRange}
        value={props.dispersion.toFixed(2)}
        valueLabelFormat={value => ((props.dispersion > divisionDispersionRange) ? ">" + value : value)}
        onChange={changeDivisionDispersion}
        onChangeCommitted={changeDivisionDispersionCommitted}
        aria-labelledby="input-slider"
        valueLabelDisplay="on"
        style={{ paddingTop: "60px" }}
      />

      <Line
        data={state}
        options={{
          title: {
            display: false,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: false,
            position: "right",
          },
          events: ["mousedown"],
          onHover: (e) => handleMouseDown(e),
          //onClick: test,
          //onHover: test,
          tooltips: {
            enabled: false,
          },
          elements: {
            point: 0,
          },
          animation: {
            duration: 0,
          },
          scales: {
            xAxes: [
              {
                display: false,
                scaleLabel: {
                  show: true,
                  labelString: "Month",
                },
              },
            ],
            yAxes: [
              {
                display: false,
                scaleLabel: {
                  show: true,
                  labelString: "Value",
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}
