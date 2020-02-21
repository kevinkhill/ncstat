import { NcProgram } from "@ncstat/parser";
import { Command } from "clipanion";
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