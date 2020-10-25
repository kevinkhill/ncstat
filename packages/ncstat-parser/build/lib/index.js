"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  zeroPadAddress: true,
  zeroPad: true,
  unwrap: true,
  debug: true,
  makeDebugger: true
};
exports.zeroPadAddress = zeroPadAddress;
exports.zeroPad = zeroPad;
exports.unwrap = unwrap;
exports.makeDebugger = exports.debug = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _guards = require("../../../ts-tokenizr/src/lib/guards");

var _guards2 = require("./guards");

Object.keys(_guards2).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _guards2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _guards2[key];
    }
  });
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * Pad a single digit address into a two digit
 *
 * @example zeroPadAddress("G1") // "G01"
 */
function zeroPadAddress(input) {
  return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}
/**
 * Pad a single digit number with zeros
 *
 * Defaults to 4 place because it just does for now
 *
 * @example zeroPad(1) // "1"
 */

function zeroPad(input) {
  return `0000${input}`.slice(-4);
}

function unwrap(str) {
  (0, _guards.assertIsString)(str);
  return str
    .replace("(", "")
    .replace(")", "")
    .trim();
}

const debug = (0, _debug.default)("ncstat"); // eslint-disable-next-line @typescript-eslint/explicit-function-return-type

exports.debug = debug;

const makeDebugger = namespace => debug.extend(namespace); // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const makeDebuggers = (namespaces: string[]) =>
//   namespaces.map(ns => ({ [ns]: debug.extend(ns) }));

exports.makeDebugger = makeDebugger;
