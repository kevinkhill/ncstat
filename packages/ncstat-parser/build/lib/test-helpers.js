"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDemoFileContents = getDemoFileContents;
exports.parseSource = exports.parser = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _NcParser = require("@/NcParser");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const parser = new _NcParser.NcParser();
exports.parser = parser;

const parseSource = input => parser.parse(input);

exports.parseSource = parseSource;

function getDemoFileContents(filename) {
  const filepath = _path.default.join(
    __dirname,
    "..",
    "..",
    "demo",
    filename
  ); // eslint-disable-next-line no-sync

  return _fs.default.readFileSync(filepath, "utf8");
}
