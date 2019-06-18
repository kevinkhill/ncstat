import _ from "lodash";
import { INcCodeDef } from "../types";
import { G_CODES as RAW_G_CODES } from "./gcodes";
import { M_CODES as RAW_M_CODES } from "./mcodes";

export enum Modals {
  RAPID = "G00",
  FEED = "G01",
  ABSOLUTE = "G90",
  INCREMENTAL = "G91"
}

export const G_CODES: {
  [K: string]: INcCodeDef;
} = {};

export const M_CODES: {
  [K: string]: INcCodeDef;
} = {};

export const CANNED_CYCLE = {
  RETRACT_CODES: ["G98", "G99"],
  START_CODES: ["G73", "G74", "G81", "G82", "G83", "G84", "G85", "G86", "G87"]
};

export const COMMANDS = {
  G: (n: number) => G_CODES[`G${n}`],
  M: (n: number) => M_CODES[`M${n}`]
};

_.forEach(RAW_G_CODES, (groupName, group) => {
  _.forEach(groupName, (command, gcode) => {
    G_CODES[gcode] = {
      COMMAND: command,
      GROUP: group
    };
  });
});

_.forEach(RAW_M_CODES, (command, mcode) => {
  M_CODES[mcode] = {
    COMMAND: command,
    GROUP: "MACHINE"
  };
});
