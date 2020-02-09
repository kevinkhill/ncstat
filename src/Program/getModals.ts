import { Modals } from "../NcParser/codes";
import { Block } from "../Toolpath";
import { ActiveModals } from "../types";

export function getModals(block: Block): ActiveModals {
  const modals: ActiveModals = {
    [Modals.MOTION_CODES]: Modals.RAPID,
    [Modals.PLANE_SELECTION]: "G17",
    [Modals.POSITIONING_MODE]: Modals.ABSOLUTE
  };
  if (block.has(Modals.RAPID)) {
    modals[Modals.MOTION_CODES] = Modals.RAPID;
  }
  if (block.has(Modals.FEED)) {
    modals[Modals.MOTION_CODES] = Modals.FEED;
  }
  // if (block.has(Modals.ABSOLUTE)) {
  //   modals[Modals.PLANE_SELECTION] = "G17";
  // }
  if (block.has(Modals.ABSOLUTE)) {
    modals[Modals.POSITIONING_MODE] = Modals.ABSOLUTE;
  }
  if (block.has(Modals.INCREMENTAL)) {
    modals[Modals.POSITIONING_MODE] = Modals.INCREMENTAL;
  }
  return modals;
}
