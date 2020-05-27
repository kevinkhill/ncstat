"use strict";

var _parser = require("@ncstat/parser");

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _writeOut = require("./writeOut");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

(async filepathArg => {
  const parser = new _parser.NcParser({
    debug: true
  });
  parser.on("error", console.error.bind(void 0));

  const filepath = _path.default.resolve(filepathArg);

  const contents = await _fs.default.promises.readFile(
    filepath,
    "utf8"
  );
  const program = parser.parse(contents);
  (0, _writeOut.writeOut)(program);
})(process.argv.slice(3).pop());
