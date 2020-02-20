import { interpret } from "xstate";

import { NcStateMachine } from "./NcStateMachine";

export const NcService = interpret(NcStateMachine);
