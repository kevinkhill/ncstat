"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axes = require("./axes");

Object.keys(_axes).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _axes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _axes[key];
    }
  });
});

var _codes = require("./codes");

Object.keys(_codes).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _codes[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _codes[key];
    }
  });
});

var _configs = require("./configs");

Object.keys(_configs).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _configs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _configs[key];
    }
  });
});

var _machine = require("./machine");

Object.keys(_machine).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _machine[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _machine[key];
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

var _offsets = require("./offsets");

Object.keys(_offsets).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _offsets[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _offsets[key];
    }
  });
});

var _stats = require("./stats");

Object.keys(_stats).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _stats[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _stats[key];
    }
  });
});

var _tokens = require("./tokens");

Object.keys(_tokens).forEach(function(key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _tokens[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function() {
      return _tokens[key];
    }
  });
});
