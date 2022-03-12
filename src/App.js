import "./assets/css/App.css";
import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Hidden from '@material-ui/core/Hidden';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import React from "react";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import { Prompt } from 'react-router'

//Context
import xmlData from "./context/xmlData";

//Componentes
import {FileLoad} from "./components/FileLoad";
import Tabs from "./components/Tabs";
import Global from "./components/Global/Global";
import Stages from "./components/Stages/Stages";
import Potentials from "./components/Potentials/Potentials";
import Cycles from "./components/Cycles/Cycles";
import Proteins from "./components/Proteins/Proteins"
import Manual from "./Manual";

// Auxiliar functions
import { parseXMLProteinEditorData, writeXMLProteinEditorData } from "./components/Proteins/FormulaParser";
import { deleteOrRenameCelltypeInCycles, deleteOrRenameCelltypeInPotentials, deleteOrRenameCelltypeInProteins } from "./components/Deleters";


const styles = () => ({
  root: {
    scrollbarColor: 'rgba(63,81,181,.4) rgba(63,81,181,.2)',
  },
  '@global': {
    '*::-webkit-scrollbar': {
      width: '0.6em',
      height: '0.6em',
      '-webkit-border-radius': '10px',
      backgroundColor: 'rgba(63,81,181,.2)'
    },
    '*::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      '-webkit-border-radius': '10px'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(63,81,181,.4)',
      '-webkit-border-radius': '10px'
    }
  }
});

function getDataObject(data, keys) {
  var properties = Array.isArray(keys) ? keys : keys.split(".");
  return properties.reduce((prev, curr) => prev && prev[curr], data);
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileId: 0,
      isLoaded: false,
      data: null, // Creo que no se usa
      global: null,
      stages: null,
      potentials: null,
      cycles: null,
      proteins: null,
      colorList: [ ],
    };

    this.colorHandler = this.colorHandler.bind(this);
  }

  //TODO quitar
  componentDidMount() {
    var lthis = this;
    //var lthis = Object.assign({}, this);
    //Recuperar fichero de la carpeta public
    fetch(process.env.PUBLIC_URL + "/config.xml")
      .then((r) => r.text())
      .then((text) => {
        var parser = new require("xml2js").Parser({ explicitArray: false });
        parser.parseString(text, function (err, result) {
          //Result contiene el objeto xml estructurado
          if (result && result.tissue) {
            // Arregla el vector de squares, porque si solo hay un square no crea el array
            if (result.tissue.global.itissue.square !== "undefined" && !Array.isArray(result.tissue.global.itissue.square))
              result.tissue.global.itissue.square = [result.tissue.global.itissue.square];
            lthis.setState({
              isLoaded: true,
              global: result.tissue.global,
              stages: Array.isArray(result.tissue.stages.stage)? result.tissue.stages.stage: [result.tissue.stages.stage],
              potentials: Array.isArray(result.tissue.potentials.potential)? result.tissue.potentials.potential: [result.tissue.potentials.potential],
              cycles: Array.isArray(result.tissue.cycles.cycle) ? result.tissue.cycles.cycle : [result.tissue.cycles.cycle],
              proteins: result.tissue.proteins,
              proteinEditorData: parseXMLProteinEditorData(text)
            });
          }

          //var json = JSON.stringify(result); //Aqui se convierte a un string json
          //console.log(json);
        });
      });
  }

  ///////////////////////////////////////////////////7
  //Handlers
  colorHandler(idx, color) {
    let newColorList = this.state.colorList;
    newColorList[idx] = "#" + color.hex;
    this.setState({ colorList: newColorList});
  }

  getColorList = (typesArray) => {
    let newColorList = this.state.colorList;
    while (newColorList.length < Object.keys(typesArray).length) {
      //Generates new color pseudorandom
      newColorList.push("rgb("+ Math.abs(Math.sin((newColorList.length+1)*0.2+0.5))*255+","+ Math.abs(Math.sin((newColorList.length+1)*0.5))*255+","+ Math.abs(Math.sin((newColorList.length+1)-0.5))*255+")");
    }
    return newColorList;
  }
  

  getArray = (data) => {
      return Array.isArray(data) ? data : [data];
  }

  globalByDefault = () => {
    let newGlobal = {
      deltat: "0.001",
      types: {
        celltype1: ""
      },
      itissue: {
        backgroundcells: "celltype1",
        file: { $: {f: ""} },
        ncellsx: "5",
        ncellsy: "5",
        square: []
      }
    }
    return newGlobal;
  }

  stagesByDefault = () => {
    let newStages = [];
    newStages.push({
      $: { order: "1",
          duration: "200",
          intermediate: "10000"},
    });
    return newStages;
  }

  onFileChange = () => (event) => {
    var lthis = this;
    if (event.target.files && event.target.files.length > 0) {
      event.target.files[0].text()
      .then((text) => {
        var parser = new require("xml2js").Parser({ explicitArray: false });
        parser.parseString(text, function (err, result) {
          //Result contiene el objeto xml estructurado
          if (result && result.tissue) {
            lthis.setState({
              fileId: lthis.state.fileId + 1,
              isLoaded: true,
              global: typeof result.tissue.global === "undefined" ? lthis.globalByDefault(): result.tissue.global,
              stages: typeof result.tissue.stages === "undefined" ? lthis.stagesByDefault() : lthis.getArray(result.tissue.stages.stage),
              potentials: typeof result.tissue.potentials === "undefined" ? [result.tissue.potentials] : lthis.getArray(result.tissue.potentials.potential),
              cycles: typeof result.tissue.cycles === "undefined" ? [result.tissue.cycles] : lthis.getArray(result.tissue.cycles.cycle),
              proteins: typeof result.tissue.proteins === "undefined" ? "": result.tissue.proteins,
              proteinEditorData: parseXMLProteinEditorData(text),
              colorList: typeof result.tissue.global === "undefined" ? lthis.getColorList(lthis.globalByDefault()): lthis.getColorList(result.tissue.global.types)
            });
          }

          //var json = JSON.stringify(result); //Aqui se convierte a un string json
          console.log(err);
        });
      });
    }
  };

  onFileSave = (fileName) => {
    var obj = {tissue: [{global: this.state.global}, {stages: {stage: [...this.state.stages]}}, {potentials: {potential: [...this.state.potentials]}}, {cycles: {cycle: [...this.state.cycles]}}, {proteins: this.state.proteins}]}
    var xml2js = require('xml2js');
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj) + '\n' + writeXMLProteinEditorData(this.state.proteinEditorData);
    var blob = new Blob([xml], { type: 'text/xml;charset=utf-8;' });

    fileName = fileName === "" ? "config.xml" : fileName + ".xml";
    var FileSaver = require('file-saver');
    FileSaver.saveAs(blob, fileName);
  };

  handlerValueGlobal = (path, name, data) => {
    let newGlobal = Object.assign({}, this.state.global);

    //TODO check limits in sintaxis
    var datos = getDataObject(newGlobal, path);
    datos[name] = typeof data !== "undefined" ? data : "";

    this.setState({ global: newGlobal });
  };

  handlerValueProteins = (data) => {
    this.setState({ proteins: data });
  };

  handlerValueProteinEditorData = (data) => {
    this.setState({ proteinEditorData: data });
  };

  handlerValueCycle = (path, name, data) => {
    //event && event.preventDefault();
    
    let newCycles = Object.assign([], this.state.cycles);

    //newCycles = !Array.isArray(newCycles) ? [newCycles] : newCycles;
    //TODO check limits in sintaxis
    var datos = getDataObject(newCycles, path);
    if (typeof data !== "undefined" && name === null)
    {
      //datos = [...datos, data];
      datos = data;
      this.setState( {cycles: datos});
    }
    else
    {
      datos[name] = data;
      this.setState( {cycles: newCycles});
    }
  };

  handlerValuePotential = (path, name, data) => {
    //event && event.preventDefault();
    
    let newPotentials = Object.assign([], this.state.potentials);

    //TODO check limits in sintaxis
    var datos = getDataObject(newPotentials, path);

    if (typeof data !== "undefined" && name === null) {
      datos = data;
      this.setState( {potentials: datos});
    } else {
      datos[name] = data;
      this.setState( {potentials: newPotentials});
    }
  };

  handlerValueStages = (path, name, data) => {
    let newStages = Object.assign([], this.state.stages);

    let datos = getDataObject(newStages, path);

    if (typeof data !== "undefined" && name === null) {
      datos = data;
      this.setState({stages: datos});
    } else {
      datos[name] = data;
      this.setState({stages: newStages});
    }
  }

  addCelltypeColor = () => {
    let newColorList = this.state.colorList;
    //Generates new color pseudorandom
    newColorList.push("rgb("+ Math.abs(Math.sin((this.state.colorList.length+1)*0.2+0.5))*255+","+ Math.abs(Math.sin((this.state.colorList.length+1)*0.5))*255+","+ Math.abs(Math.sin((this.state.colorList.length+1)-0.5))*255+")");
    this.setState({ colorList: newColorList });
  }

  removeOrRenameCelltype = (celltype, newCelltypeName = "") => {
    let newGlobal = Object.assign({}, this.state.global);
    let datos = getDataObject(newGlobal, "types");

    // Remove
    if (newCelltypeName === "") {
      if (newGlobal.itissue.square)
        newGlobal.itissue.square = newGlobal.itissue.square.filter((sq) => {
          return sq.$.t !== celltype
        });
      let newColorList = this.state.colorList;
      let idx = Object.keys(datos).indexOf(celltype);
      newColorList.splice(idx, 1);
      delete datos[celltype];
      this.setState({ colorList: newColorList, global: newGlobal});
    } else { 
      // Rename
      let newTypes = {};
      Object.keys(datos).map( (t) => (t===celltype) ? newTypes[newCelltypeName] = "" : newTypes[t] = "");
      newGlobal["types"] = newTypes;
      if(newGlobal.itissue.square) {
        newGlobal.itissue.square.forEach((sq) => {
          if (sq.$.t === celltype) sq.$.t = newCelltypeName;
        });
      }
      if(newGlobal.itissue.backgroundcells === celltype)
        newGlobal.itissue.backgroundcells = newCelltypeName;
      this.setState({global: newGlobal});
    }

    // Remove Or Rename celltype from cycles
    let newCycles = [...this.state.cycles];
    newCycles = deleteOrRenameCelltypeInCycles(newCycles, celltype, newCelltypeName);
    this.handlerValueCycle([], null, newCycles);

    // Remove Or Rename celltype from potentials
    let newPotentials = [...this.state.potentials];
    newPotentials = deleteOrRenameCelltypeInPotentials(newPotentials, celltype, this.state.global, newCelltypeName);
    this.handlerValuePotential([], null, newPotentials);

    // Remove Or Rename celltype from proteins initial concentrations
    let newProteins = Object.assign({}, this.state.proteins);
    newProteins = deleteOrRenameCelltypeInProteins(newProteins, celltype, newCelltypeName);
    this.handlerValueProteins(newProteins);
  };

  handlerOptionalGlobal = (path, name) => (event, newValue) => {
    // If types, can remove o rename
    if (path === "types") {
      (newValue !== null) ? this.removeOrRenameCelltype(name, newValue) : this.removeOrRenameCelltype(name);
    } else {
      //En los opcionales aparece la etiqueta xml o no, no es cuestion de darle valor
      let newGlobal = Object.assign({}, this.state.global);
      var datos = getDataObject(newGlobal, path);

      var value = typeof newValue !== "undefined" ? newValue : event.target.value; //Segun si viene del input o del slider el valor se recoge en un sitio
      if (value === true) datos[name] = "";
      else delete datos[name];  
      
      this.setState({ global: newGlobal });
    }
    
  };

  handleChange = (event, newValue) => {
    alert(newValue);
  };

  Home = () => (
    <React.Fragment>
      <div
    style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}
    >
      <h1 style={{fontSize: '100px', color: 'darkblue'}}>TIFOSI</h1>
      <p><Link to="/manual" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            startIcon={<MenuBookIcon/>}
            >
            Manual
            </Button>
            </Link>
            <span>     </span>
      <Link to="/editor" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            component="label"
            color="primary"
            startIcon={<EditIcon/>}
            >
            Start editing!
            </Button>
            </Link></p>
            </div>
    </React.Fragment>
    );

  Editor = () => (
    <xmlData.Provider value={this.state}>
      {
        window.onbeforeunload = (event) => {
          const e = event || window.event;
          // Cancel the event
          e.preventDefault();
          if (e) {
            e.returnValue = ''; // Legacy method for cross browser support
          }
          return ''; // Legacy method for cross browser support
        }
      }
      <Prompt message="Your changes may be lost. Are you sure?"/>
        <div className="App">
          <div style={{position: 'fixed', zIndex: '130', right: '40px', top: '10px'}}><FileLoad handlerLoad={this.onFileChange} handlerSave={this.onFileSave}/></div>
          <h1 style={{position: 'fixed', zIndex: '130', fontSize: '40px', color: 'darkblue', left: '40px', top: '0px', margin: '0'}}><Link to="/" style={{ textDecoration: 'none' }}><b>TIFOSI</b></Link></h1>
          <Hidden lgUp>
          <p style={{height:"20px"}}> </p>
        </Hidden>
          <Tabs value={1} onChange={this.handleChange}>
            <div label="GLOBAL">
              <Global
                handlerValue={this.handlerValueGlobal}
                handlerOptional={this.handlerOptionalGlobal}
                addColor={this.addCelltypeColor}
                global={this.state.global}
                colorList={this.state.colorList}
                colorHandler={this.colorHandler}
              />
            </div>
            <div label="STAGES">
              <Stages value={this.state} handlerValue={this.handlerValueStages} handlerCycles={this.handlerValueCycle} handlerPotentials={this.handlerValuePotential} handlerProteins={this.handlerValueProteins}/>
            </div>
            <div label="PROTEINS">
             <Proteins key={this.state.fileId} proteins={this.state.proteins} proteinEditorData={this.state.proteinEditorData} cycles={this.state.cycles} handlerValue={this.handlerValueProteins} handlerEditorValue={this.handlerValueProteinEditorData} />
            </div>
            <div label="POTENTIALS">
			        <Potentials
                potentials={this.state.potentials}
                global={this.state.global}
                colorList={this.state.colorList}
                stages={this.state.stages}
                handlerValue={this.handlerValuePotential}
                cellTypeColorList={this.state.colorList}
              />
            </div>

            <div label="CYCLES">
              <Cycles handlerValue={this.handlerValueCycle} cycles={this.state.cycles} cellTypeColorList={this.state.colorList} global={this.state.global} stages={this.state.stages}/>
            </div>
          </Tabs>
        </div>
      </xmlData.Provider>
    );

  MyManual = () => (
    <React.Fragment>
       <h1 style={{position: 'fixed', zIndex: '2000', fontSize: '40px', color: 'darkblue', left: '40px', top: '0px', margin: '0'}}><Link to="/" style={{ textDecoration: 'none', zIndex: '2000' }}><b>TIFOSI</b></Link></h1>
       <Manual/>
    </React.Fragment>
    );

  render() {
    return (
      <Router >
        <div>
          <Route exact path="/" component={this.Home} />
          <Route path="/editor" component={this.Editor} />
          <Route path="/manual" component={this.MyManual} />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
