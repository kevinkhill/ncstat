"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tool = void 0;

var _Toolpath = require("./Toolpath");

class Tool {
  static create({ number, desc }) {
    return new Tool(number, desc);
  }

  constructor(number = 0, desc = "") {
    this.number = number;
    this.desc = desc;
    this.number = number;
    this.desc = desc;
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
