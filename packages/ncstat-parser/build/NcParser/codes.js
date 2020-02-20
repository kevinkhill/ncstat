"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Address", {
  enumerable: true,
  get: function() {
    return _Address.Address;
  }
});
exports.COMMANDS = exports.M_CODES = exports.G_CODES = exports.Modals = void 0;

var _lodash = require("lodash");

var _gcodes = require("./gcodes");

var _mcodes = require("./mcodes");

var _Address = require("./Address");

let Modals;
exports.Modals = Modals;

(function(Modals) {
  Modals["RAPID"] = "G00";
  Modals["FEED"] = "G01";
  Modals["ABSOLUTE"] = "G90";
  Modals["INCREMENTAL"] = "G91";
  Modals["NON_MODAL"] = "GROUP_00";
  Modals["MOTION_CODES"] = "GROUP_01";
  Modals["PLANE_SELECTION"] = "GROUP_02";
  Modals["POSITIONING_MODE"] = "GROUP_03";
})(Modals || (exports.Modals = Modals = {}));

const G_CODES = {};
exports.G_CODES = G_CODES;
const M_CODES = {};
exports.M_CODES = M_CODES;
const COMMANDS = {
  G: n => G_CODES[`G${n}`],
  M: n => M_CODES[`M${n}`]
}; //@TODO Fix This

exports.COMMANDS = COMMANDS;
(0, _lodash.forEach)(_gcodes.G_CODES, (groupName, group) => {
  (0, _lodash.forEach)(groupName, (command, gcode) => {
    G_CODES[gcode] = {
      COMMAND: command,
      GROUP: group
    };
  });
});
(0, _lodash.forEach)(_mcodes.M_CODES, (command, mcode) => {
  M_CODES[mcode] = {
    COMMAND: command,
    GROUP: "MACHINE"
  };
});
