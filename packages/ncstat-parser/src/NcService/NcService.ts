import { interpret } from "xstate";

import { NcStateMachine } from "./NcStateMachine";

export const NcService = interpret(NcStateMachine);

export type NcServiceType = typeof NcService;
