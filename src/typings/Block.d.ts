// Type definitions for [~THE LIBRARY NAME~] [~OPTIONAL VERSION NUMBER~]
// Project: [~THE PROJECT NAME~]
// Definitions by: [~YOUR NAME~] <[~A URL FOR YOU~]>

/*~ This is the module template file for class modules.
 *~ You should rename it to index.d.ts and place it in a folder with the same name as the module.
 *~ For example, if you were writing a file for "super-greeter", this
 *~ file should be 'super-greeter/index.d.ts'
 */

// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('[~THE MODULE~]');
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import x from '[~THE MODULE~]';
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

export default Block

declare class Block {
  public rawLine: string;
  public comment: string;
  public blockSkip: string;
  public addresses: string[];

  public G00?: boolean;
  public G01?: boolean;
  public G04?: boolean;
  public G10?: boolean;
  public G65?: boolean;
  public G80?: boolean;

  public G90?: boolean;
  public G91?: boolean;

  public G98?: boolean;
  public G99?: boolean;

  public B?: number;
  public O?: number;
  public X?: number;
  public Y?: number;
  public Z?: number;

  constructor(line: any)
  public getPosition(): Position;
  public isStartOfCannedCycle(): boolean;
  public hasMovement(): boolean;
  public hasAddress(ltr: string): boolean;
  public getAddress(ltr: string, cast?: boolean);
  public getCannedCycleStartCode();
  public _mapAddressValuesToObj();
}
