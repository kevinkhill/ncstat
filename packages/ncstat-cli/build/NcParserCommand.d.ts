import { Command } from "clipanion";
import { NcProgram } from "@ncstat/parser";
export declare class NcParserCommand extends Command {
    filepath: string;
    debug: boolean;
    execute(): Promise<void>;
    /**
     * Print the program to stdout, line by line.
     */
    writeOut(program: NcProgram): void;
}
//# sourceMappingURL=NcParserCommand.d.ts.map