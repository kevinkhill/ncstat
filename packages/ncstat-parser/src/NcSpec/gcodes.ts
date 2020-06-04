import { ModalCodeGroups } from "@/types";

// motion
const GROUP_01 = [
  "G00",
  "G01",
  "G02",
  "G03",
  "G80",
  "G81",
  "G82",
  "G84",
  "G85",
  "G86",
  "G87",
  "G88",
  "G89"
];

// plane selection – XY, YZ, ZX
const GROUP_02 = ["G17", "G18", "G19"];

// absolute / incremental mode
const GROUP_03 = ["G90", "G91"];

// feed rate mode
const GROUP_05 = ["G93", "G94"];

// units – inches / millimeters
const GROUP_06 = ["G20", "G21"];

// cutter radius compensation – CRC
const GROUP_07 = ["G40", "G41", "G42"];

// tool length offset – TLO
const GROUP_08 = ["G43", "G49"];

// (return mode in canned cycles
const GROUP_10 = ["G98", "G99"];

// (work coordinate system selection – WCSS
const GROUP_12 = ["G54", "G55", "G56", "G57", "G58", "G59"];

/**
 * Arrays of G codes, grouped by their respective GROUP_nn
 */
export const G_CODE = {
  GROUP_01,
  GROUP_02,
  GROUP_03,
  GROUP_05,
  GROUP_06,
  GROUP_07,
  GROUP_08,
  GROUP_10,
  GROUP_12
};

export function gCodeStrings (group: ModalCodeGroups): string[] {
  return G_CODE[group];
}

export function gCodeNumbers(group: ModalCodeGroups): number[] {
  return G_CODE[group].map(code => parseInt(code.substring(1)));
}
