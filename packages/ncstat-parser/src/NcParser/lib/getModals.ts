import { NcBlock } from "@/NcParser/NcBlock";
import { ActiveModals, Modals, Planes } from "@/types";

export function getModals(
  activeModals: ActiveModals,
  block: NcBlock
): ActiveModals {
  const textTokens = block.map(token => token.text);

  if (textTokens.includes(Modals.RAPID)) {
    activeModals[Modals.MOTION_CODES] = Modals.RAPID;
  }

  if (textTokens.includes(Modals.FEED)) {
    activeModals[Modals.MOTION_CODES] = Modals.FEED;
  }

  if (textTokens.includes(Planes.XY)) {
    activeModals[Modals.PLANE_SELECTION] = Planes.XY;
  }

  if (textTokens.includes(Planes.XZ)) {
    activeModals[Modals.PLANE_SELECTION] = Planes.XZ;
  }

  if (textTokens.includes(Planes.YZ)) {
    activeModals[Modals.PLANE_SELECTION] = Planes.YZ;
  }

  if (textTokens.includes(Modals.ABSOLUTE)) {
    activeModals[Modals.POSITIONING_MODE] = Modals.ABSOLUTE;
  }

  if (textTokens.includes(Modals.INCREMENTAL)) {
    activeModals[Modals.POSITIONING_MODE] = Modals.INCREMENTAL;
  }

  return activeModals;
}
