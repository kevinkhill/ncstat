// import { forEach } from "lodash";

import { NcCodeDef } from "@/types";

// import { G_CODES as RAW_G_CODES } from "../NcSpec/gcodes";
// import { M_CODES as RAW_M_CODES } from "../NcSpec/mcodes";

export { Address } from "./Address";

export const G_CODES: {
  [K: string]: NcCodeDef;
} = {};

export const M_CODES: {
  [K: string]: NcCodeDef;
} = {};

export const COMMANDS = {
  G: (n: number): NcCodeDef => G_CODES[`G${n}`],
  M: (n: number): NcCodeDef => M_CODES[`M${n}`]
};

// @TODO WTF is all this for, I dont even remember
// forEach(RAW_G_CODES, (groupName: any, group: any) => {
//   forEach(groupName, (command: any, gcode: string | number) => {
//     G_CODES[gcode] = {
//       COMMAND: command,
//       GROUP: group
//     };
//   });
// });

// forEach(RAW_M_CODES, (command: any, mcode: string | number) => {
//   M_CODES[mcode] = {
//     COMMAND: command,
//     GROUP: "MACHINE"
//   };
// });
