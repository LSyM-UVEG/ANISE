import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import Typography from "@material-ui/core/Typography";
import "../../assets/css/App.css";
import Concentrations from "./Concentrations";
import {InputNumber} from "../Potentials/InputNumber"
import ConstantButton from './ConstantButton';


export default function ProteinDialog(props) {
    const [opened, setOpened] = React.useState(false);
    const [proteinName, setProteinName] = React.useState();
    const [degradation, setDegradation] = React.useState({state: false, value: 0});
    const [basal, setBasal] = React.useState({state: false, value: 0});
    const [diffusion, setDiffusion] = React.useState({state: false, value: 0});
    const [negval, setNegval] = React.useState('n');
    const [iconcentration, setIconcentration] = React.useState([]);
    const [error, setError] = React.useState(props.handleValidation(proteinName));

    const handleAccept = () => {
        if (error === 0) {
            let newDegradation = degradation.state ? degradation.value : null;
            let newBasal = basal.state ? basal.value : null;
            let newDiffusion = diffusion.state ? diffusion.value : null;
            props.handleAccept(proteinName, newDegradation, newBasal, newDiffusion, negval, iconcentration);
            setOpened(false);
        }
    };

    const repairIconcentration = (iconcentration, celltypeLookup) => {
        let celltypeLookupArray = Object.keys(celltypeLookup);
        let newIconcentration = [];
        
        // Check if iconcetration is an array
        if (!Array.isArray(iconcentration)) {
            iconcentration = [iconcentration]
        }

        for (let i = 0; i < celltypeLookupArray.length; i++) {
            let idx = iconcentration.findIndex(e => e.$.t === celltypeLookupArray[i]);
            if (idx >= 0) {
                newIconcentration.push(iconcentration[idx]);
            } else {
                newIconcentration.push({_: 0.0, $: {t: celltypeLookupArray[i], dispersion: 0.0, stochastic: 'n'}});
            }
        }
        return newIconcentration;
    };

    const handlerValue = (property) => (newValue) => {
        if (property === "degradation") {
            setDegradation({state: degradation.state, value: newValue});
        } else if (property === "basal") {
            setBasal({state: basal.state, value: newValue});
        } else if (property === "diffusion") {
            setDiffusion({state: diffusion.state, value: newValue});
        }
    }

    if (props.open && !opened) {
        setProteinName(props.proteinName);
        setDegradation({state: props.degradation !== null, value: props.degradation});
        setBasal({state: props.basal !== null, value: props.basal});
        setDiffusion({state: props.diffusion !== null, value: props.diffusion});
        setNegval(props.negval);
        setIconcentration(repairIconcentration(props.iconcentration, props.celltypeLookup));
        setError(props.handleValidation(props.proteinName));
        setOpened(true);
    }

    let errorText = "";
    if (error === 1) {
        errorText = "Species name is already assigned"
    } else if (error === 2) {
        errorText = "Species name is not valid"
    }

    return (
        <Dialog open={props.open} onClose={(event) => { props.handleClose(); setOpened(false); }} aria-labelledby="form-dialog-title" maxWidth={false}>
            <DialogTitle id="form-dialog-title" style={{textAlign: "center"}}>Edit Protein</DialogTitle>
            <DialogContent>
                <TextField
                    error={error !== 0}
                    helperText={errorText}
                    autoFocus
                    margin="normal"
                    size="medium"
                    id="name"
                    label="Species Name"
                    type="text"
                    value={proteinName}
                    onChange={(event) => { setProteinName(event.target.value); setError(props.handleValidation(event.target.value)); }}
                    variant="outlined"
                    fullWidth
                />

                {props.visualEnabled && <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "4px 0px",
                    }}
                >
                    <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "10px", textAlign: "center", width: "220px", flexShrink: "0" }}>
                        <Switch checked={degradation.state} onChange={(event) => setDegradation({state: event.target.checked, value: degradation.value})} />
                        <Typography color="textSecondary" variant="h6" gutterBottom>
                            {" "}
                            Degradation rate{" "}
                        </Typography>
                        <InputNumber disabled={!degradation.state} name="degradation" minValue={0.0} value={degradation.value ? degradation.value : "0"} round={5} handleValue={handlerValue} />
                        <ConstantButton disabled={!degradation.state} constants={props.constants} handlerValue={handlerValue("degradation")}/>
                    </div>
                    <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "10px", marginLeft: "10px", textAlign: "center", width: "220px", flexShrink: "0" }}>
                        <Switch checked={basal.state} onChange={(event) => setBasal({state: event.target.checked, value: basal.value})} />
                        <Typography color="textSecondary" variant="h6" gutterBottom>
                            {" "}
                            Basal rate{" "}
                        </Typography>
                        <InputNumber disabled={!basal.state} name="basal" minValue={0.0} value={basal.value ? basal.value : "0"} round={5} handleValue={handlerValue} />
                        <ConstantButton disabled={!basal.state} constants={props.constants} handlerValue={handlerValue("basal")}/>  
                    </div>
                    <div style={{ borderStyle: "solid", borderRadius: "4px", padding: "10px", marginLeft: "10px", textAlign: "center", width: "220px", flexShrink: "0" }}>
                        <Switch checked={diffusion.state} onChange={(event) => setDiffusion({state: event.target.checked, value: diffusion.value})} />
                        <Typography color="textSecondary" variant="h6" gutterBottom>
                            {" "}
                            Diffusion rate{" "}
                        </Typography>
                        <InputNumber disabled={!diffusion.state} name="diffusion" minValue={0.0} value={diffusion.value ? diffusion.value : "0"} round={5} handleValue={handlerValue} />
                        <ConstantButton disabled={!diffusion.state} constants={props.constants} handlerValue={handlerValue("diffusion")}/>
                    </div>
                </div>}

                <div>
                    <Concentrations
                    celltypeList={props.celltypeLookup}
                    cellTypeColorList={props.cellTypeColorList}
                    iconcentration={iconcentration}
                    handleIconcentration={setIconcentration}
                    negval={negval}
                    handleNegval={(event) => setNegval(event.target.checked ? 'y' : 'n')}
                    />
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