import { clone, each, get, has } from "lodash/fp";

import { HMC_AXES } from "../lib/constants";
import { Modals, PositioningMode } from "../NcParser/codes";
import { Block } from "../Toolpath";
import { MachinePositions } from "../types";

export function updatePosition(
  position: MachinePositions,
  positionType: PositioningMode,
  block: Block
): void {
  const blockPosition = block.getPosition();
  const newPosition = clone(position);

  newPosition.prev = position.curr;

  each(axis => {
    if (has(axis, blockPosition)) {
      const blockAxisPosition = get(axis, blockPosition);
      if (positionType === Modals.INCREMENTAL) {
        newPosition.curr[axis] += blockAxisPosition;
      }
      if (positionType === Modals.ABSOLUTE) {
        newPosition.curr[axis] = blockAxisPosition;
      }
    }
  }, HMC_AXES);
}
