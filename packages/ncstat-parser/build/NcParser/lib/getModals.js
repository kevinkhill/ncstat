"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModals = getModals;

var _codes = require("../codes");

function getModals(block) {
  const modals = {
    [_codes.Modals.MOTION_CODES]: _codes.Modals.RAPID,
    [_codes.Modals.PLANE_SELECTION]: "G17",
    [_codes.Modals.POSITIONING_MODE]: _codes.Modals.ABSOLUTE
  };
  const textTokens = block.map("text");

  if (textTokens.includes(_codes.Modals.RAPID)) {
    modals[_codes.Modals.MOTION_CODES] = _codes.Modals.RAPID;
  }

  if (textTokens.includes(_codes.Modals.FEED)) {
    modals[_codes.Modals.MOTION_CODES] = _codes.Modals.FEED;
  } // if (textTokens.includes(Modals.ABSOLUTE)) {
  //   modals[Modals.PLANE_SELECTION] = "G17";
  // }

  if (textTokens.includes(_codes.Modals.ABSOLUTE)) {
    modals[_codes.Modals.POSITIONING_MODE] = _codes.Modals.ABSOLUTE;
  }

  if (textTokens.includes(_codes.Modals.INCREMENTAL)) {
    modals[_codes.Modals.POSITIONING_MODE] = _codes.Modals.INCREMENTAL;
  }

  return modals;
}
