"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NcParser = void 0;
const fsm_1 = require("@xstate/fsm");
const emittery_1 = __importDefault(require("emittery"));
const fp_1 = require("lodash/fp");
const lib_1 = require("../lib");
const NcLexer_1 = require("../NcLexer");
const NcProgram_1 = require("../NcProgram");
const NcService_1 = require("../NcService");
const NcSpec_1 = require("../NcSpec");
const types_1 = require("../types");
const lib_2 = require("./lib");
const NcBlock_1 = require("./NcBlock");
const isIdle = fp_1.eq(NcService_1.NcStateMachine.config.states.IDLE);
const isToolpathing = fp_1.eq(NcService_1.NcStateMachine.config.states.TOOLPATHING);
const isInCannedCycle = fp_1.eq(NcService_1.NcStateMachine.config.states.IN_CANNED_CYCLE);
const debug = lib_1.makeDebugger("parser");
/**
 * NcParser Class
 */
class NcParser extends emittery_1.default.Typed {
    constructor(config) {
        super();
        this.config = NcParser.defaults;
        this.state = "IDLE";
        this.currBlock = null;
        this.prevBlock = null;
        this.currPosition = { X: 0, Y: 0, Z: 0, B: 0 };
        this.prevPosition = { X: 0, Y: 0, Z: 0, B: 0 };
        this.modals = {
            GROUP_01: NcSpec_1.Modals.RAPID,
            GROUP_02: NcSpec_1.Modals.XY,
            GROUP_03: NcSpec_1.Modals.ABSOLUTE,
            GROUP_05: "",
            GROUP_06: "",
            GROUP_07: "",
            GROUP_08: "",
            GROUP_10: "",
            GROUP_12: ""
        };
        this.config = Object.assign(Object.assign({}, this.config), config);
        // if (this.config.debug) {
        //   Debug.enable("ncstat:*");
        // }
        this.lexer = new NcLexer_1.NcLexer(this.config.lexerConfig);
        this.program = new NcProgram_1.NcProgram();
        this.currToolpath = new NcProgram_1.Toolpath();
        this.machine = fsm_1.interpret(NcService_1.NcStateMachine);
        // @TODO Bubble this event?
        // this.lexer.on("token", token => this.$emitToken(token));
        this.machine.subscribe((state) => {
            this.emit("stateChange", {
                prev: this.state,
                curr: state.value
            });
            debug.extend("state")(`%o => %o`, this.state, state.value);
            this.state = state.value;
        });
    }
    getLexer() {
        return this.lexer;
    }
    parse(source) {
        var _a, _b, _c, _d;
        this.machine.start();
        for (const block of this.yieldBlocks(source)) {
            this.currBlock = block;
            debug.extend("block")(`%o tokens <%s>`, this.currBlock.length, this.currBlock);
            if (!fp_1.isEmpty(this.currBlock.modals)) {
                this.updateModals();
            }
            if (this.currBlock.M) {
                const addr = new lib_2.Mcode((_a = this.currBlock) === null || _a === void 0 ? void 0 : _a.M);
                this.emit("mCode", addr);
            }
            // Example: O2134 ( NAME )
            if (this.currBlock.O) {
                debug.extend("program")("Number: %o", this.currBlock.O);
                this.program.number = this.currBlock.O;
                if (this.currBlock.comment) {
                    this.setProgramName(this.currBlock.comment);
                }
            }
            // Example: ( NAME )
            if (((_b = this.prevBlock) === null || _b === void 0 ? void 0 : _b.O) === this.program.number &&
                this.program.name === null &&
                this.currBlock.comment) {
                this.setProgramName(this.currBlock.comment);
            }
            if (this.currBlock.$has("S")) {
                debug("[ ADDR] Spindle speed = %d", this.currBlock.S);
                this.currToolpath.setRpms(this.currBlock.S);
            }
            if (this.currBlock.$has("F")) {
                debug("[ ADDR] Feedrate = %d", this.currBlock.F);
            }
            if (this.currBlock.$has("R")) {
                debug("[ ADDR] Retract Plane: %d", this.currBlock.R);
            }
            if (this.currBlock.hasMovement) {
                this.updatePosition(this.currBlock.position);
            }
            if (this.currBlock.isStartOfCannedCycle &&
                isToolpathing(this.state)) {
                this.startCannedCycle();
            }
            if (isInCannedCycle(this.state)) {
                if (this.currBlock.gCodes.includes("G80")) {
                    // debug("[ STOP] End of canned cycle");
                    this.machine.send("END_CANNED_CYCLE");
                }
                if (this.currBlock.hasMovement) {
                    const point = fp_1.clone(this.currPosition);
                    const lastCC = fp_1.last(this.currToolpath.cannedCycles);
                    lastCC.addPoint(point);
                }
            }
            // Tracking toolpaths (tools) via Nxxx lines with a comment
            // This has been defined in the custom H&B posts
            if (this.currBlock.toString().startsWith("N")) {
                if (isToolpathing(this.state)) {
                    this.machine.send("END_TOOLPATH");
                    this.program.toolpaths.push(this.currToolpath);
                }
                if (isIdle(this.state)) {
                    this.machine.send("START_TOOLPATH");
                    this.currToolpath = new NcProgram_1.Toolpath();
                    const tool = NcProgram_1.Tool.create({
                        number: this.currBlock.N,
                        desc: this.currBlock.comment
                    });
                    this.currToolpath.setTool(tool);
                }
            }
            if (isToolpathing(this.state) || isInCannedCycle(this.state)) {
                if ([8, 50].includes(this.currBlock.M)) {
                    this.currToolpath.hasCoolant = true;
                }
                /**
                 * Override N line tool description with Txx Mxx ()
                 * Move the N line desc to this.currToolpath.desc
                 */
                if (this.currBlock.hasToolChange) {
                    if (this.currToolpath.tool) {
                        if (this.currBlock.T) {
                            this.currToolpath.tool.number = this.currBlock.T;
                        }
                        if (this.currBlock.comment) {
                            this.currToolpath.description = (_d = (_c = this.currToolpath) === null || _c === void 0 ? void 0 : _c.tool) === null || _d === void 0 ? void 0 : _d.desc;
                        }
                    }
                    this.currToolpath.addBlock(this.currBlock);
                }
            }
            this.emit("block", block);
            this.prevBlock = this.currBlock;
            this.program.appendBlock(this.currBlock);
        } // end-of-for
        this.machine.send("END_TOOLPATH");
        this.machine.stop();
        this.prevBlock = null;
        this.currBlock = null;
        this.program.toolpaths.push(this.currToolpath);
        return this.program;
    }
    *yieldBlocks(input) {
        let lineTokens = [];
        for (const token of this.lexer.tokenize(input)) {
            lineTokens.push(token);
            if (token.type === types_1.Tokens.NEWLINE) {
                yield NcBlock_1.NcBlock.create(lineTokens);
                lineTokens = [];
            }
        }
    }
    updateModals() {
        var _a, _b;
        this.modals = Object.assign(Object.assign({}, this.modals), (_a = this.currBlock) === null || _a === void 0 ? void 0 : _a.modals);
        debug.extend("modal")(`%o`, (_b = this.currBlock) === null || _b === void 0 ? void 0 : _b.modals);
    }
    setProgramName(name) {
        debug.extend("program")(`Name: %o`, name);
        this.program.name = name;
    }
    startCannedCycle() {
        this.machine.send("START_CANNED_CYCLE");
        const cannedCycle = NcProgram_1.CannedCycle.fromBlock(this.currBlock);
        debug.extend("canned-cycle")("%s %o", cannedCycle.definition.desc, cannedCycle.cycleCommand);
        this.currToolpath.addCannedCycle(cannedCycle);
    }
    updatePosition(newPosition) {
        const motionCode = this.modals.GROUP_03;
        this.prevPosition = fp_1.clone(this.currPosition);
        // Helper function to use the positioning modes as function names
        // for their operations in updating positions
        const move = {
            [NcSpec_1.Modals.ABSOLUTE]: (_from, to) => to,
            [NcSpec_1.Modals.INCREMENTAL]: (from, to) => from + to
        };
        /**
         * Iterate over each axis that has a value from the newPosition
         * using the positioning mode to either increment or set the value
         */
        for (const [axis, value] of Object.entries(newPosition)) {
            if (value) {
                this.currPosition[axis] = move[motionCode](this.currPosition[axis], value);
            }
        }
        const movement = {
            from: this.prevPosition,
            to: this.currPosition
        };
        this.emit("movement", movement);
        const debugMove = debug.extend("move");
        debugMove("%s", NcSpec_1.G_CODE_TABLE[motionCode].desc);
        debugMove("%o", movement.from);
        debugMove("%o", movement.to);
    }
}
exports.NcParser = NcParser;
NcParser.defaults = {
    debug: false,
    lexerConfig: NcLexer_1.NcLexer.defaults
};
//# sourceMappingURL=NcParser.js.map