import React, { useCallback } from "react";
import { Line } from "react-chartjs-2";
import Slider from "@material-ui/core/Slider";

export function HillFunctionChart(props) {
  const lowerBound = 0.0; //100;
  const upperBound = 1.0; //props.threshold > 0.001 ? props.threshold * 2 : 1.0; //300;

  const [update, setUpdate] = React.useState(false);
  const initPos = React.useRef();

  const hillEquation = (x, k, n) =>
    Math.pow(x, n) / (Math.pow(k, n) + Math.pow(x, n));
  
  const hillInverseEquation = (x, k, n) =>
    Math.pow(k, n) / (Math.pow(k, n) + Math.pow(x, n));

  const range = (start, stop, step = 1) =>
    Array(Math.ceil((stop - start) / step))
      .fill(start)
      .map((x, y) => x + y * step);

  const samples = 101;

  const generatePoints = (lowerBound, upperBound) => {
    let unit = (upperBound - lowerBound) / samples;
    return range(lowerBound, upperBound, unit);
  };

  let points = generatePoints(lowerBound, upperBound);
  let auxN = isNaN(props.n) ? 100.0 : props.n;
  let seriesData = points.map((x) => ({ x, y: props.type === "positive" ? hillEquation(x, 0.5, auxN) : hillInverseEquation(x, 0.5, auxN) }));

  const state = {
    labels: points,
    datasets: [
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

      <Line
        data={state}
        options={{
          title: {
            display: false,
            text: "Hill Function",
            fontSize: 20,
          },
          legend: {
            display: false,
          },
          events: ["mousedown"],
          //onHover: (e) => handleMouseDown(e),
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
                type: 'linear',
                ticks: {
                  beginAtZero: true,
                  stepSize: 0.5,
                  max: 1,
                  callback: function(value, index, values) {
                    let label = "";
                    switch (index)
                    {
                      case 0:
                        label = "0";
                        break;
                      case 1:
                        label = props.threshold.toString();
                        break;
                      case 2:
                        label = isNaN(props.threshold) ? "2 * " + props.threshold : (props.threshold * 2).toString();
                        break;
                    }
                    return label;
                }
                },
              },
            ],
            yAxes: [
              {
                type: 'linear',
                ticks: {
                  beginAtZero: true,
                  stepSize: 0.5,
                  max: 1,
                  callback: function(value, index, values) {
                    let label = "";
                    switch (index)
                    {
                      case 2:
                        label = "0";
                        break;
                      case 1:
                        label = isNaN(props.k) ? "0.5 * " + props.k : (props.k * 0.5).toString();
                        break;
                      case 0:
                        label = props.k.toString();
                        break;
                    }
                    return label;
                }
                },
              },
            ],
          },
        }}
      />
    </div>
  );
}