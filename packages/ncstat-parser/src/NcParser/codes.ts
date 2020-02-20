import _ from "lodash";

import { G_CODES as RAW_G_CODES } from "./gcodes";
import { M_CODES as RAW_M_CODES } from "./mcodes";

export { Address } from "./Address";

export interface NcCodeDef {
  COMMAND: string;
  GROUP: string;
}

export type PositioningMode = "G90" | "G91";
export type PlaneSelection = "G17" | "G18" | "G19";

export type MOTION_CODES = "GROUP_01";
export type PLANE_SELECTION = "GROUP_02";
export type POSITIONING_MODE = "GROUP_03";

export enum Modals {
  RAPID = "G00",
  FEED = "G01",
  ABSOLUTE = "G90",
  INCREMENTAL = "G91",
  NON_MODAL = "GROUP_00",
  MOTION_CODES = "GROUP_01",
  PLANE_SELECTION = "GROUP_02",
  POSITIONING_MODE = "GROUP_03"
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

//@TODO Fix This
_.forEach(RAW_G_CODES, (groupName: any, group: any) => {
  _.forEach(groupName, (command: any, gcode: string | number) => {
    G_CODES[gcode] = {
      COMMAND: command,
      GROUP: group
    };
  });
});

_.forEach(RAW_M_CODES, (command: any, mcode: string | number) => {
  M_CODES[mcode] = {
    COMMAND: command,
    GROUP: "MACHINE"
  };
});
