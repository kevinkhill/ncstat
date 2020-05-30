import { NcBlock } from "@/NcBlock";
import { ActiveModals, Modals } from "@/types";

export function getModals(block: NcBlock): ActiveModals {
  const modals: ActiveModals = {
    [Modals.MOTION_CODES]: Modals.RAPID,
    [Modals.PLANE_SELECTION]: "G17",
    [Modals.POSITIONING_MODE]: Modals.ABSOLUTE
  };

  const textTokens = block.map(token => token.text);

  if (textTokens.includes(Modals.RAPID)) {
    modals[Modals.MOTION_CODES] = Modals.RAPID;
  }

  if (textTokens.includes(Modals.FEED)) {
    modals[Modals.MOTION_CODES] = Modals.FEED;
  }

  // if (textTokens.includes(Modals.ABSOLUTE)) {
  //   modals[Modals.PLANE_SELECTION] = "G17";
  // }

  if (textTokens.includes(Modals.ABSOLUTE)) {
    modals[Modals.POSITIONING_MODE] = Modals.ABSOLUTE;
  }

  if (textTokens.includes(Modals.INCREMENTAL)) {
    modals[Modals.POSITIONING_MODE] = Modals.INCREMENTAL;
  }

  return modals;
}
