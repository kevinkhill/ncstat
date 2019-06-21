import StateMachine from "javascript-state-machine";

export const AXES = ["B", "X", "Y", "Z"];

function zeroPos() {
  return { X: 0, Y: 0, Z: 0, B: 0 };
}

const transitions = [
  /* eslint-disable */
  { name: "cycle-start", from: ["idle", "paused"], to: "running" },
  { name: "feed-hold", from: "running", to: "paused" },
  { name: "cycle-complete", from: "running", to: "idle" }
  /* eslint-enable */
];

const data = {
  feedrate: 0,
  offsets: {
    G54: zeroPos(),
    G55: zeroPos(),
    G56: zeroPos(),
    G57: zeroPos(),
    G58: zeroPos(),
    G59: zeroPos()
  },
  position: {
    ...zeroPos(),
    prev: zeroPos()
  },
  spindle: {
    rpms: 0,
    state: ""
  }
};

const methods = {
  S(): number {
    return this.spindle.rpms;
  },
  F(): number {
    return this.feedrate;
  },
  onInit() {
    //
  },
  onCycleStart() {
    //
  },
  onFeedHold() {
    //
  },
  onCycleComplete() {
    //
  }
};

module.exports = new StateMachine({
  data,
  init: "idle",
  methods,
  transitions
});
