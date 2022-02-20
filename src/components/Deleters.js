import { checkCellType } from "./Cycles/Cycles";
import { checkCellTypePotential } from "./Potentials/Potentials";

export function deleteCyclesOfStage(cycles, idStage) {
  if (cycles.length > 1) {
    cycles = cycles.filter((cycle) => cycle.$.stage !== (idStage + 1).toString());

    cycles.map((cycle) => {
      if (parseInt(cycle.$.stage) > parseInt(idStage + 1)) cycle.$.stage = (cycle.$.stage - 1).toString();
      return {};
    });
  }
  return cycles;
}

export function deletePotetialsOfStage(potentials, idStage) {
  if (potentials.length > 1) {
    potentials = potentials.filter((potential) => potential.$.stage !== (idStage + 1).toString());

    potentials.map((potential) => {
      if (parseInt(potential.$.stage) > parseInt(idStage + 1)) potential.$.stage = (potential.$.stage - 1).toString();
      return {};
    });
  }
  return potentials;
}

export function deleteConstantsOfStage(constants, idStage) {
  if(!Array.isArray(constants)) constants = [constants];
  if (constants.length > 1) {
    constants = constants.filter((constant) => constant.$.stage !== (idStage + 1).toString());

    constants.map((constant) => {
      if (parseInt(constant.$.stage) > parseInt(idStage + 1)) constant.$.stage = (constant.$.stage - 1).toString();
      return {};
    });
  }
  return constants;
}

export function deleteOrRenameCelltypeInCycles(cycles, celltype, newCellTypeName = "") {
   let newCycles = cycles.map( cycle => {
    checkCellType(cycle, celltype, newCellTypeName === "", newCellTypeName);
    return cycle;
    });
  return newCycles;
}


export function deleteOrRenameCelltypeInPotentials(potentials, celltype, global, newCellTypeName = "") {
  let newPotentials = potentials.map( potential => {
   checkCellTypePotential(potential, celltype, global, newCellTypeName === "", newCellTypeName);
   return potential;
   });
 return newPotentials;
}

export function deleteOrRenameCelltypeInProteins(proteins, celltype, newCellTypeName = "") {
  if (!Array.isArray(proteins.protein)) proteins.protein = [proteins.protein];
  for (let i = 0; i < proteins.protein.length; i++) {
    let iconcentration = proteins.protein[i].iconcentration;
    if (!Array.isArray(iconcentration)) iconcentration = [iconcentration];
    if (newCellTypeName === "") { // remove
      iconcentration = iconcentration.filter(element => element.$.t !== celltype);
      proteins.protein[i].iconcentration = iconcentration;
    }
    else // rename
      iconcentration.forEach(element => {
        if (element.$.t === celltype) element.$.t = newCellTypeName;
      });
  }
  return proteins;
}