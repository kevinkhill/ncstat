import { Program } from './Program';
import { ProgramAnalysis, HmcAxis } from './types';
import { NcService, Events, States } from './NcService';
import { Block } from './Block';
import { eq, filter, map, clone, last, has, get } from 'lodash/fp';
import { Toolpath } from './Toolpath';
import { CannedCycle } from './CannedCycle';
import { HMC_AXES } from './lib';
import { Modals } from './NcCodes';


export function analyze(program:Program): ProgramAnalysis {
  const nc = NcService.start();

  const stateIs = eq(nc.state);

  let toolpath = new Toolpath();

  const lines = filter((l: string) => l.length > 0, program.getLines());

  const blocks = map(Block.parse, lines);

  for (const block of blocks) {
    this.setModals(block);

    if (block.hasAddress("O")) {
      this.number = block.values.O;
      this.title = block.comment;
    }

    if (block.hasMovement()) {
      this.updatePosition(block);
    }

    if (block.isStartOfCannedCycle && stateIs("toolpathing")) {
      nc.send(Events.START_CANNED_CYCLE);

      const cannedCycle = CannedCycle.fromBlock(block);

      toolpath.addCannedCycle(cannedCycle);
    }

    if (stateIs(States.IN_CANNED_CYCLE)) {
      if (block.G(80)) {
        nc.send(Events.END_CANNED_CYCLE);
      }

      if (block.hasMovement()) {
        const point = clone(this.position.curr);
        const lastCC = last(toolpath.cannedCycles) as CannedCycle;

        lastCC.addPoint(point);
      }
    }

    // Tracking toolpaths (tools) via Nxxx lines with a comment
    // This has been defined in the custom H&B posts
    if (block.rawInput.startsWith("N")) {
      if (stateIs("toolpathing")) {
        nc.send(Events.END_TOOLPATH);
        this.toolpaths.push(toolpath);
      }

      if (stateIs("idle")) {
        toolpath = Toolpath.fromBlock(block);

        nc.send(Events.START_TOOLPATH);
      }
    }

    // If we're toolpathing or in a canned cycle, save it to the toolpath
    if (stateIs("toolpathing") || stateIs("in-canned-cycle")) {
      toolpath.pushBlock(block);
    }
  }

  nc.send(Events.END_TOOLPATH);

  this.toolpaths.push(toolpath);

  return {
    toolpaths: this.toolpaths,
    extents: {
      X: { min: -Infinity, max: Infinity },
      Y: { min: -Infinity, max: Infinity },
      Z: { min: -Infinity, max: Infinity },
      B: { min: -Infinity, max: Infinity }
    }
  };
}

export function updatePosition(block: Block): void {
  const blockPosition = block.getPosition();

  this.position.prev = clone(this.position.curr);

  each(axis => {
    if (has(axis, blockPosition)) {
        const blockAxisPosition = get(axis, blockPosition);

        this.updateAxis(axis as HmcAxis, blockAxisPosition);
      }
    }, HMC_AXES);

    if(this.activeModals[Modals.INCREMENTAL]) {
      this.position.curr[axis] += value;
    }

    if (this.activeModals[Modals.ABSOLUTE]) {
      this.position.curr[axis] = value;
    }
  }

  /**
   * @TODO this looks gross
   */
export function setModals(block: Block): void {
  if(block.G(0)) {
  this.activeModals[Modals.RAPID] = true;
  this.activeModals[Modals.FEED] = false;
} else if (block.G(1)) {
  this.activeModals[Modals.FEED] = true;
  this.activeModals[Modals.RAPID] = false;
} else {
  throw Error("There was an error setting RAPID / FEED modal");
}

if (block.G(90)) {
  this.activeModals[Modals.ABSOLUTE] = true;
  this.activeModals[Modals.INCREMENTAL] = false;
} else if (block.G(91)) {
  this.activeModals[Modals.INCREMENTAL] = true;
  this.activeModals[Modals.ABSOLUTE] = false;
} else {
  throw Error("There was an error setting ABS / INC modal");
}
  }
}
