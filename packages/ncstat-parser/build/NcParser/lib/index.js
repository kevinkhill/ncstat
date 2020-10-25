"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  parseNumber: true,
  splitParse: true
};
exports.parseNumber = parseNumber;
exports.splitParse = splitParse;

var _Address = require("./Address");

Object.keys(_Address).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Address[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _Address[key];
    }
  });
});

var _Mcode = require("./Mcode");

Object.keys(_Mcode).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Mcode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _Mcode[key];
    }
  });
});

var _offsets = require("./offsets");

Object.keys(_offsets).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _offsets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _offsets[key];
    }
  });
});

function parseNumber(numberStr) {
  return numberStr.includes(".")
    ? parseFloat(numberStr)
    : parseInt(numberStr);
}

function splitParse(address) {
  return {
    prefix: address.substring(0, 1),
    value: parseNumber(address.substring(1))
  };
}
