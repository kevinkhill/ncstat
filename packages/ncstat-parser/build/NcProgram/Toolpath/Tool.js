"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tool = void 0;

var _lib = require("@/lib");

var _Toolpath = require("./Toolpath");

const debug = (0, _lib.makeDebugger)("parser:tool");

class Tool {
  static create({ number, desc }) {
    return new Tool(number, desc);
  }

  constructor(number = 0, desc = "") {
    this.number = number;
    this.desc = desc;
    this.number = number;
    this.desc = desc;
    debug(this.toString());
  }

  getToolpath() {
    const toolpath = new _Toolpath.Toolpath();
    return toolpath.setTool(this);
  }

  getToolInfo() {
    return [this.number, this];
  }

  toString() {
    return `T${this.number} | ${this.desc}`;
  }
}

exports.Tool = Tool;
