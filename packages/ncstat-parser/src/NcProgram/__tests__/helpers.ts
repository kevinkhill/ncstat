import { NcParser } from "@/NcParser";
import { NcProgram } from "@/NcProgram";

export const parser = new NcParser();
export const parseSource = (input: string): NcProgram =>
  parser.parse(input);
