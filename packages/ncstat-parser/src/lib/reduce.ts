import { NcBlock } from "@/NcParser";

type ReducerFn = string[]["reduce"];

export function makeBlockReducer(
  blocks: NcBlock[]
): (callbackFn: ReducerFn) => string[] {
  const initial: string[] = [];

  return (reducer: ReducerFn) => blocks.reduce(reducer, initial);
}
