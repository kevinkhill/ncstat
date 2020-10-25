"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lib = require("./lib");

Object.keys(_lib).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _lib[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _lib[key];
    }
  });
});

var _fanuc = require("./fanuc");

Object.keys(_fanuc).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fanuc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _fanuc[key];
    }
  });
});

var _gcodes = require("./gcodes");

Object.keys(_gcodes).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _gcodes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _gcodes[key];
    }
  });
});

var _mcodes = require("./mcodes");

Object.keys(_mcodes).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mcodes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _mcodes[key];
    }
  });
});

var _modals = require("./modals");

Object.keys(_modals).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _modals[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _modals[key];
    }
  });
});
