import { BaseContext } from "clipanion";

export type MyContext = BaseContext & {
  cwd: string;
};
