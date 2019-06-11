import { forEach } from "lodash";
import { G_CODES as RAW_G_CODES } from "./gcodes";
import { M_CODES as RAW_M_CODES } from "./mcodes";

import { MODALS } from "./Modals";

export { MODALS };

export const G_CODES = {};
export const M_CODES = {};

export const CANNED_CYCLE_START_CODES = [
  "G73",
  "G74",
  "G81",
  "G82",
  "G83",
  "G84",
  "G85",
  "G86",
  "G87"
];

export const COMMANDS = {
  G: (n: number) => G_CODES[`G${n}`],
  M: (n: number) => M_CODES[`M${n}`]
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
