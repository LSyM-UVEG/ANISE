import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({  
    relationStyle: {
      "&:hover": {
        cursor: "pointer",
        //strokeWidth: "8px",
      },
    },
  }));

export default function ProteinRelation(props) {
    const classes = useStyles();

    let points = [{x: props.startX, y: props.startY}];
    props.points.forEach((point) => {points.push({x: point.x, y: point.y})});
    points.push({x: props.endX, y: props.endY});

    let n = points.length;

    let color = props.type === "positive" ? "#57bd77" : "#e64e4e";
    let angle = Math.atan2(points[n-1].y - points[n-2].y, points[n-1].x - points[n-2].x);
    angle = 180*angle/Math.PI;
    if (props.angle !== null && props.type === "negative") {
        angle = props.angle;
    }
    let transf = "translate(" + props.endX.toString() + ", " + props.endY.toString() + ") rotate(" + angle.toString() + ")";

    //let newEndX = props.endX, newEndY = props.endY;
    let v = {x: points[n-2].x - points[n-1].x, y: points[n-2].y - points[n-1].y};
    let vMag = Math.sqrt(v.x * v.x + v.y * v.y);
    if (vMag > 0.0001) {
        v = {x: v.x / vMag, y: v.y / vMag};
        points[n-1].x += v.x * 8;
        points[n-1].y += v.y * 8;
    }

    //transf = "translate(" + points[n-1].x.toString() + ", " + points[n-1].y.toString() + ") rotate(" + angle.toString() + ")";

    return (
        <g onDoubleClick={props.onDoubleClick} class={classes.relationStyle}>
            {points.map((point, i) => (
                (i < n-1) && <line key={i} x1={points[i].x} y1={points[i].y} x2={points[i+1].x} y2={points[i+1].y} stroke={color} strokeWidth="5" onMouseDown={props.onRelationMouseDown(i)} />
            ))}
            {props.points.map((point, i) => (
                <circle key={i} cx={point.x} cy={point.y} r="6" stroke="none" fill={color} onMouseDown={props.onRelationPointMouseDown(i)} />
            ))}

            <circle cx={props.startX} cy={props.startY} r="6" stroke="none" fill={color} onMouseDown={props.onRelationStartMouseDown} />
            
            {props.type === "positive" && <polygon onMouseDown={props.onRelationEndMouseDown} transform={transf} points="-20 -8, 0 0, -20 8" fill={color} />}
            {props.type === "negative" && <line onMouseDown={props.onRelationEndMouseDown} transform={transf} x1="-2" y1="-12" x2="-2" y2="12" stroke={color} strokeWidth="5" />}
        </g>
    );
}

