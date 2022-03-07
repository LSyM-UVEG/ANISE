import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import RemoveIcon from '@material-ui/icons/RemoveCircle';
import NearMeIcon from "@material-ui/icons/NearMe";

import ZoomInIcon from "@material-ui/icons/ZoomIn";
import PanToolIcon from "@material-ui/icons/PanTool";
import BrushIcon from "@material-ui/icons/Brush";
import LayersClearIcon from "@material-ui/icons/LayersClear";
import OpenWithIcon from "@material-ui/icons/OpenWith";
import SelectAllIcon from "@material-ui/icons/SelectAll";

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './assets/css/w3.css';
import time_step from './assets/images/time_step.png';
import transitions from './assets/images/t1c2_transitions.png';
import binomial from './assets/images/binomial_distribution.png';
import celltypes from './assets/images/celltypes.PNG';
import background from './assets/images/background.png';
import squares from './assets/images/squares.png';
import sections from './assets/images/sections.PNG';
import loadsave from './assets/images/load_save.png';
import canvas from './assets/images/canvas.PNG';
import toolbar_potentials from './assets/images/toolbar_potentials.png';
import one_cell from './assets/images/one_cell.png';
import two_cells from './assets/images/two_cells.png';
import function_editor from './assets/images/function_editor.PNG';
import function_editor_equation from './assets/images/function_editor_equation.PNG';
import function_editor_options from './assets/images/function_editor_options.PNG';
import dispersion from './assets/images/dispersion.PNG';
import phases_add from './assets/images/phases_add.png';
import phases_graph from './assets/images/phases_graph.png';
import phases_params from './assets/images/phases_params.png';
import division_shift from './assets/images/division_shift.PNG';
import division_dispersion from './assets/images/division_dispersion.png';
import initialization_file from './assets/images/initialization_file.png';

import stages_add from './assets/images/stages_add.png';
import stages from './assets/images/stages.png';
import stages_properties from './assets/images/stages_properties.PNG';
import stages_table from './assets/images/stages_table.PNG';
import protein_constants from './assets/images/protein_constants.PNG';
import protein_editor from './assets/images/protein_editor.png';
import protein_editor_mode1 from './assets/images/protein_editor_mode1.png';
import protein_editor_mode2 from './assets/images/protein_editor_mode2.png';
import protein_name from './assets/images/protein_name.png';
import protein_rates from './assets/images/protein_rates.png';
import protein_negative_values from './assets/images/protein_negative_values.png';
import protein_initial_values from './assets/images/protein_initial_values.png';
import protein_properties from './assets/images/protein_properties.png';
import regulation_properties from './assets/images/regulation_properties.png';

import protein_toolbar from './assets/images/protein_toolbar.png';
import edit_protein from './assets/images/edit_protein.png';
import cycles_parameters from './assets/images/cycles_parameters.PNG';
import cycles_all from './assets/images/cycles_all.PNG';

import global_all from './assets/images/global_all.PNG';
import stages_all from './assets/images/stages_all.PNG';
import potentials_all from './assets/images/potentials_all.png';
import proteins_all from './assets/images/proteins_all.PNG';
import protein_list from './assets/images/protein_list.PNG';
import protein_formula_top from './assets/images/protein_formula_top.PNG';
import protein_formula_bottom from './assets/images/protein_formula_bottom.PNG';

import { withStyles } from "@material-ui/core/styles";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },  
}));

const SectionHeading = withStyles({
  root: {
    color: "#6885C4"
  }
})(Typography);


/*
const styles = StyleSheet.create({
    baseText: {
      fontWeight: 'bold'
    },
    innerText: {
      color: 'red'
    }
  });
  */



function ManualContent(props) {

  function titulo0() {
    return (
      <div>

        <p class="bottom-three">
        <Typography variant="h4">
        Introduction
        </Typography>
        </p>         

        <SectionHeading paragraph variant="h5">
		    What is TiFoSi?
	      </SectionHeading>

        <div class="w3-code"> 
       <Typography paragraph align="left">
          <a href="https://osf.io/k8vtf/"><b>TiFoSi</b></a> (<i>Tissues: Forces and Signaling</i>) is a computational tool to simulate the cellular dynamics of planar epithelia. 
          TiFoSi allows to model feedbacks between cellular mechanics and gene expression (either in a deterministic or a stochastic way), 
          the interaction between different cell populations, the custom design of the cell cycle and cleavage properties, 
          the protein number partitioning upon cell division, and the modeling of cell communication (juxtacrine and paracrine signalling).
        </Typography>
        <Typography paragraph align="left">      
          The tissue simulation properties used by TiFoSi program are specified through a <i>configuration file</i>. 
          This online editor provides a visual and easy-to-use tool to read and generate configuration files, which can be used directly in the application.
        </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
		    Configuration Sections
	      </SectionHeading>

        <div class="w3-code">        
        <Typography paragraph align="left">
        There are five differenciated sections in a typical configuration file:
        </Typography>

        <Typography paragraph>
      <table class="center, w3-table-all"> 
      <tr>
      <td>GLOBAL</td>
      <td>Cell types, initial spatial organization of cells, and some additional data regarding the simulation</td>
      </tr>        
	  <tr>
      <td>STAGES</td>
      <td>Mechanical relaxation of the tissue, cell growth, and protein kinetics for each stage (simulations can be subdivided into different independent temporal stages) </td>
      </tr>
	  <tr>
      <td>POTENTIALS</td>
      <td>Constants defining the energy functional (potential) of the vertex model</td>
      </tr>
	  <tr>
      <td>CYCLES</td>
      <td>Cell cycle kinetics and cleavage orientation properties</td>
      </tr>
	  <tr>
      <td>PROTEINS</td>
      <td>Prescription of the protein kinetics and the initial concentration of species within cells</td>
      </tr>	  
      </table>	  
      </Typography>

      
      <Typography paragraph>
      <p/>       
        The properties of each section are accessed through the upper tabs from the web editor.
        </Typography>
        <Typography paragrap align="center">
        <img alt="" src={sections}/>
        </Typography>
        <Typography paragraph>
      <p/>       
        </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
		    Configuration files
	      </SectionHeading>       

        <div class="w3-code">
        <Typography paragraph align="left">
        The configuration file is generated by using this editor. The configuration files can be <b>loaded</b> in the editor in order to modify the values. 
        Also, the user can <b>save</b> the current configuration, at any moment, and generate a new configuration file.
        </Typography>

        <Typography paragraph align="center">
        <img alt="" src={loadsave}/>
        </Typography>
        
        <Typography paragraph align="left">    
        The generated configuration file (<i>config.xml</i>) is specified through the XML language, which follows the semantic logic of standard XML files.
        The file can be modified later manually by the user, if necessary. Please, refer to this <a href="https://osf.io/3g2t5/download">manual</a> for more details.
        </Typography>         
        </div>        

      </div>
    );
  }

  function titulo1() {
    return (
    <div>     

    <p class="bottom-three">
    <Typography variant="h4">
    Global Section
    </Typography>
    </p>
	
	<SectionHeading paragraph variant="h5">
		Overview
	</SectionHeading>
    <div class="w3-code">      
		<Typography paragraph>
			The <b>Global section</b> contains the most relevant parameters of the simulation, such as the cell types, the initial spatial organization of cells, and some additional data regarding the simulation. 	  
		</Typography>
		<Typography paragraph align="center">
			<img alt="" src={global_all} width="60%" height="60%"/>
		</Typography>
    </div>

    <SectionHeading paragraph variant="h5">
      Simulation Parameters
    </SectionHeading>
										
    <div class="w3-code">
	
      <Typography paragraph variant="h6" align="left">
		  Delta Time
      </Typography>
      <Typography paragraph align="left">
      Provides the value of the dimensionless <b>time step</b> used in the Euler algorithm for numerically integrating the dynamics of the tissue mechanics/growth and the protein kinetics.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={time_step}/>
      </Typography>
      <Typography paragraph align="left">
	  <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> Use the slider to select the appropiate time value, or write directly a value in the text box.</p>
	   </div>
      </Typography>

      <Typography paragraph variant="h6" align="left">
		  Allow T1C2 Transitions
      </Typography>

      <Typography paragraph align="left">
      Allows that <b>T1 transitions</b> at the tissue periphery can take place, meaning that the cell edges that form the tissue periphery can eventually disappear.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={transitions}/>
      </Typography>
   
      <Typography paragraph variant="h6" align="left">
		  Binomial distribution
      </Typography>
      <Typography paragraph align="left">
      Forces proteins to distribute among daughter cells following a <b>binomial distribution</b>.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={binomial}/>
      </Typography>

      <Typography paragraph variant="h6" align="left">
		  Initialization File
      </Typography>
      <Typography paragraph align="left">
      This option offers an alternative way to initialize the tissue, and start the simulation from this state using an <i>initialization file</i>. Press the pencil button (<EditIcon />) to load this file.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={initialization_file}/>
      </Typography>

      <Typography paragraph align="left">
	  <div class="w3-panel w3-warning">
      <p><strong>Note:</strong> If you use this option, you can not modify the grid size (background) or add new cell types.</p>
	   </div>
      </Typography>
	  	  
	   <Typography paragraph variant="h6" align="left">
		  Cell Types
      </Typography>
	  
      <Typography paragraph align="left">
      The different <b>cell types</b> involved in the simulations are defined in this list. Each cell type has a unique color that identifies it in other sections.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={celltypes}/>
      </Typography>
	  
	  <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> Click on the color box to change the cell type color.</p>
      </div>
      </Typography>
	  
      <Typography paragraph align="left">     
      Add new cell types using the add button <AddIcon/> and write their name. 
      To delete a cell type click on the trash button <DeleteIcon/> next to its name.
      </Typography>
    </div>
	
	<SectionHeading paragraph variant="h5">
      Background
    </SectionHeading>
	
	<div class="w3-code">
      <Typography paragraph align="left">
	  In order to set a spatial organization, you must define the initial size and the cell type that form the <b>background</b> of the tissue (and on which the rest of the cell types lie).
	  </Typography>
	  
	  <Typography paragraph align="left">
      The initial tissue size is composed by <i>X</i> x <i>Y</i> cells organized in an hexagonal lattice with X rows and Y columns.		</Typography>
	  	 
      <Typography paragraph align="center">
      <img alt="" src={background}/>
      </Typography>
	  
       <Typography paragraph align="left">
      Use the slider to select the appropriate size value in each dimension, or write directly a value in the text box. Additionally, you must specify the cell type acting as the background layer.
      </Typography>		 
    </div>

   
	<SectionHeading paragraph variant="h5">
		Regions
	</SectionHeading>
    <div class="w3-code">      
      <Typography paragraph align="left">
		The initial spatial organization of the different cell types is composed by square <b>regions</b> (laying over the background).
      </Typography>
	  
	  <Typography paragraph align="left">
		The underlying logic of the regions is similar to <i>layers</i> in graphics editing programs. All layers together determine the spatial pattern of the cell populations. But only the layers that were built on top of others are used to compose the final pattern in the overlayed positions.
      </Typography>
	  
	  <Typography paragraph align="left">
		Each region has the following properties:
      </Typography>
	  
	  <Typography paragraph align="left">
	  
	  <Typography paragraph>
      <table class="center, w3-table-all"> 
      <tr>
      <td>Select</td>
      <td>Allows to select a region (identified by an predefined number)</td>
      </tr>  
      <tr>
      <td>Cell Type</td>
      <td>The cell type that ocuppies the region</td>
      </tr>
	  <tr>
      <td>Init Position (X, Y)</td>
      <td>The coordinates of the bottom-left corner of the region</td>
      </tr>
	  <tr>
      <td>Number Cells (X, Y)</td>
      <td>The size of the region in number of cells</td>
      </tr>
      </table>	  
      </Typography>
     
      </Typography>	
	  
      <Typography paragraph align="center">
      <img alt="" src={squares}/>
      </Typography>

	  <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> Instead of editing the parameters of each region, you can use the spatial layout editor explained below.</p>
      </div>
      </Typography>	  
	  
    </div>
	
	
	<SectionHeading paragraph variant="h5">
		Cell type spatial layout editor
	</SectionHeading>
	
    <div class="w3-code">     
      <Typography paragraph align="left">
	  This <b>editor</b> is used to facilitate the spatial arrangement of the background and the cell types by means of a grid. This grid is represented by a hexagonal lattice with the <i>background</i> size, and a set of squares with the position and the size of the <i>regions</i>.
      </Typography>
	  <Typography paragraph align="left">
	  The colors used to represent the background and regions are the same as defined in their respectives subsections.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={canvas} width="50%" height="50%"/>
      </Typography>
      <Typography paragraph align="left">
      The toolbar on top of the grid support the following actions:
      </Typography>

	  <Typography paragraph>
      <table class="center, w3-table-all"> 
      <tr>
      <td>Brush Celltype</td>
      <td>Select the cell type of the new region when the <i>Draw</i> button <BrushIcon/> is selected</td>
      </tr>        
	  <tr>
      <td><ZoomInIcon/> &emsp; Zoom</td>
      <td>Magnify or reduce the drawing of the entire grid</td>
      </tr>
	  <tr>
      <td><PanToolIcon/> &emsp; Move</td>
      <td>Move the tissue graph</td>
      </tr>
	  <tr>
      <td><BrushIcon/> &emsp; Draw</td>
      <td>Draw a square region using the selected cell type</td>
      </tr>
	  <tr>
      <td><LayersClearIcon/> &emsp; Remove</td>
      <td>Remove a region</td>
      </tr>
	  <tr>
      <td><OpenWithIcon/> &emsp; Move region</td>
      <td>Move a region</td>
      </tr>
	  <tr>
      <td><SelectAllIcon/> &emsp; Scale region</td>
      <td>Scale a region</td>
      </tr>
      </table>	  
      </Typography>
	  
    </div>

    </div>
    );
  }

  function titulo2() {
    return (
      <div>
      
      <p class="bottom-three">
      <Typography variant="h4">
      Stages Section
      </Typography>
      </p>
	  
	  <SectionHeading paragraph variant="h5">
		Overview
	  </SectionHeading>
      <div class="w3-code">      
		<Typography paragraph>
			The <b>Stages section</b> defines the different temporal windows (stages) of the simulation, where
			<ul>
				<li>tissue dynamics</li>
				<li>cell growth</li>
				<li>protein regulation</li>
			</ul>  
			can be activated and/or deactivated independently. 	  
		</Typography>
		<Typography paragraph align="center">
			<img alt="" src={stages_all} width="60%" height="60%"/>
		</Typography>
      </div>
	  
	  <SectionHeading paragraph variant="h5">
		 Add or remove stages
	  </SectionHeading>
      <div class="w3-code">
      <Typography paragraph align="left">      
      You can create new stages or remove existing ones with the buttons <b>Add New Stage</b> <AddIcon/> or <b>Remove Stage</b> <RemoveIcon/>.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={stages_add}/>
      </Typography>

      <Typography paragraph align="left">
      Each stage is represented by a box, with an index inside it indicating the <i>order</i> in the temporal sequence of stages. The <i>duration</i> of each stage (relative to the rest) is represented by the width of the box.
      </Typography>

      <Typography paragraph align="center">
      <img alt="" src={stages}/>
      </Typography>

      <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> You can adjust the stage duration moving the vertical bar that separates two stages, or the dot along the slider.</p>
      </div>
      </Typography>
      </div>
	  
	  <SectionHeading paragraph variant="h5">
		 Stage configuration
	  </SectionHeading>
      <div class="w3-code">
      <Typography paragraph align="left">      
      When one stage is selected, you can enable/disable the <b>Mechanics</b> (tissue dynamics), the cell <b>Growth</b>, and/or the <b>Proteins</b> regulation by the check selector of each property.      
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={stages_properties}/>
      </Typography>

      <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> Select the previous/next stage using the lateral arrows, or directly clicking over the stage box in the temporal sequence.</p>
      </div>
      </Typography>

      <Typography paragraph align="left">
      The number of simulation blocks, <b>Frames</b>, and the number of time steps, <b>Intermediate</b>, establish the stage duration, <b>Time</b>, both together. <p/>
      However, you can only set the number of <i>Frames</i>, and the stage <i>Time</i> is calculated automatically. Also, you can input a desired stage duration, <b>Input Time</b>, and the <i>Intermediate</i> value is adjusted to obtain the required stage <i>Time</i>.
      </Typography>
      </div>
	  
	  <SectionHeading paragraph variant="h5">
		 Stages table
	  </SectionHeading>
      <div class="w3-code">
      <Typography paragraph align="left">      
      Finally, a summary table of the defined stages is shown. You can select any stage (row) to edit their parameters in the above subsection.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={stages_table}/>
      </Typography>      
      </div>	  

      </div>
    );
  }


  function titulo3() {
    return (
      <div>
	  
	  <p class="bottom-three">
        <Typography variant="h4">
        Proteins Section
        </Typography>
        </p>
        
        <SectionHeading paragraph variant="h5">
      	Overview
        </SectionHeading>
        <div class="w3-code">      
      	<Typography paragraph>
      		The <b>Proteins section</b> defines the protein kinetics (described by differential equations) and the initial concentration of species within cells.
      	</Typography>
      	<Typography paragraph align="center">
      		<img alt="" src={proteins_all} width="60%" height="60%"/>
      	</Typography>
        </div>

        <SectionHeading paragraph variant="h5">
        Dynamical equation constants
        </SectionHeading>
        <div class="w3-code">
        <Typography paragraph align="left">
        The <b>Constants</b> involved in the differential equations that account for the protein dynamics are defined in this table.
        Use the <b>Add</b> <AddIcon/> button to define new constants, and the <b>Remove</b> <RemoveIcon/> button to delete the selected constant.
        The name of the constants is arbitrary and the user can provide any alphanumeric string.
        </Typography>
        <Typography paragraph align="center">
        <img alt="" src={protein_constants}/>
        </Typography>
        <Typography paragraph align="left">
        The constants and their values are defined for each existing stage (from the <b>Stages</b> section). 
        If you want to have a <i>unique</i> set of constants (and values) for all stages, use the <b>All</b> checkbox.
        </Typography>      
        </div>

        <SectionHeading paragraph variant="h5">
      	Proteins editor: Visual mode
        </SectionHeading>
        <div class="w3-code">
        <Typography paragraph align="left">	
        The <b>Proteins</b> and their relations are defined through an editor. It allows to define the dynamics and the initial number of the proteins species.
        </Typography>
		<Typography paragraph align="left">	
        The editor has two modes, <b>Visual</b> and <b>Formula</b>. Both modes are equivalent, as explained below.
        </Typography>
		 <Typography paragraph align="center">
        <img alt="" src={protein_editor_mode1}/>
      </Typography>

      <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
        <p><strong>Note:</strong> If the protein equation was edited in the <i>Formula Mode</i> and its current equation can not be represented, the <i>Visual mode</i> will be unable.</p>
	    </div>
      </Typography>
				
		<Typography paragraph align="left">	
        This subsection is centered in the <b>Visual mode</b>. It allows you to graphically design a protein relationship scheme.
    </Typography>
		<Typography paragraph align="center">
        <img alt="" src={protein_editor}/>
    </Typography>   

    <Typography paragraph align="left">	
        Inside the editor, you can add new proteins and/or regulations between them. The proteins are represented by a rectangle with his name inside, and the regulations are represented by an arrow (from one protein to another protein or regulation).
    </Typography>

    <Typography paragraph align="center">
        <img alt="" src={protein_toolbar}/>
    </Typography>

		<Typography paragraph align="left">
		The toolbar on top of the grid supports the following actions:
		</Typography>		
		
		<Typography paragraph>
        <table class="center, w3-table-all"> 
        <tr>
        <td><NearMeIcon/></td>
        <td>Select a protein (or regulation) and drag it to move its position in the editor.</td>
        </tr>
	    <tr>
        <td class="w3-small">NEW PROTEIN</td>
        <td>Add a protein by select this option and clicking a position in the editor. The <i>Protein Properties</i> dialog (explained below) is shown at this moment.</td>
        </tr>
	    <tr>      
        <td class="w3-small">NEW POSITIVE REGULATION</td>
        <td>Add a positive regulation by selecting this option, clicking a protein in the editor, and dragging the <b class="w3-text-green"> green arrow </b>to another protein or regulation.</td>
        </tr>
	    <tr>
        <td class="w3-small">NEW NEGATIVE REGULATION</td>
        <td>Add a negative regulation by selecting this option, clicking a protein in the editor, and dragging the <b class="w3-text-red"> red arrow </b> to another protein or regulation.</td>
        </tr>
	    <tr>
        <td class="w3-small">REMOVE</td>
        <td>Delete a protein or regulation by selecting this option and clicking an object in the editor.</td>
        </tr>    
        </table>	  
        </Typography>

      <Typography paragraph align="left">
	    <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> You can draw <i>curved</i> regulations by clicking on the middle of one and dragging.</p>
	    </div>
      </Typography>

		</div>


    <SectionHeading paragraph variant="h5">
    Proteins Properties
    </SectionHeading>
    <div class="w3-code">		
		  <Typography paragraph align="left">
        When you add a protein, the <b>Edit protein</b> window is shown. It allows to configure all the properties related to the protein.        
		  </Typography>

      <Typography paragraph align="center">
      <img alt="" src={edit_protein} width="40%" height="40%"/>		    
      </Typography>

      <Typography paragraph align="left">
	    <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> You also can edit the protein properties later by double clicking the protein box in the editor.</p>
	    </div>
      </Typography>

      <Typography paragraph align="left">
      All the protein properties are explained below.
      </Typography>

      <Typography paragraph variant="h6" align="left">
		  Species Name
      </Typography>
      <Typography paragraph align="left">
      Set the protein name. This name is arbitraty and you can provide any alphanumerical string.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={protein_name}/>
      </Typography>

      <Typography paragraph variant="h6" align="left">
		  Degradation, Basal and Diffusion rates
      </Typography>
      <Typography paragraph align="left">
      These properties can be optionally activated and you can set a value or select a previously defined constant using the pencil button for each one of them. (<EditIcon />).
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={protein_rates}/>
      </Typography>

      <Typography paragraph align="left">
      When you enable some of these parameters and set a non-zero value, it is marked with a symbol in the editor. 
      In this example,  <i>Protein1</i> has a degradation expression, <i>Protein2</i> has a basal expression, and <i>Protein3</i> has a diffusion term:
      </Typography>

      <Typography paragraph align="center">
      <img alt="" src={protein_properties}/>
      </Typography>

      <Typography paragraph align="left">
      
      </Typography>

      <Typography paragraph variant="h6" align="left">
		  Negative values
      </Typography>
      <Typography paragraph align="left">
      This property allows negative values for the protein number throughout its growth.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={protein_negative_values}/>
      </Typography>

      <Typography paragraph variant="h6" align="left">
		  Initial values
      </Typography>
      <Typography paragraph align="left">
      These values define the initial concentration of each cell type. When you select a <b>cell type</b> (dropdown menu), you can specify:
      <ul>
				<li><b>Value</b>: The initial protein number.</li>
				<li><b>Stochastic</b>: Indicate if the protein number follows a normal distribution, or if this number is always the same.</li>
				<li><b>Dispersion</b>: Variability of the protein number, only if it follows a normal distribution.</li>
			</ul>        
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={protein_initial_values}/>
      </Typography>
    </div>

    <SectionHeading paragraph variant="h5">
    Regulation Properties
    </SectionHeading>
    <div class="w3-code">		
		  <Typography paragraph align="left">
        When you add a (positive or negative) regulation, the protein dynamics is described by a <i>Hill function</i>. 
        The plot and current parameters of this function are shown when you edit the regulation.
		  </Typography>

      <Typography paragraph align="center">
      <img alt="" src={regulation_properties} width="40%" height="40%"/>
      </Typography>

      <Typography paragraph align="left">
	    <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> You can edit the regulation properties by double clicking the regulation arrow in the editor.</p>
	    </div>
      </Typography>

      <Typography paragraph align="left">
      The regulation (Hill function) parameters are:
      <ul>
				<li><b>Amplitude (K)</b>: Final value of the function.</li>
				<li><b>Threshold</b>: Input value that makes the function value 0.5 with respect to its final value. </li>
				<li><b>Order (n)</b>: Function order which represents the value of the slope of the function.</li>
			</ul>        
      </Typography>
      <Typography paragraph align="left">
      These parameters can also be set by a previously defined constant using the pencil button (<EditIcon />).
      </Typography>
    </div>

    <SectionHeading paragraph variant="h5">
    Proteins editor: Formula mode
    </SectionHeading>
    <div class="w3-code">

      <Typography paragraph align="left">
        When you select the <b>Formula mode</b>, the dynamics equation obtained from the grahical representation (<b>Visual mode</b>) is shown.
      </Typography>

        <Typography paragraph align="center">
        <img alt="" src={protein_editor_mode2}/>
        </Typography>

      <Typography paragraph align="left">
        In the top, the protein dynamics <b>equation</b> is stated. You can edit this formula, like a <i>C-style</i> mathematical expression. When you finish editing, you must press the mark (<DoneIcon />).
      </Typography>

      <Typography paragraph align="center">
      		<img alt="" src={protein_formula_top}/>
      </Typography>

      <Typography paragraph align="left">
        For convenience, a set of pre-defined terms (cell properties, functions, protein names) is available to use in the equation. When you select one of them, it is added to the formula with the corresponding syntax.
      </Typography>     

        <Typography paragraph align="center">
      		<img alt="" src={protein_formula_bottom}/>
      	</Typography>
      <Typography paragraph align="left">
      In the case of <i>combined functions</i>, you must select the function to use first, and then select the protein to which it applies.
      </Typography>      
    </div>

		<SectionHeading paragraph variant="h5">
      	Protein List
        </SectionHeading>
        <div class="w3-code">      
      	<Typography paragraph>
      		The <b>Protein List</b> shows the formula of all the proteins kinematic equations defined. If you press a protein equation, the corresponding formula is stated in the top for editing.
      	</Typography>
      	<Typography paragraph align="center">
      		<img alt="" src={protein_list}/>
      	</Typography>
        <Typography paragraph>
      		Also, you can edit the protein properties (name, initial concentration, dispersion,...) using the <EditIcon/> icon, remove a defined protein (<DeleteIcon/> icon), or add a new protein (<AddIcon/> icon).
      	</Typography>
        </div>     		

      </div>
    );
  }

  function titulo4() {
    return (
      <div>
	  
	  <p class="bottom-three">
        <Typography variant="h4">
        Potentials Section
        </Typography>
        </p>
        
        <SectionHeading paragraph variant="h5">
      	Overview
        </SectionHeading>
        <div class="w3-code">      
      	<Typography paragraph>
      		The <b>Potentials section</b> defines the functional energy (potentials) of the vertex model.
      	</Typography>
      	<Typography paragraph align="center">
      		<img alt="" src={potentials_all} width="60%" height="60%"/>
      	</Typography>
        </div>		
      
      <SectionHeading paragraph variant="h5" align="left">
      Stage and Cell Type selection
      </SectionHeading>

      <div class="w3-code">      
      <Typography paragraph align="left">
      The potential parameters are defined for each existing stage (from the <b>Stages</b> section), and you can select the current stage in this toolbar.
      If you want to have the <i>same</i> parameter values for all stages, use the <b>All</b> checkbox.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={toolbar_potentials}/>
      </Typography>
      <Typography paragraph align="left">
      Additionally, the <b>Cell Type</b> involved in the current potential is selected in this toolbar. The color code for the cell types is the same as defined in <i>Global</i> section.
      </Typography>      
      </div>

      <SectionHeading paragraph variant="h5" align="left">
      Cell-cell line tension
      </SectionHeading>

      <div class="w3-code">
      <Typography paragraph align="left">
      The definition of these parameters involves couples of cells, via a particular edge that two cells are sharing. 
      The parameters are:
      </Typography>

      <Typography paragraph>
      <table class="center, w3-table-all"> 
      <tr>
      <td>LAMBDA (Λ)</td>
      <td>Prescribes the line tension or affinity between cells.</td>
      </tr>  
      <tr>
      <td>lambda (&lambda;)</td>
      <td>Stands for the inhomogeneities of the contractile tension between cells.</td>
      </tr>
      </table>
      </Typography>

      <Typography paragraph align="left">
      Note that there are as many values of these paremeters as possible combination couples between cell types can be defined.
      Moreover, there is a special cell type, <b>empty</b>, that accounts for the tissue surrounding environment.
      </Typography>

      <Typography paragraph align="center">
      <img alt="" src={two_cells}/>
      </Typography>

      <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> Use the mouse wheel or the up/down arrow keys to change the cell pair selected.</p>
      </div>

      <Typography paragraph align="left">
      It is possible to prescribe values of these parameters as a function, relative to time or other cell properties, using the pencil button (<EditIcon/>), as explained below in the <b>Function Editor</b> subsection.
      </Typography>

      </Typography>
      </div>

      <SectionHeading paragraph variant="h5" align="left">
      Other mechanical parameters
      </SectionHeading>

      <div class="w3-code">      

      <Typography paragraph align="left">
      There are other individual mechanical properties that only required to specify in single (selected) cell type:
      </Typography>

      <Typography paragraph>
      <table class="center, w3-table-all"> 
      <tr>
      <td>KAPPA (K)</td>
      <td>Value of (dimensionless) elastic constant, Young modulus, of a particular cell type.</td>
      </tr>  
      <tr>
      <td>GAMMA (Γ)</td>
      <td>Value of (dimensionless) global cortical tension.</td>
      </tr>
      <tr>
      <td>Force</td>
      <td>Additional, external, or active (dimensionless) force with components <i>x</i> and <i>y</i>.</td>
      </tr>
      </table>
      </Typography>
      
      <Typography paragraph align="center">
      <img alt="" src={one_cell}/>
      </Typography>

      <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> Use the mouse, by clicking and dragging, to define the orientation and the magnitude of the force applied to the cell type, or directly write its value in the text boxes. </p>
      </div>
      </Typography>

      <Typography paragraph align="left">
      It is possible to prescribe values of these parameters as a function, relative to time or other cell properties, using the pencil button (<EditIcon/>), as explained below in the <b>Function Editor</b> subsection.
      </Typography>

      </div>

      <SectionHeading paragraph variant="h5" align="left">
      Function Editor
      </SectionHeading>

      { titulo_function_editor() }

     </div>
    );
  }

  function titulo5() {
    return (
	<div>

	<p class="bottom-three">
      <Typography variant="h4">
      Cycles Section
      </Typography>
      </p>
	  
	  <SectionHeading paragraph variant="h5">
		Overview
	  </SectionHeading>
      <div class="w3-code">      
		<Typography paragraph>
			The <b>Cycles section</b> defines the cell cycle kinetics and cleavage orientarion properties.	  
		</Typography>
		<Typography paragraph align="center">
			<img alt="" src={cycles_all} width="60%" height="60%"/>
		</Typography>
      </div>
	
    <SectionHeading paragraph variant="h5">
		Stage and Cell Type selection
	  </SectionHeading>

      <div class="w3-code">      
      <Typography paragraph align="left">
      The top toolbar allows to select the <b>Stage</b> of the simulation for wich the cycle parameters defined below is applied. If the same dynamics applies to all the stages, use <b>All</b> checkbox to define only one set of parameters.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={toolbar_potentials}/>
      </Typography>
      <Typography paragraph align="left">
      Also, the <b>Cell Type</b> involved in the current cycle is selected in this toolbar. The color code for the cell types is the same as defined in <i>Global</i> section.
      </Typography>      
      </div>

      <SectionHeading paragraph variant="h5">
      Cell dispersion and growth speed
      </SectionHeading>

      <div class="w3-code">
      <Typography paragraph align="left">
      The <b>Dispersion</b> parameter establishes the value of epsilon that weights the amount of stochasticity in the duration of the cell cycle.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={dispersion}/>
      </Typography>
      <Typography paragraph align="left">
      The <b>Speed</b> parameter actually sets the putative duration of the cell cycle. 
      Note that the default value is 0, assuming that the apical area of particular cell type will not grow.
      <p/>
      This last parameter can be defined as function, depending on the amount of particular protein species, using the <i>Function Editor</i> (<EditIcon/>) as explained below.
      </Typography>
      </div>

      <SectionHeading paragraph variant="h5">
      Cleavage orientation
      </SectionHeading>

      <div class="w3-code">      
      <Typography paragraph align="left">
      The cell cleavage orientation is computed based on cell geometry and it is shown in the <b>Division Shift</b> graph. 
      This picture represents the putative division angle, <i>Shift Angle</i>, relative to the principal angle axis of the inertia tensor.      
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={division_shift}/>
      </Typography>

      <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> You can select the blue line and change the orientation of the shift angle.</p>
      </div>
      </Typography>

      <Typography paragraph align="left">
      The putative division angle is randomized using a Gaussian distribution around a <i>Dispersion</i> value, that can be truncated (bounded) to set a finite variability for the division angle using a <i>Limit</i> value.
      This Normal distribution is shown in the <b>Division Dispersion</b> graph, and the standard deviation can be modified using the slider input.      
      </Typography>

      <Typography paragraph align="center">
      <img alt="" src={division_dispersion}/>
      </Typography>

      <Typography paragraph align="left">
      <div class="w3-panel w3-warning">
      <p><strong>Hint:</strong> The dispersion limit can be changed by selecting a purple line or the green area in either of the two graphs.</p>
      </div>
      </Typography>
      
      <Typography paragraph align="left">
      Alternatively, you can directly set the <i>Division Shift</i>, <i>Dispersion</i> and <i>Limit</i> values using the three boxes between the two graphs.
      </Typography>

      <Typography paragraph align="center">
      <img alt="" src={cycles_parameters}/>
      </Typography>

      <Typography paragraph align="left">
      Please, note that although the maximum value of the <i>Division Dispersion</i> is 10 using the slider, it can be set with a higher value using the box.
      <p/>
      As in the case of <i>Speed value</i>, the parameter <i>Division Shift</i> can be a function of the protein by using the <i>Function Editor</i> (<EditIcon/>), as explained below.
      </Typography>
      </div>

      <SectionHeading paragraph variant="h5">
      Phases
      </SectionHeading>
      
      <div class="w3-code">      
      <Typography paragraph align="left">
      The average duration of the cell cycle is divided in as many portions as <b>phases</b> there are. 
      You can create new phases or remove existing ones with the <i>Add New Phase</i> <AddIcon/> or <i>Remove Phase</i> <RemoveIcon/> buttons.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={phases_add}/>
      </Typography>
      <Typography paragraph align="left">
      Each phase is represented by a graph, inside a box, with an <i>index</i> at the top following the sequence of phases.
      The <i>proportion</i> or duration of the phase with respect to the rest is indicated at the bottom by a percentage, and can be changed by moving the vertical bar that separates two phases.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={phases_graph}/>
      </Typography>
      <Typography paragraph>
      Within each phase, the <i>progression</i> of the preferred cell apical area is shown by a graph line.
      When a phase is selected, you can change the <i>initial</i> and <i>final values</i> of this progression by moving, up or down, the blue dots at the beginning or the end of the graph line.
      The maximum value of the ordinate axis in the graph can be changed by editing the lateral textbox.
      </Typography>
      <Typography paragraph align="center">
      <img alt="" src={phases_params}/>
      </Typography>
      <Typography paragraph>
      Alternatively, you can change the previous parameters (initial and final values of the preferred apical area and the proportion of the selected phase) editing their values using the bottom toolbar.
      Also, the <i>interpolation</i> parameter can be established in the same toolbar.
      </Typography>
      </div>

      <SectionHeading paragraph variant="h5">
      Function Editor
      </SectionHeading>

      { titulo_function_editor() }

     </div>
    );
  }


  function titulo_function_editor() {
    return (
      
      <div class="w3-code">
      
      <Typography paragraph align="left">
      The <b>Function Editor</b> allows to prescribe values of the parameters as a function of time or, among other cell properties, as a function of the amount of proteins within cells in order to implement feedback between signaling and biomechanics.
      </Typography>

      <Typography paragraph align="center">
      <img alt="" src={function_editor} width="50%" height="50%"/>
      </Typography>
     
      <Typography paragraph align="left">
      In the top, the formula equation is stated. You can edit this formula, like a C-style mathematical expression.
      <p/>
      This textbox allows to write the function as a equation that depends on several types of <i>variables</i> (whose names begin with %), that correspond to the properties of a specific cell type or its number of proteins.
      </Typography>

      <Typography paragraph align="center">
      <img alt="" src={function_editor_equation}/>
      </Typography>

      <Typography paragraph align="left">
      For convenience, a set of pre-defined terms (cell properties, functions, protein names) is available to use in the formula. When you select one of them, it is added to the formula with the corresponding syntax.
      </Typography>

      <Typography paragraph align="center">
      <img alt="" src={function_editor_options}/>
      </Typography>

      <Typography paragraph variant="h6" align="left">
      Cell type reference
      </Typography>

      <Typography paragraph align="left">
      First, you must decide the cell involved in the function component.
      </Typography>

      <Typography paragraph>
      <table class="center, w3-table-all"> 
      <tr>
      <td>C1</td>
      <td>Current selected cell type.</td>
      </tr>  
      <tr>
      <td>C2</td>
      <td>Cell type pair in combination with the selected cell type (C1), only if the property that you are editing depends on cell pairs.</td>
      </tr>
      <tr>
      <td>CP1</td>
      <td>Neighbouring cell types of C1.</td>
      </tr>
      <tr>
      <td>CP2</td>
      <td>Neighbouring cell types of C2.</td>
      </tr>
      </table>
      </Typography>

      <Typography paragraph variant="h6" align="left">
      Cell properties
      </Typography>

      <Typography paragraph align="left">
      Next, you can select the cell properties that you want to include in the formula. It is added like a variable (whose names begin with %), with the proper syntax.
      </Typography>

      <Typography paragraph>
      <table class="center, w3-table-all"> 
      <tr>
      <td>AREA</td>
      <td>Area of the cell.</td>
      </tr>
      <tr>
      <td>PERIMETER</td>
      <td>Perimeter of the cell.</td>
      </tr>
      <tr>
      <td>CELL TYPE</td>
      <td>The cell type.</td>
      </tr>
      <tr>
      <td>NEIGHBOURING CELLS</td>
      <td>The number of cell neighbours.</td>
      </tr>
      <tr>
      <td>N. CELL VERTEXES</td>
      <td>The number of cell vertexes.</td>
      </tr>
      <tr>
      <td>X, Y</td>
      <td>The location of the cell center (x, y coordinates).</td>
      </tr>
      </table>
      </Typography>

      <Typography paragraph variant="h6" align="left">
      Other Cell properties
      </Typography>

      <Typography paragraph align="left">
      There are other properties of cells, which are not included in the editor, but can be used in the formula adding the corresponding variable.
      </Typography>

      <Typography paragraph>
      <table class="center, w3-table-all"> 
      <tr>
      <td>%t</td>
      <td>Accounts for the value of the non-dimensional time.</td>
      </tr>  
      <tr>
      <td>%cedge</td>
      <td>Length of the edge that a cell pair shares.</td>
      </tr>
      </table>
      </Typography>

      <Typography paragraph variant="h6" align="left">
      Proteins
      </Typography>

      <Typography paragraph align="left">
      Finally, you can add the number of molecules of certain protein in cells C1 and C2, if any defined in the <b>Proteins</b> section, to the formula. It is added like a variable (whose names begin with %), with the proper syntax.
      </Typography>	  
     
      </div>
    )
  }

  function contact() {
    return (
      <div>

        <p class="bottom-three">
        <Typography variant="h4">
        About TiFoSi
        </Typography>
        </p>               

        <SectionHeading paragraph variant="h5">
        Website
        </SectionHeading>

        <div class="w3-code">          
        <Typography paragraph variant="h6" align="left">
        <i>TiFoSi: an Efficient Tool for Mechanobiology Simulations of Epithelia</i>      
        </Typography>        
        <Typography paragraph align="left">
        Oriol Canela-Xandri, Samira Anbari, Javier Buceta
        <p/>
        <i>Open Science Framework (OSF): </i>        
        <a href="https://osf.io/k8vtf"> https://osf.io/k8vtf </a>
        </Typography>

        <Typography paragraph variant="h6" align="left">
        Source Code
        </Typography>
        <Typography paragraph align="left">
        <a href="https://github.com/jbuceta/TiFoSi"> https://github.com/jbuceta/TiFoSi </a>
        </Typography>

        <Typography paragraph variant="h6" align="left">
        Manual
        </Typography>
        <Typography paragraph align="left">        
        <a href="https://osf.io/3g2t5/download"> https://osf.io/3g2t5/download </a>
        </Typography>       

        <Typography paragraph variant="h6" align="left">
        Online Editor
        </Typography>
        <Typography paragraph align="left">        
        <a href="https://lsymserver.uv.es/lsym/Tifosi"> https://lsymserver.uv.es/lsym/Tifosi </a>
        </Typography>  

        </div>

        <SectionHeading paragraph variant="h5">
        Project Publication
        </SectionHeading>        

        <div class="w3-code">          
        <Typography paragraph variant="h6" align="left">
        <i>TiFoSi: an Efficient Tool for Mechanobiology Simulations of Epithelia</i>      
        </Typography>        
        <Typography paragraph align="left">
        Oriol Canela-Xandri, Samira Anbari, Javier Buceta
        <p/>
        <i>Bioinformatics</i>, Volume 36, Issue 16, 15 August 2020, Pages 4525–4526
        <p/>
        <a href="https://doi.org/10.1093/bioinformatics/btaa592"> https://doi.org/10.1093/bioinformatics/btaa592 </a>
        </Typography>
        </div>        

     </div>
    );
  }

  let texto = titulo0();
  if (props.option === 1)
    texto = titulo1();
  else if (props.option === 2)
    texto = titulo2();
  else if (props.option === 3)
    texto = titulo3();
  else if (props.option === 4)
    texto = titulo4();
  else if (props.option === 5)
    texto = titulo5();
  else if (props.option === -1)
    texto = contact();

    return (      
      <React.Fragment>
      {texto}
      </React.Fragment>      
    );

  }


function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [option, setOption] = React.useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
          {['Introduction', 'Global', 'Stages', 'Proteins', 'Potentials', 'Cycles'].map((text, index) => (
          <ListItem button key={text} onClick={() => (setOption(index))}  style={{ textDecoration: 'none' }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['About'].map((text, index) => (
          <ListItem button key={text} onClick={() => (setOption(-1))}  style={{ textDecoration: 'none' }}>
            <ListItemText primary={text} />
            <List component="div" disablePadding>
        </List>


          </ListItem>
        ))}       

      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            TiFoSi Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div  />

        <ManualContent option={option}/>       

      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
