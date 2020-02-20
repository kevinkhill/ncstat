"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFile = void 0;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const readFile = async filepath => {
  return (await _fs.default.promises.readFile(filepath)).toString();
};

exports.readFile = readFile;
