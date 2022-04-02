import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({  
    proteinStyle: {
      "&:hover": {
        strokeWidth: "3px",
      },
    },
    commonStyle: {
      "&:hover": {
        cursor: "pointer",
      },
    }
  }));

export default function ProteinNode(props) {
    const classes = useStyles();
    let transf = "translate(" + props.x.toString() + ", " + props.y.toString() + ")";

    return (
        <g transform={transf} class={classes.commonStyle}>
            <g onMouseDown={props.onMouseDown} onDoubleClick={props.onDoubleClick}>
                <rect x={-props.width/2} y={-props.height/2} width={props.width} height={props.height} stroke="rgb(200,200,200)" strokeWidth="1px" fill="white" class={classes.proteinStyle}/>
                <text className="not-selectable" x="0" y="0" fill="rgb(100,100,100)" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: 24 }}>{props.name}</text>
            </g>
            {props.degradation !== null && <g onMouseDown={() => props.onRemoveProp("degradation")} transform={"translate(" + props.width/2 + ", 0)"}>
                <path fill="none" stroke="black" strokeWidth="3" d="M0,0 a20,20 0 0,1 20,20" />
                <circle cx="20" cy="20" r="4" stroke="none" fill="black" />
            </g>}
            {props.basal !== null && <g onMouseDown={() => props.onRemoveProp("basal")} transform={"translate(0, " + -props.height/2 + ") rotate(-90)"}>
                <path transform="translate(6, 0)" fill="none" stroke="black" strokeWidth="3" d="M0,0 a20,20 0 0,1 20,20" />
                <polygon points="0 0, 7 5, 7 -5" fill="black" />
            </g>}

            {props.diffusion !== null && <g onMouseDown={() => props.onRemoveProp("diffusion")} transform={"translate(" + -props.width/2 + ", 0)"}>
                <path transform="translate(-20, 15) rotate(-130)" fill="none" stroke="blue" strokeWidth="3" d="M0,0 a20,20 0 0,1 20,20" />
                <path transform="translate(-14, 12) rotate(-130) scale(0.75)" fill="none" stroke="blue" strokeWidth="3" d="M0,0 a20,20 0 0,1 20,20" />
                <path transform="translate(-8, 9) rotate(-130) scale(0.5)" fill="none" stroke="blue" strokeWidth="3" d="M0,0 a20,20 0 0,1 20,20" />
            </g>}
        </g>
    );
}