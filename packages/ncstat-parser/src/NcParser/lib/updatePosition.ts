import { clone, each, get, has } from "lodash/fp";

import { NcBlock } from "@/NcParser/NcBlock";
import { MachinePositions, Modals, PositioningMode } from "@/types";

export const VMC_AXES = ["X", "Y", "Z"];
export const HMC_AXES = [...VMC_AXES, "B"];

export function updatePosition(
  position: MachinePositions,
  positionType: PositioningMode,
  block: NcBlock
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
