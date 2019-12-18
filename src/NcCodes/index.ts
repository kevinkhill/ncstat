import forEach from "lodash/forEach";

import { G_CODES as RAW_G_CODES } from "./gcodes";
import { M_CODES as RAW_M_CODES } from "./mcodes";

export interface NcCodeDef {
  COMMAND: string;
  GROUP: string;
}

export enum Modals {
  RAPID = "G00",
  FEED = "G01",
  ABSOLUTE = "G90",
  INCREMENTAL = "G91"
}

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

forEach(RAW_G_CODES, (groupName, group) => {
  forEach(groupName, (command, gcode) => {
    G_CODES[gcode] = {
      COMMAND: command,
      GROUP: group
    };
  });
});

forEach(RAW_M_CODES, (command, mcode) => {
  M_CODES[mcode] = {
    COMMAND: command,
    GROUP: "MACHINE"
  };
});
