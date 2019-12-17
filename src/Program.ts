// import StateMachine from "javascript-state-machine";
// import { filter, get, last } from "lodash";
// import { clone, has, map } from "lodash/fp";
// import { Machine } from "xstate";

// import { Block } from "./Block";
// import { CannedCycle } from "./CannedCycle";
// import { Modals } from "./NcCodes";
// import { Tool } from "./Tool";
// import { Toolpath } from "./Toolpath";
// import { Position, ProgramStateMachine } from "./types";

// export class Program {
//   activeModals: {
//     [K: string]: boolean;
//   } = {};
//   number = 0;
//   title = "";
//   toolpaths: Toolpath[] = [];

//   // private prgExec: ProgramStateMachine;
//   private prgExec;
//   private position: {
//     curr: Position;
//     prev: Position;
//   };
//   private blocks: Block[] = [];

//   constructor(private readonly rawLines: string[]) {
//     this.position = {
//       curr: { X: 0, Y: 0, Z: 0, B: 0 },
//       prev: { X: 0, Y: 0, Z: 0, B: 0 }
//     };

//     this.prgExec = Machine({
//       id: "program",
//       initial: "idle",
//       context: {
//         //
//       },
//       states: {
//         idle: {
//           on: {
//             RESOLVE: "resolved",
//             REJECT: {
//               target: "rejected"
//             }
//           }
//         },
//         toolpathing: {
//           on: {
//             RESOLVE: "resolved",
//             REJECT: {
//               target: "rejected"
//             }
//           }
//         },
//         "in-canned-cycle": {
//           on: {
//             RESOLVE: "resolved",
//             REJECT: {
//               target: "rejected"
//             }
//           }
//         }
//       },
//       on: {
//         START_TOOLPATH: ".toolpathing",
//         END_TOOLPATH: ".idle",
//         START_CANNED_CYCLE: ".in-canned-cycle",
//         END_CANNED_CYCLE: ".toolpathing"
//       }
//     });
//   }

//   toString(): string {
//     return this.rawLines.join("\n");
//   }

//   getNumber(): number {
//     return this.number;
//   }

//   getTitle(): string {
//     return this.title;
//   }

//   getToolpathCount(): number {
//     return this.toolpaths.length;
//   }

//   getPosition(): Position {
//     return this.position.curr;
//   }

//   getPrevPosition(): Position {
//     return this.position.prev;
//   }

//   getToolPaths(): Toolpath[] {
//     return this.toolpaths;
//   }

//   getToolList(): [number, Tool][] {
//     const toolpathsWithTools = filter(this.toolpaths, t => t.hasTool);

//     return toolpathsWithTools.map(t => t.tool!.toTuple());
//   }

//   isActiveModal(valAddr: string): boolean {
//     return this.activeModals[valAddr];
//   }

//   analyze(): this {
//     let toolpath = new Toolpath();

//     for (const line of this.rawLines) {
//       if (line !== " ") {
//         const block = new Block(line);

//         this.blocks.push(block);

//         this.setModals(block);

//         if (block.hasAddress("O")) {
//           this.number = block.values.O;
//           this.title = block.getComment();
//         }

//         if (block.hasMovement()) {
//           this.updatePosition(block);
//         }

//         if (block.isStartOfCannedCycle() && this.prgExec.is("toolpathing")) {
//           this.prgExec.startCannedCycle();

//           const cannedCycle = new CannedCycle(block);

//           toolpath.addCannedCycle(cannedCycle);
//         }

//         if (this.prgExec.is("in-canned-cycle")) {
//           if (block.G(80)) {
//             this.prgExec.endCannedCycle();
//           }

//           if (block.hasMovement()) {
//             const point = clone(this.position.curr);
//             const lastCC = last(toolpath.cannedCycles) as CannedCycle;

//             lastCC.addPoint(point);
//           }
//         }

//         // Tracking toolpaths (tools) via Nxxx lines with a comment
//         // This has been defined in the custom H&B posts
//         if (line.startsWith("N")) {
//           if (this.prgExec.is("toolpathing")) {
//             this.prgExec.endToolpath();
//             this.toolpaths.push(toolpath);
//           }

//           if (this.prgExec.is("idle")) {
//             toolpath = Toolpath.fromBlock(block);

//             this.prgExec.startToolpath();
//           }
//         }

//         // If we're toolpathing or in a canned cycle, save it to the toolpath
//         if (
//           this.prgExec.is("toolpathing") ||
//           this.prgExec.is("in-canned-cycle")
//         ) {
//           toolpath.lines.push(line);
//         }
//       }
//     }

//     this.prgExec.endToolpath();
//     this.toolpaths.push(toolpath);
//     return this;
//   }

//   private updatePosition(block: Block): void {
//     const blockPosition = block.getPosition();
//     console.log(blockPosition);
//     this.position.prev = clone(this.position.curr);

//     map(axis => get(blockPosition, axis, null), ["X", "Y", "Z", "B"]);

//     ["B", "X", "Y", "Z"].forEach(axis => {
//       if (blockPosition[axis]) {
//         if (this.activeModals[Modals.INCREMENTAL]) {
//           this.position.curr[axis] += blockPosition[axis];
//         } else if (this.activeModals[Modals.ABSOLUTE]) {
//           this.position.curr[axis] = blockPosition[axis];
//         }
//       }
//     });
//   }

//   private setModals(block: Block): void {
//     if (block.G(0)) {
//       this.activeModals[Modals.RAPID] = true;
//       this.activeModals[Modals.FEED] = false;
//     } else if (block.G(1)) {
//       this.activeModals[Modals.FEED] = true;
//       this.activeModals[Modals.RAPID] = false;
//     }

//     if (block.G(90)) {
//       this.activeModals[Modals.ABSOLUTE] = true;
//       this.activeModals[Modals.INCREMENTAL] = false;
//     } else if (block.G(91)) {
//       this.activeModals[Modals.INCREMENTAL] = true;
//       this.activeModals[Modals.ABSOLUTE] = false;
//     }
//   }
// }
