// Type definitions for Finite State Machine 3.0
// Project: https://github.com/jakesgordon/javascript-state-machine
// Definitions by: Boris Yankov <https://github.com/borisyankov>,
// 					Maarten Docter <https://github.com/mdocter>,
// 					William Sears <https://github.com/MrBigDog2U>,
// 					samael <https://github.com/samael65535>,
// 					taoqf <https://github.com/taoqf>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "javascript-state-machine" {
  namespace StateMachine {
    export type ErrorCallback = (
      eventName?: string,
      from?: string,
      to?: string,
      args?: any[],
      errorCode?: number,
      errorMessage?: string,
      ex?: Error
    ) => void; // NB. errorCode? See: StateMachine.Error

    export type IsFinished = (state: string) => boolean;
    export type StateMachineEvent = (...args: any[]) => void;

    export const VERSION: string; // = "2.4.0"
    export const WILDCARD: string; // = '*'
    export const ASYNC: string; // = 'async'
    export const Result: {
      SUCCEEDED: number; // = 1, the event transitioned successfully from one state to another
      NOTRANSITION: number; // = 2, the event was successfull but no state transition was necessary
      CANCELLED: number; // = 3, the event was cancelled by the caller in a beforeEvent callback
      PENDING: number; // = 4, the event is asynchronous and the caller is in control of when the transition occurs
    };

    export const Error: {
      INVALID_TRANSITION: number; // = 100, caller tried to fire an event that was innapropriate in the current state
      PENDING_TRANSITION: number; // = 200, caller tried to fire an event while an async transition was still pending
      INVALID_CALLBACK: number; // = 300, caller provided callback function threw an exception
    };

    export function create(
      config: StateMachine.Config,
      target?: StateMachine
    ): StateMachine;

    export interface Transition {
      (): void;
      cancel(): void;
    }

    export interface EventDef {
      name: string;
      from: any; // string or string[]
      to: string;
    }

    export interface Config {
      init?: any; // string or { state: 'foo', event: 'setup', defer: true|false }
      data?: object | Function; // New in v3
      methods?: any | { [K: string]: Function }; // New in v3
      events?: StateMachine.EventDef[];
      callbacks?: {
        [s: string]: (
          event?: string,
          from?: string,
          to?: string,
          ...args: any[]
        ) => any;
      };
      transitions?: any;
      target?: StateMachine;
      error?: ErrorCallback;
    }
  }

  class StateMachine {
    public current: string;
    public is: (state: string) => boolean;
    public can: (evt: string) => boolean;
    public cannot: (evt: string) => boolean;
    public error: StateMachine.ErrorCallback;
    public isFinished: StateMachine.IsFinished;
    /*  transition - only available when performing async state transitions; otherwise null. Can be a:
  	[1] fsm.transition(); // called from async callback
  	[2] fsm.transition.cancel();
  */
    public transition: StateMachine.Transition;
    public transitions: () => string[];
    constructor(config: StateMachine.Config);
  }

  export = StateMachine;
}
