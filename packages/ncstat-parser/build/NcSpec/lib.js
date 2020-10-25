"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDefinition = getDefinition;
exports.defineGCode = defineGCode;
exports.defineMCode = defineMCode;
exports.stripPrefix = void 0;

var _Maybe = require("purify-ts/Maybe");

var _fanuc = require("./fanuc");

var _mcodes = require("./mcodes");

// import { forEach } from "lodash";
const stripPrefix = input => parseInt(input.substring(1));

exports.stripPrefix = stripPrefix;

function getDefinition(address) {
  const lookupFn = address.prefix === "M" ? defineMCode : defineGCode;
  return lookupFn(address.toString());
}
/**
 * Helper method for creating {@link CodeDefinition}s
 */

function define(desc, group) {
  if (group) {
    return {
      desc,
      group
    };
  }

  return {
    desc
  };
}
/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineGCode("G10")  // "PROGRAMMABLE_OFFSET_INPUT"
 * ```
 */

function defineGCode(input) {
  return _Maybe.Maybe.fromFalsy(_fanuc.G_CODE_TABLE[input]).orDefault(
    define("G_CODE_NOT_FOUND")
  );
}
/**
 * Return an M codes' definition
 *
 * @example ```
 *     defineMCode("M30") // "PROGRAM_END"
 * ```
 */

function defineMCode(input) {
  return _Maybe.Maybe.fromFalsy(_mcodes.M_CODE_TABLE[input]).orDefault(
    define("M_CODE_NOT_FOUND")
  );
}
