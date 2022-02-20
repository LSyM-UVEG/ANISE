import { Component } from "react";
import xmlData from "../../context/xmlData";
import React from "react";
import ProteinsEditor from "./ProteinsEditor";
import Constants from "./Constants";

class Proteins extends Component {
  render() {
    var stageLookupObject = {};
    return (
      <xmlData.Consumer>
        {(state) =>
          state &&
          state.stages && (
            <div>
              {state.stages.map((stage, i) => {
                stageLookupObject[i + 1] = i + 1;
                return ""; //sin return da warning
              })}
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "flex-start" }}>
                <Constants proteins={this.props.proteins} cycles={this.props.cycles} handlerValue={this.props.handlerValue} stageLookup={stageLookupObject} />

                <ProteinsEditor
                  proteins={this.props.proteins}
                  proteinEditorData={this.props.proteinEditorData}
                  handlerValue={this.props.handlerValue}
                  handlerEditorValue={this.props.handlerEditorValue}
                  celltypeLookup={state.global.types}
                  cellTypeColorList={state.colorList}
                />
              </div>
            </div>
          )
        }
      </xmlData.Consumer>
    );
  }
}

export default Proteins;
