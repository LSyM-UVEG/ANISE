import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { HillFunctionChart } from './HillFunctionChart';
import Typography from "@material-ui/core/Typography";
import "../../assets/css/App.css";
import {InputNumber} from "../Potentials/InputNumber"
import ConstantButton from './ConstantButton';


export default function RelationDialog(props) {
    const [opened, setOpened] = React.useState(false);
    const [threshold, setThreshold] = React.useState(1.5);
    const [n, setN] = React.useState(2);
    const [k, setK] = React.useState(1.0);
    const [type, setType] = React.useState("positive");
    const [error, setError] = React.useState(!props.handleValidation());

    const handleAccept = () => {
        if (!error) {
            props.handleAccept(threshold, n, k);
            setOpened(false);
        }
    };

    const handlerValue = (property) => (newValue) => {
        if (property === "k") {
            setK(newValue);
        } else if (property === "threshold") {
            setThreshold(newValue);
        } else if (property === "n") {
            setN(newValue);
        }
    }

    if (props.open && !opened) {
        setThreshold(props.threshold);
        setN(props.n);
        setK(props.k);
        setType(props.type);
        setOpened(true);
    }

    return (
        <Dialog open={props.open} onClose={(event) => { props.handleClose(); setOpened(false); }} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title" style={{textAlign: "center"}}>Edit regulation</DialogTitle>
            <DialogContent>
                <HillFunctionChart type={type} k={k} threshold={threshold} n={n} />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "20px",
                    }}
                >
                    <Tooltip title={<Typography>Maximal production</Typography>}>
                    <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "10px", width: "300px", marginLeft: "10px", textAlign: "center" }}>
                        <Typography color="textSecondary" variant="h6" gutterBottom>
                            {" "}
                            k{" "}
                        </Typography>
                    
                        <InputNumber name="k" value={k} round={4} handleValue={handlerValue} />
                        <ConstantButton constants={props.constants} handlerValue={handlerValue("k")}/>
                    </div>
                    </Tooltip>
                    <Tooltip title={<Typography>Concentration yielding half-maximal</Typography>}>
                    <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "10px", width: "300px", marginLeft: "10px", textAlign: "center" }}>
                        <Typography color="textSecondary" variant="h6" gutterBottom>
                            {" "}
                            Threshold{" "}
                        </Typography>
                        
                        <InputNumber name="threshold" value={threshold} round={4} handleValue={handlerValue} />
                        <ConstantButton constants={props.constants} handlerValue={handlerValue("threshold")}/>
                    </div>
                    </Tooltip>
                    <Tooltip title={<Typography>Degree of cooperativity (Hill exponent)</Typography>}>
                    <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "10px", width: "300px", marginLeft: "10px", textAlign: "center" }}>
                        <Typography color="textSecondary" variant="h6" gutterBottom>
                            {" "}
                            n{" "}
                        </Typography>
                    
                        <InputNumber name="n" value={n} round={4} handleValue={handlerValue} />
                        <ConstantButton constants={props.constants} handlerValue={handlerValue("n")}/>
                    </div>
                    </Tooltip>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={(event) => { props.handleClose(); setOpened(false); }} color="primary">
                    Cancel
            </Button>
                <Button onClick={(event) => handleAccept()} color="primary">
                    Apply
            </Button>
            </DialogActions>
        </Dialog>
    );
}