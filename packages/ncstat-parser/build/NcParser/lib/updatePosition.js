"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updatePosition = updatePosition;
exports.HMC_AXES = exports.VMC_AXES = void 0;

var _fp = require("lodash/fp");

var _codes = require("../codes");

const VMC_AXES = ["X", "Y", "Z"];
exports.VMC_AXES = VMC_AXES;
const HMC_AXES = [...VMC_AXES, "B"];
exports.HMC_AXES = HMC_AXES;

function updatePosition(position, positionType, block) {
  const blockPosition = block.getPosition();
  const newPosition = (0, _fp.clone)(position);
  newPosition.prev = position.curr;
  (0, _fp.each)(axis => {
    if ((0, _fp.has)(axis, blockPosition)) {
      const blockAxisPosition = (0, _fp.get)(axis, blockPosition);

      if (positionType === _codes.Modals.INCREMENTAL) {
        newPosition.curr[axis] += blockAxisPosition;
      }

      if (positionType === _codes.Modals.ABSOLUTE) {
        newPosition.curr[axis] = blockAxisPosition;
      }
    }
  }, HMC_AXES);
}
