import "./assets/css/App.css";
import { Component } from "react";

import React from 'react';

import ResponsiveDrawer from "./ResponsiveDrawer";

class Manual extends Component {
 
  render() {
  return (    
    <div className="Manual">
      <ResponsiveDrawer/>
    </div>
  );
  }
}

export default Manual;