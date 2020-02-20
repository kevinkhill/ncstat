"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NcParserCommand = void 0;

var _clipanion = require("clipanion");

var _parser = require("@ncstat/parser");

var _readFile = require("./readFile");

var _dec, _dec2, _dec3, _class, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(
  target,
  property,
  descriptor,
  context
) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer
      ? descriptor.initializer.call(context)
      : void 0
  });
}

function _applyDecoratedDescriptor(
  target,
  property,
  decorators,
  descriptor,
  context
) {
  var desc = {};
  Object.keys(descriptor).forEach(function(key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ("value" in desc || desc.initializer) {
    desc.writable = true;
  }
  desc = decorators
    .slice()
    .reverse()
    .reduce(function(desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer
      ? desc.initializer.call(context)
      : void 0;
    desc.initializer = undefined;
  }
  if (desc.initializer === void 0) {
    Object.defineProperty(target, property, desc);
    desc = null;
  }
  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error(
    "Decorating class property failed. Please ensure that " +
      "proposal-class-properties is enabled and runs after the decorators transform."
  );
}

let NcParserCommand =
  ((_dec = _clipanion.Command.String({
    required: true
  })),
  (_dec2 = _clipanion.Command.Boolean(`-d,--debug`)),
  (_dec3 = _clipanion.Command.Path(`parse`)),
  ((_class =
    ((_temp = class NcParserCommand extends _clipanion.Command {
      constructor(...args) {
        super(...args);

        _initializerDefineProperty(this, "filepath", _descriptor, this);

        _initializerDefineProperty(this, "debug", _descriptor2, this);
      }

      async execute() {
        const parser = new _parser.NcParser({
          debug: this.debug
        });
        parser.on("error", error => {
          this.context.stderr.write(error.toString());
        });
        const program = parser.parse(
          await (0, _readFile.readFile)(this.filepath)
        );
        this.writeOut(program);
      }
      /**
       * Print the program to stdout, line by line.
       */

      writeOut(program) {
        let blockCount = 1;
        program.forEach(block => {
          this.context.stdout.write(
            "N" + ("0000" + blockCount).slice(-4) + ": "
          );
          this.context.stdout.write(`${block.toString()}\n`);
          blockCount++;
        });
        this.context.stdout.write(
          `\n Parsed ${blockCount} lines of NC code.\n\n`
        );
      }
    }),
    _temp)),
  ((_descriptor = _applyDecoratedDescriptor(
    _class.prototype,
    "filepath",
    [_dec],
    {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: null
    }
  )),
  (_descriptor2 = _applyDecoratedDescriptor(
    _class.prototype,
    "debug",
    [_dec2],
    {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function() {
        return false;
      }
    }
  )),
  _applyDecoratedDescriptor(
    _class.prototype,
    "execute",
    [_dec3],
    Object.getOwnPropertyDescriptor(_class.prototype, "execute"),
    _class.prototype
  )),
  _class));
exports.NcParserCommand = NcParserCommand;
