import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player/file'
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
import ZoomOutMap from "@material-ui/icons/ZoomOutMap";
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
import celltypes from './assets/images/celltypes.png';
import background from './assets/images/background.png';
import squares from './assets/images/squares.png';
import sections from './assets/images/sections.PNG';
import loadsave from './assets/images/load_save.png';
import canvas from './assets/images/canvas.png';
import toolbar_potentials from './assets/images/toolbar_potentials.png';
import one_cell from './assets/images/one_cell.png';
import two_cells from './assets/images/two_cells.png';
import neighbors from './assets/images/neighbors.png';
import function_editor from './assets/images/function_editor.png';
import function_editor_equation from './assets/images/function_editor_equation.PNG';
import function_editor_options from './assets/images/function_editor_options.png';
import dispersion from './assets/images/dispersion.png';
import phases_add from './assets/images/phases_add.png';
import phases_graph from './assets/images/phases_graph.png';
import phases_parameters from './assets/images/phases_parameters.png';
import division_shift from './assets/images/division_shift.png';
import division_dispersion from './assets/images/division_dispersion.png';
import initialization_file from './assets/images/initialization_file.png';

import stages_add from './assets/images/stages_add.png';
import stages from './assets/images/stages.png';
import stages_properties from './assets/images/stages_properties.png';
import stages_table from './assets/images/stages_table.png';
import protein_constants from './assets/images/protein_constants.png';
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
import cycles_parameters from './assets/images/cycles_parameters.png';
import cycles_all from './assets/images/cycles_all.png';
import cycles_setup from './assets/images/cycles_setup.png';

import global_all from './assets/images/global_all.png';
import stages_all from './assets/images/stages_all.png';
import potentials_all from './assets/images/potentials_all.png';
import proteins_all from './assets/images/proteins_all.png';
import protein_list from './assets/images/protein_list.PNG';
import protein_formula_top from './assets/images/protein_formula_top.PNG';
import protein_formula_bottom from './assets/images/protein_formula_bottom.png';

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
          What is TiFoSi and what is ANISE?
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            <b>TiFoSi</b> (<i>Tissues: Forces and Signaling</i>) is a computational tool to simulate the cellular dynamics of planar epithelia.
            TiFoSi allows to model feedbacks between cellular mechanics and gene expression (either in a deterministic or a stochastic way),
            the interaction between different cell populations, the custom design of the cell cycle and cleavage properties,
            the protein number partitioning upon cell division, and the modeling of cellular communication (juxtacrine and paracrine signalling).
          </Typography>
          <Typography paragraph align="left">
            The tissue simulation properties used by TiFoSi program are specified through a <i>configuration file</i>. <b>ANISE</b> is a graphical editor that provides a visual and easy-to-use tool to generate and edit TiFoSi configuration files.
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Configuration sections
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            There are five sections in a typical TiFoSi configuration file:
          </Typography>

          <Typography paragraph>
            <table class="center, w3-table-all">
              <tr>
                <td>GLOBAL</td>
                <td>Cell types, initial spatial organization of cells, and some additional data regarding the simulation</td>
              </tr>
              <tr>
                <td>STAGES</td>
                <td>Tissue mechanics, cellular growth, and protein kinetics can be activated independently in different simulation stages with different simulation times and different number of output frames</td>
              </tr>
              <tr>
                <td>POTENTIALS</td>
            <td>Definition of the mechanical properties of cells</td>
              </tr>
              <tr>
                <td>CYCLES</td>
                <td>Cell cycle dynamics and cleavage orientation properties</td>
              </tr>
              <tr>
                <td>PROTEINS</td>
            <td>Protein kinetics (including the initial concentration of species within cells)</td>
              </tr>
            </table>
          </Typography>


          <Typography paragraph>
            <p />
            Each of those TiFoSi sections can be configured in ANISE through different tabs:
          </Typography>
          <Typography paragrap align="center">
            <img alt="" src={sections} width="40%" height="40%"/>
          </Typography>
          <Typography paragraph>
            <p />
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Configuration files
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            TiFoSi's XML configuration files can be loaded in ANISE for editing. Users can also define configuration files from scratch (the template that illustrates this manual is loaded by default). Users can either <b>load</b> or <b>save</b> configurations using the buttons (top right corner):
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={loadsave} />
          </Typography>

          <Typography paragraph align="left">
            Configuration files follow TiFoSi's XML rules. Please, refer to the TiFoSi <a href="https://osf.io/3g2t5/download">manual</a> for more details.
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
            The <b>Global section</b> contains some relevant parameters for the simulation (cell types, the initial spatial organization of cells,...).
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={global_all} width="80%" height="80%" />
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Parameters
        </SectionHeading>

        <div class="w3-code">

          <Typography paragraph variant="h6" align="left">
            Time step
          </Typography>
          <Typography paragraph align="left">
            Provides the value of the dimensionless <b>time step</b> used in the Euler algorithm to numerically integrate the dynamics of the tissue mechanics/growth and the protein kinetics.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={time_step} width="35%" height="35%"/>
          </Typography>
          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> Use the slider to select the appropiate time value, or write directly a value in the text box.</p>
            </div>
          </Typography>

          <Typography paragraph variant="h6" align="left">
            T1 at periphery
          </Typography>

          <Typography paragraph align="left">
            Allows <b>T1 transitions</b> at the tissue periphery, i.e., edges of the cell that form part of the tissue periphery can eventually disappear.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={transitions} width="35%" height="35%"/>
          </Typography>

          <Typography paragraph variant="h6" align="left">
            Protein binomial partition
          </Typography>
          <Typography paragraph align="left">
            Use this option to split proteins among daughter cells (after a division) following a <b>binomial distribution</b>.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={binomial} width="40%" height="40%"/>
          </Typography>

          <Typography paragraph variant="h6" align="left">
            Use initialization file
          </Typography>
          <Typography paragraph align="left">
            This option offers an alternative way to initialize the tissue by using an <i>initialization file</i>. Press the pencil button (<EditIcon />) to load this file.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={initialization_file} width="35%" height="35%"/>
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Note:</strong> If you use this option, you cannot modify the grid size (background) or add new cell types.</p>
            </div>
          </Typography>

          <Typography paragraph variant="h6" align="left">
            Cell types
          </Typography>

          <Typography paragraph align="left">
            The different <b>cell types</b> involved in the simulations are defined in this list. Each cell type has a unique color that identifies it in the other sections.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={celltypes} width="40%" height="40%" />
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> Click on the color box to change the cell type color.</p>
            </div>
          </Typography>

          <Typography paragraph align="left">
            Add new cell types using the add button <AddIcon /> and write their name.
            To delete a cell type click on the trash button <DeleteIcon /> next to its name.
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Background
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            In order to set a spatial organization of cells, you must define the initial size and the cell type that form the so-called tissue <b>background</b> (all other cell types are "painted" on top of this cell layer).
          </Typography>

          <Typography paragraph align="left">
            The initial tissue size is composed by <i>X</i> x <i>Y</i> cells organized in an hexagonal lattice with X rows and Y columns.		</Typography>

          <Typography paragraph align="center">
            <img alt="" src={background} width="35%" height="35%" />
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
            The initial spatial organization of the different cell types is composed by <b>regions</b> (laying over the background).
          </Typography>

          <Typography paragraph align="left">
            The underlying logic of the regions is similar to <i>layers</i> in graphics editing programs. All layers together determine the spatial pattern of cell populations.
	    We notice that the type of a cell corresponds to that of the top-most layer (i.e., the cell type is reassigned every time a cell is painted over).
          </Typography>

          <Typography paragraph align="left">
            Each region has the following properties:
          </Typography>

          <Typography paragraph align="left">

            <Typography paragraph>
              <table class="center, w3-table-all">
                <tr>
                  <td>Selected region</td>
                  <td>Region selected identified by an predefined number</td>
                </tr>
                <tr>
                  <td>Cell type</td>
                  <td>Cell type that ocuppies the region</td>
                </tr>
                <tr>
                  <td>Initial position (X, Y)</td>
                  <td>Coordinates of the bottom-left corner of the region</td>
                </tr>
                <tr>
                  <td>Number of cells (X, Y)</td>
            <td>Size of the region using units of number of cells</td>
                </tr>
              </table>
            </Typography>

          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={squares} width="30%" height="30%"/>
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
            This <b>editor</b> is used to facilitate the spatial arrangement of the background and the cell types by means of a grid. This grid is represented by a hexagonal lattice with the <i>background</i> size, and a set of <i>regions</i> with their positions and sizes.
          </Typography>
          <Typography paragraph align="left">
            The colors used to represent the background and regions are the same as defined in their respectives subsections.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={canvas} width="40%" height="40%" />
          </Typography>
          <Typography paragraph align="left">
            The toolbar on top of the grid support the following actions:
          </Typography>

          <Typography paragraph>
            <table class="center, w3-table-all">
              <tr>
                <td>Brush cell type</td>
                <td>Select the cell type of the new region when the <i>Draw</i> button <BrushIcon /> is selected</td>
              </tr>
              <tr>
                <td><ZoomInIcon /> &emsp; Zoom</td>
            <td>Magnify or reduce the drawing of the entire grid (this function is always accesible using the wheel of the mouse)</td>
            </tr>
	    <tr>
                <td><ZoomOutMap /> &emsp; Zoom all</td>
                <td>Automatic zoom to visualize the whole tissue</td>
              </tr>
              <tr>
                <td><PanToolIcon /> &emsp; Move</td>
                <td>Move the whole tissue</td>
              </tr>
              <tr>
                <td><BrushIcon /> &emsp; Draw</td>
                <td>Draw a square region using the selected cell type</td>
              </tr>
              <tr>
                <td><LayersClearIcon /> &emsp; Remove</td>
                <td>Remove a region</td>
              </tr>
              <tr>
                <td><OpenWithIcon /> &emsp; Move region</td>
                <td>Move a region</td>
              </tr>
              <tr>
                <td><SelectAllIcon /> &emsp; Scale region</td>
            <td>Scale a region (click and drag the top right corner)</td>
              </tr>
            </table>
          </Typography>
          
          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Note:</strong> Using the scrolling gesture in a trackpad will zoom the tissue. We note that the pinching gesture zooms both the image and the whole webpage.</p>
            </div>
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
            <img alt="" src={stages_all} width="60%" height="60%" />
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Add or remove stages
        </SectionHeading>
        <div class="w3-code">
          <Typography paragraph align="left">
            You can create new stages or remove existing ones with the buttons <b>Add New Stage</b> <AddIcon /> or <b>Remove Stage</b> <RemoveIcon />.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={stages_add} />
          </Typography>

          <Typography paragraph align="left">
            Each stage is represented by a box, with an index inside it indicating the <i>order</i> in the temporal sequence of stages. The <i>duration</i> of each stage (relative to the rest) is represented by the width of the box.
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={stages} width="45%" height="45%" />
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
            <img alt="" src={stages_properties} width="30%" height="30%" />
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> Select the previous/next stage using the lateral arrows, or directly clicking over the stage box in the temporal sequence.</p>
            </div>
          </Typography>

            <Typography paragraph align="left">
	    The duration of a particular stage is determine by the number of <b>frames</b> and the <b>input time</b> (dimensionless units). Using that information the number of time steps between frames (<b>Intermediate</b>) and
	the <i>actual</i> duration of the stage (<b>Time</b>) are determined. 
          </Typography>
          
          <Typography paragraph align="left">
	    To note that <b>Growth</b> always requires <b>Mechanics</b> to be active for getting a meaningful simulation. However, <b>Mechanics</b> does not necessarily require <b>Growth</b> to be active. 
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Stages table
        </SectionHeading>
        <div class="w3-code">
          <Typography paragraph align="left">
            Finally, a summary table of the defined stages is shown. You can select by clicking any stage (row) to edit its parameters.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={stages_table} width="70%" height="70%" />
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
            <img alt="" src={proteins_all} width="90%" height="90%" />
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Video demo
        </SectionHeading>
        <div class="w3-code">
          <ReactPlayer
            url={process.env.PUBLIC_URL + "/proteinsVideo.mp4"}
            width='100%'
            height='100%'
            controls
          />
        </div>

        <SectionHeading paragraph variant="h5">
          Dynamical equation constants
        </SectionHeading>
        <div class="w3-code">
          <Typography paragraph align="left">
            The <b>Constants</b> involved in the differential equations that account for the protein dynamics are defined in this table.
            Use the <b>Add</b> <AddIcon /> button to define new constants, and the <b>Remove</b> <RemoveIcon /> button to delete the selected constant.
            The name of the constants is arbitrary and the user can provide "any" alphanumeric string  (use the common sense!, e.g. do not use spaces or special characters).
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={protein_constants} width="25%" height="25%" />
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
            The <b>Proteins</b> and their relationships (interactions) are defined through an editor. It allows to define the dynamics and the initial number of the proteins species.
          </Typography>
          <Typography paragraph align="left">
            The editor has two working modes: <b>Visual</b> and <b>Formula</b>. 
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={protein_editor_mode1} />
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Note:</strong> If you want to start using <i>Visual mode</i> then delete all the proteins in the <b>Protein List</b>. Indeed, if the protein equation is edited in the <i>Formula Mode</i> and its current equation can not be represented, the <i>Visual mode</i> cannot be used. This is the case for the default equations.</p>
            </div>
          </Typography>

          <Typography paragraph align="left">
            The <b>Visual mode</b> allows you to graphically design a protein relationship scheme.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={protein_editor} width="40%" height="40%"/>
          </Typography>

  <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
            <p><strong>Hint:</strong> Once a regulatory interaction is created for a particular protein (see below) you can edit the properties of the regulatory function by double clicking on the arrow. </p>
            </div>
          </Typography>


          <Typography paragraph align="left">
            Inside the editor, you can add new proteins and/or regulatory interactions between them. Proteins are represented by a rectangle with their names inside, and the regulatory interactions are represented by arrows (from protein to protein or from protein to regulatory interaction). A solid green arrow corresponds to a positive regulatory regulation (positive Hill function) and a red dashed arrow  with a dash head stands for a negative interation (inverse Hill function).
          </Typography>

	          <Typography paragraph align="center">
            <img alt="" src={protein_toolbar} width="50%" height="50%"/>
          </Typography>

          <Typography paragraph align="left">
            The toolbar on top of the grid supports the following actions:
          </Typography>

          <Typography paragraph>
            <table class="center, w3-table-all">
              <tr>
                <td><NearMeIcon /></td>
                <td>Select a protein (or regulation) and drag it to move its position in the editor.</td>
              </tr>
              <tr>
                <td class="w3-small">NEW PROTEIN</td>
                <td>Add a protein by selecting this option and clicking a position in the editor. The <i>Protein Properties</i> dialog (explained below) will then appear.</td>
              </tr>
              <tr>
                <td class="w3-small">NEW POSITIVE REGULATION</td>
            <td>Add a positive regulatory interaction by selecting this option: click a protein and drag the <b class="w3-text-green"> green arrow </b> to a protein or a regulation.</td>
              </tr>
              <tr>
                <td class="w3-small">NEW NEGATIVE REGULATION</td>
            <td>Add a negative regulatory interaction by selecting this option: click a protein and drag the <b class="w3-text-red"> red arrow </b>to  a protein or a regulation.</td>
              </tr>
              <tr>
                <td class="w3-small">REMOVE</td>
                <td>Delete either a protein or a regulation by selecting this option and clicking an object in the editor.</td>
              </tr>
            </table>
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
            <p><strong>Hint:</strong> You can draw <i>curved</i> regulations (e.g., loops) by clicking and dragging on the segment (or segments) that define a regulation. However, when you browse to another tab section, the arrows will take the minimum length and you will loose the visual organization.</p>
            </div>
          </Typography>

        </div>


        <SectionHeading paragraph variant="h5">
          Proteins properties
        </SectionHeading>
        <div class="w3-code">
          <Typography paragraph align="left">
            When you add a protein, the <b>Edit protein</b> window is shown. It allows to configure all the properties related to the protein.
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={edit_protein} width="40%" height="40%" />
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> This menu is always accesible by double clicking a protein box.</p>
            </div>
          </Typography>

          <Typography paragraph variant="h6" align="left">
            Species name
          </Typography>
          <Typography paragraph align="left">
            Set the protein name. This name is arbitrary and you can provide "any" alphanumerical string (use the common sense!, i.e., do not include spaces of special characters).
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={protein_name} />
          </Typography>

          <Typography paragraph variant="h6" align="left">
            Degradation, basal and diffusion rates
          </Typography>
          <Typography paragraph align="left">
            These properties can be optionally activated and you can set a value or select a previously defined constant using the pencil button for each one of them. (<EditIcon />).
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={protein_rates} width="40%" height="40%"/>
          </Typography>

          <Typography paragraph align="left">
            When you enable some of these parameters and set a non-zero value, it is marked with a symbol in the editor.
            In this example,  <i>Protein1</i> has a degradation expression, <i>Protein2</i> has a basal expression, and <i>Protein3</i> has a diffusion term:
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={protein_properties} />
          </Typography>

          <Typography paragraph align="left">

          </Typography>

          <Typography paragraph variant="h6" align="left">
            Negative values
          </Typography>
          <Typography paragraph align="left">
            This property allows negative values for the protein number throughout its growth. It can be used for example to prescribe a magnitude dynamics that can take negative values.
            </Typography>
          <Typography paragraph align="center">
            <img alt="" src={protein_negative_values} width="40%" height="40%"/>
          </Typography>
	              <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> Be sure that you understand the implications of activating this option! If not sure, do not activate it (see note [43] in the <i>TiFoSi</i> <a href="https://osf.io/3g2t5/download">manual</a>).</p>
            </div>
          </Typography>


	
          <Typography paragraph variant="h6" align="left">
            Initial values
          </Typography>
          <Typography paragraph align="left">
            These values define the initial number of a protein species for each cell type. When you select a <b>cell type</b> (dropdown menu), you can specify:
            <ul>
              <li><b>Value</b>: The initial protein number.</li>
            <li><b>Stochastic</b>: Indicate if the initial protein number is a constant for all cells of a given type or if, alternative, it is stochastically initialized (in that case <i>value</i> determines the mean of a normal distribution).</li>
            <li><b>Dispersion</b>: Variability (standard deviation of the normal distribution) of the protein number if stochastically initialized.</li>
            </ul>
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={protein_initial_values} width="40%" height="40%" />
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Regulation properties
        </SectionHeading>
        <div class="w3-code">
          <Typography paragraph align="left">
            Positive/negative regulatory interactions are described by means of <i>Hill functions</i>. When adding a regulatory element, 
            the plot and the parameters that define this function are shown.
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={regulation_properties} width="35%" height="35%" />
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> You can edit the properties of a regulatory element by double clicking its corresponding arrow.</p>
            </div>
          </Typography>

          <Typography paragraph align="left">
            The parameters that defining a regulatory element (Hill function) are:
            <ul>
            <li><b>Maximal production (k)</b>: Maximum value of the function (y-axis) that indicates the maximal production rate.</li>
              <li><b>Threshold</b>: Concentration that yields a half maximal production (value in the x-axis that makes the function value to be k/2). </li>
            <li><b>Exponent (n)</b>: Degree of cooperativity (this parameter regulates the stepness, i.e. the slope, of the function. If n>>1 then the regulatory interactions are Boolean-like).</li>
            </ul>
          </Typography>
          <Typography paragraph align="left">
            The parameter values can be set to one of the previously defined constants using the pencil button (<EditIcon />).
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
            <img alt="" src={protein_editor_mode2} />
          </Typography>

          <Typography paragraph align="left">
            In the top, the protein dynamics <b>equation</b> is stated. You can edit this formula, like a <i>C-style</i> mathematical expression. When you finish editing, you must press <DoneIcon /> to activate the changes.
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={protein_formula_top} width="50%" height="50%" />
          </Typography>

          <Typography paragraph align="left">
            For convenience, a set of pre-defined terms (cell properties, functions, protein names) is available to use in the equation. When you select one of them, it is added to the formula using the corresponding TiFoSi syntax (e.g., if the user selects the function <i>Juxtacrine</i>, then <i>Signal</i> will appear in the formula box).
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={protein_formula_bottom} width="50%" height="50%" />
          </Typography>
                    
          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> In the case of <i>Signaling functions</i>, the user must select the function to use first, and then select the protein to which it applies.</p>
            </div>
          </Typography>
          
        </div>

        <SectionHeading paragraph variant="h5">
          Protein list
        </SectionHeading>
        <div class="w3-code">
          <Typography paragraph>
            The <b>Protein List</b> shows the prescribed proteins o.d.e.'s. If you press a protein equation, the corresponding formula is stated in the top for editing.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={protein_list} width="50%" height="50%"/>
          </Typography>
          <Typography paragraph>
            Also, you can edit protein properties (name, initial concentration,...) using the <EditIcon /> icon, delete a protein (<DeleteIcon /> icon), or add a new protein (<AddIcon /> icon).
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
            The <b>Potentials section</b> defines the energy functional (potentials) of cells in the vertex model.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={potentials_all} width="80%" height="80%" />
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5" align="left">
          Stage and cell type selection
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            The potential parameters are defined for each existing stage (from the <b>Stages</b> section).
            If you want to have the <i>same</i> parameter values for all stages, use the <b>All</b> checkbox.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={toolbar_potentials} width="60%" height="60%"/>
          </Typography>
          <Typography paragraph align="left">
            Additionally, the <b>Cell Type</b> must be selected (color codes for cell types as defined in <i>Global</i> section).
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5" align="left">
          Cell-cell line tension
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            The definition of the following parameters relies on cell-cell interactions:
          </Typography>

          <Typography paragraph>
            <table class="center, w3-table-all">
              <tr>
                <td>LAMBDA (Λ)</td>
                <td>Line tension or affinity between cells</td>
              </tr>
              <tr>
                <td>lambda (&lambda;)</td>
                <td>Inhomogeneities (and non-linearities) of the contractile line tension between cells</td>
              </tr>
            </table>
          </Typography>

          <Typography paragraph align="left">
            Note that there are as many values of these parameters as possible pairs of cell types can be defined. Notice also that these parameters must be also defined to prescribe the interactions of cell types with the cell type, <b>empty</b>, that accounts for the tissue surrounding environment.
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={two_cells} width="25%" height="25%"/>
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> Use the mouse wheel (or the up/down arrow icons) to change the cell pair selected.</p>
            </div>

            <Typography paragraph align="left">
              It is possible to prescribe values of these parameters as a function, relative to time or other cell properties, using the pencil button (<EditIcon />), as explained below in the <b>Function Editor</b> subsection. Also, if no values are defined for a given cell-type pair then the parameter is set to zero automatically.
            </Typography>

          </Typography>
        </div>

        <SectionHeading paragraph variant="h5" align="left">
          Other mechanical parameters
        </SectionHeading>

        <div class="w3-code">

          <Typography paragraph align="left">
            Other mechanical properties relies on cell autonomous properties (i.e., on the type of the cell independently of their possible neighbors):
          </Typography>

          <Typography paragraph>
            <table class="center, w3-table-all">
              <tr>
                <td>KAPPA (K)</td>
                <td>Value of the elastic constant (proportional to the Young modulus) of a particular cell type</td>
              </tr>
              <tr>
                <td>GAMMA (Γ)</td>
                <td>Value of the cortical (i.e., contractile) tension parameter</td>
              </tr>
              <tr>
                <td>Force</td>
                <td>External, or active, value of a force with components <i>x</i> and <i>y</i> (i.e., Fx and Fy respectively)</td>
              </tr>
            </table>
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={one_cell} width="25%" height="25%"/>
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> Use the mouse, by clicking and dragging, to define the orientation and the magnitude of the force applied to the cell type. </p>
            </div>
          </Typography>

          <Typography paragraph align="left">
            It is possible to prescribe values of these parameters as a function, relative to time or other cell properties, using the pencil button (<EditIcon />), as explained below in the <b>Function Editor</b> subsection.
          </Typography>

        </div>

        <SectionHeading paragraph variant="h5" align="left">
          Function editor
        </SectionHeading>

        {titulo_function_editor()}

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
            The <b>Cycles section</b> defines the cell cycle kinetics and cleavage orientation properties.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={cycles_all} width="50%" height="50%" />
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Stage and cell type selection
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            The top toolbar allows to select the <b>Stage</b> of the simulation for which the cycle parameters defined below is applied. If the same dynamics apply to all the stages, use <b>All</b> checkbox to define only one set of parameters.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={toolbar_potentials} width="60%" height="60%"/>
          </Typography>
          <Typography paragraph align="left">
            Also, the <b>Cell Type</b> involved in the current cycle is selected in this toolbar. The color code for the cell types is the same as defined in <i>Global</i> section.
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Cell cycle parameters
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            The <b>Cell cycle</b> has three parameters. The <b>Variability</b> establishes the value of the stochasticity in the duration of the cell cycle. If that parameter is set to 1/0 then the cell cycle duration is purely deterministic/stochastic (see <a href="https://osf.io/3g2t5/download">manual</a> of TiFoSi for details). Use either the slider or the text box to set a value.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={dispersion} width="60%" height="60%"/>
          </Typography>
          <Typography paragraph align="left">
            The <b>Speed</b> parameter determines the progression velocity of the cell cycle and sets the average duration of the cell cycle (see <a href="https://osf.io/3g2t5/download">manual</a> of TiFoSi for details). This  parameter can be defined as function (e.g., depending on the amount of a particular protein species) using the <i>Function Editor</i> (<EditIcon />) as explained below.
          </Typography>
          <Typography paragraph align="left">
            The <b>Duration</b> sets the expected average cell cycle duration without any mechanical stresses.
          </Typography>
          
          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Note:</strong> <i>Speed</i> and <i>Duration</i> are dependent. If you choose a <i>Speed</i> value then the cycle <i>Duration</i> will be automatically computed. If you want to put a cycle <i>Duration</i> then the <i>Speed</i> value will be set. However, when the <i>Speed</i> depends on properties (e.g cell area), then the expected average cell cycle <i>Duration</i> is unknown.</p>
            </div>
          </Typography>
          
        </div>

        <SectionHeading paragraph variant="h5">
          Cleavage orientation
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            The cell cleavage orientation is computed based on cell geometry and it is shown in the <b>Division orientation</b> graph.
            This picture represents the putative division angle (blue line, <i>Division angle</i>), relative to one of the principal axis of the inertia tensor (shortest cell axis).
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={division_shift} width="25%" height="25%"/>
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> You can click and drag the blue line to change the orientation of the putative division angle. By clicking and dragging the purple line (or the saheded area) the limits of the Gaussian variability (see below) can be set.</p>
            </div>
          </Typography>

          <Typography paragraph align="left">
            The level of randomness of the putative division angle can be set using a Gaussian distribution with a given <i>Dispersion</i>. The width of the Gaussian can be further truncated (bounded) by setting bounds to the distribution (<i>Dispersion limit</i>).
            The normal distribution is shown in the <b>Division dispersion</b> graph (the standard deviation can be modified using the slider input).
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={division_dispersion} width="25%" height="25%"/>
          </Typography>

          <Typography paragraph align="left">
            <div class="w3-panel w3-warning">
              <p><strong>Hint:</strong> The dispersion limit can be changed by clicking and dragging one of the purple lines (or inside the shaded area of the distribution).</p>
            </div>
          </Typography>

          <Typography paragraph align="left">
            Alternatively, you can directly set the <i>Division angle</i>, <i>Angle dispersion</i>, and <i>Dispersion limit</i> values using the boxes.
          </Typography>

          <Typography paragraph align="center">
            <img alt="" src={cycles_parameters} width="12%" height="12%"/>
          </Typography>


          <Typography paragraph align="left">
            Please, note that although the maximum value of the <i>Angle dispersion</i> is 10 using the slider, it can be set with a higher value using the box. As in the case of <i>growth speed</i>, the <i>division angle</i> can be set as a function of cell variables by using the <i>Function Editor</i> (<EditIcon />) as explained below.
          </Typography>
        

        <Typography paragraph align="left">
          Moreover, you can set a preconfigured division mode (Hertwig, Anti-Hertwig and Random) using the following toolbar.
        </Typography>

        <Typography paragraph align="center">
          <img alt="" src={cycles_setup} width="80%" height="80%"/>
        </Typography>
        
        <Typography paragraph align="left">
          The <i>Hertwig</i> division mode means that the cleavage plane is perpendicular to the longest axis of the cell. The <i>Anti-Hertwig</i> division mode sets the cleavage orientation plane parallel to the longest cell axis. Finally, we can choose a random cleavage orientation using the preconfigured division mode <i>Random</i>. Note that by default Hertwig and Anti-Hertwig do not include any variablity (i.e., the angular dispersion is 0 by default in this preconfigured cases).
        </Typography>

	</div>

        <SectionHeading paragraph variant="h5">
          Phases
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph align="left">
            The cell cycle can be divided in different <b>phases</b> in terms of the dynamics of the cell apical area.
            New phases can be created or removed by using <i>Add New Phase</i> <AddIcon /> or <i>Remove Phase</i> <RemoveIcon /> buttons.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={phases_add} width="55%" height="55%"/>
          </Typography>
          <Typography paragraph align="left">
            A graph represents the sequence of the different phases and, hence, the putative dynamics of the cell apical area as a function of time during the cell cycle.
          <Typography paragraph align="center">
            <img alt="" src={phases_graph} width="70%" height="70%"/>
          </Typography>
Each phase is identified in the graph by means of an <i>index</i> and the phase that is currently active for editting is highlighted in blue (click inside the graph to select a phase). The <i>proportion</i> (percentage) used by the active phase with respect to the cell cycle duration is indicated, both, in the graph and below the graph in a text box. The phase proportion can be changed by moving (left or right) the vertical bar that separates two phases.
          </Typography>
          <Typography paragraph>
            In the graph, within each phase, the putative progression of cell apical area is shown by a line. The line indicates the prescribed linear behavior of the cell apical area connecting the <i>initial</i> and <i>final</i> values. Those values can be set either in their corresponding text boxes or by moving (up or down) the blue dots. Also, in the graph the maximum value of the vertical axis is automatically set, but it can be changed manually by editing the textbox of the vertical axis if needed.
          </Typography>
          <Typography paragraph align="center">
            <img alt="" src={phases_parameters} width="55%" height="55%"/>
          </Typography>

          <Typography paragraph>
            <table class="center, w3-table-all">
              <tr>
                <td>Initial</td>
                <td>Initial value of the preferred apical area in the selected (active) phase</td>
              </tr>
              <tr>
                <td>Final</td>
                <td>Final value of the preferred apical area in the selected (active) phase</td>
              </tr>
              <tr>
                <td>Threshold</td>
                <td>Indicates that the <i>actual</i> value of the apical cell area by the end of the selected (active) phase must reach at least the indicated percentage of the prescribed (putative) <i>final</i> value to progress to the next phase (1)</td>
              </tr>
              <tr>
                <td>Proportion</td>
                <td>Fraction (percentage) of the total cell cycle occupied by the selected (active) phase</td>
              </tr>
            </table>
          </Typography>

          <Typography paragraph>
            (1) For example, if <i>Threshold</i> = 0.85, it means that the actual area must reach an 85% of the target final value.
            We notice that in some cases it is necessary to lower this value “a lot” because the cell, depending on the mechanical parameters and the cellular environment, can be too “stiff” and, consequently, the cell cycle
            cannot progress otherwise.
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Function Editor
        </SectionHeading>

        {titulo_function_editor()}

      </div>

    );
  }


  function titulo_function_editor() {
    return (

      <div class="w3-code">

        <Typography paragraph align="left">
          The <b>Function Editor</b> allows to prescribe values of the parameters as a function of time or, among other cell properties, as a function of the amount of proteins within cells in order to implement feedbacks between signaling and biomechanics.
        </Typography>

        <Typography paragraph align="center">
          <img alt="" src={function_editor} width="60%" height="60%" />
        </Typography>

        <Typography paragraph align="left">
          In the top, the formula equation is stated. You can edit this formulausing a C-style mathematical expression.
          <p />
          This textbox allows to write the function as an equation that can depend on different <i>variables</i> (whose names begin with % following the TiFoSi rules and correspond to the properties of a specific cell type or proteins).
        </Typography>

        <Typography paragraph align="center">
          <img alt="" src={function_editor_equation} width="60%" height="60%"/>
        </Typography>

        <Typography paragraph align="left">
          For convenience, a set of pre-defined terms (cell properties, functions, protein names) is available to use in the formula. When you select one of them, it is added to the formula with the corresponding TiFoSi syntax.
        </Typography>

        <Typography paragraph align="center">
          <img alt="" src={function_editor_options} width="60%" height="60%"/>
        </Typography>

        <Typography paragraph variant="h6" align="left">
          Cellular environment
        </Typography>

        <Typography paragraph align="left">
          The variables that can be used in the formula panel can refer to a given cell and/or to its neighbors. Click on cells in the plot of the cellular environment to select.
        </Typography>

        <Typography paragraph>
          <table class="center, w3-table-all">
            <tr>
              <td>C1</td>
              <td>The cell itself</td>
            </tr>
            <tr>
              <td>C2</td>
              <td>Nearest neighbors of a cell (i.e., cells that share an edge with C1)</td>
            </tr>
            <tr>
              <td>CP1</td>
              <td>Cells that share a vertex with C1</td>
            </tr>
            <tr>
              <td>CP2</td>
              <td>Cells that share a vertex with C2</td>
            </tr>
          </table>
        </Typography>

 	<Typography paragraph align="center">
          <img alt="" src={neighbors} width="30%" height="30%"/>
        </Typography>

	<Typography paragraph align="left">
          The edge defined by the vertexes <i>i</i> and <i>j</i> is shared by the cells <i>C1</i> and <i>C2</i>. The vertexes are also shared by the cells <i>CP1</i> and <i>CP2</i>. Variables and parameters of those cells can be used to define functions. See <a href="https://osf.io/3g2t5/download">manual</a> of TiFoSi for more details.
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
              <td>Area of the cell</td>
            </tr>
            <tr>
              <td>PERIMETER</td>
              <td>Perimeter of the cell</td>
            </tr>
            <tr>
              <td>TYPE</td>
              <td>Cell type</td>
            </tr>
            <tr>
              <td style={{width:"220px"}}>NUMBER OF NEIGHBORS</td>
              <td>Number of cell neighbors</td>
            </tr>
            <tr>
              <td style={{width:"220px"}}>NUMBER OF VERTEXES</td>
              <td>Number of cell vertexes</td>
            </tr>
            <tr>
              <td>X, Y</td>
              <td>Location of the cell center (x, y coordinates)</td>
            </tr>
          </table>
        </Typography>

<Typography paragraph align="left">
          Note that the number of neighbors is equal to the number of vertixes unless for the cells in the periphery. 
        </Typography>

        <Typography paragraph variant="h6" align="left">
          Other Cell properties
        </Typography>

        <Typography paragraph align="left">
          As explained in the TiFoSi manual, other properties of cells (not included in the editor) can be used in formulas, e.g.,
        </Typography>

        <Typography paragraph>
          <table class="center, w3-table-all">
            <tr>
              <td>%t</td>
              <td>Value of the dimensionless time</td>
            </tr>
            <tr>
              <td>%cedge</td>
              <td>Length of the edge that a cell pair shares</td>
            </tr>
          </table>
        </Typography>

        <Typography paragraph variant="h6" align="left">
          Proteins
        </Typography>

        <Typography paragraph align="left">
          Finally, you can add a dependence on (the number of) a protein (of a given cell or its environment as explained above).
        </Typography>

      </div>
    )
  }

  function contact() {
    return (
      <div>

        <p class="bottom-three">
          <Typography variant="h4">
            About ANISE
          </Typography>
        </p>

        <SectionHeading paragraph variant="h5">
          Availability
        </SectionHeading>



        <div class="w3-code">
          <Typography paragraph variant="h6" align="left">
                     Source Code
          </Typography>
          <Typography paragraph align="left">
            <a href="http://github.com/lsym-uveg/anise"> http://github.com/lsym-uveg/anise </a>
          </Typography>
          <Typography paragraph variant="h6" align="left">
   Dedicated Server
          </Typography>
          <Typography paragraph align="left">
            <a href="http://lsymserver.uv.es/lsym/ANISE"> http://lsymserver.uv.es/lsym/ANISE </a>
          </Typography>
          <Typography paragraph variant="h6" align="left">
            <i>TiFoSi</i>
          </Typography>
          <Typography paragraph align="left">
            O. Canela-Xandri, S. Anbari, and J. Buceta
            <p />
            <i>Open Science Framework (OSF): </i>
            <a href="https://osf.io/k8vtf"> https://osf.io/k8vtf </a>
          </Typography>
        </div>

        <SectionHeading paragraph variant="h5">
          Cite ANISE
        </SectionHeading>

        <div class="w3-code">
          <Typography paragraph variant="h6" align="left">
            <i>ANISE: an Application to Design Mechanobiology Simulations of Planar Epithelia</i>
          </Typography>
          <Typography paragraph align="left">
            A. Rodríguez Cerro, S. Sancho, M. Rodríguez, M.A. Gamón, L. Guitou, R.J. Martínez, and J. Buceta
            <p />
            <i>Bioinformatics</i>, Volume XX, XXXX-YYYY, 202X
            <p />
            <a href="https://doi.org/10.1093/bioinformatics/XXX"> https://doi.org/10.1093/bioinformatics/XXX </a>
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
  const myRefScroll = React.useRef();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    myRefScroll.current.scrollIntoView({block: "start"});
  }, [option])

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Introduction', 'Global', 'Stages', 'Proteins', 'Potentials', 'Cycles'].map((text, index) => (
          <ListItem button key={text} onClick={() => (setOption(index))} style={{ textDecoration: 'none' }}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['About'].map((text, index) => (
          <ListItem button key={text} onClick={() => (setOption(-1))} style={{ textDecoration: 'none' }}>
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
    <div className={classes.root} ref={myRefScroll}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}  >
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
