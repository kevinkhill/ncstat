"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var StateMachine = require('javascript-state-machine');
exports.AXES = ['B', 'X', 'Y', 'Z'];
function zeroPos() {
    return { X: 0, Y: 0, Z: 0, B: 0 };
}
var transitions = [
    /* eslint-disable */
    { name: 'cycle-start', from: ['idle', 'paused'], to: 'running' },
    { name: 'feed-hold', from: 'running', to: 'paused' },
    { name: 'cycle-complete', from: 'running', to: 'idle' }
    /* eslint-enable */
];
var data = {
    offsets: {
        G54: zeroPos(),
        G55: zeroPos(),
        G56: zeroPos(),
        G57: zeroPos(),
        G58: zeroPos(),
        G59: zeroPos()
    },
    position: __assign({}, zeroPos(), { prev: zeroPos() }),
    spindle: {
        state: '',
        rpms: 0
    },
    feedrate: 0
};
var methods = {
    S: function () {
        return this.spindle.rpms;
    },
    F: function () {
        return this.feedrate;
    },
    onInit: function () {
        //
    },
    onCycleStart: function () {
        //
    },
    onFeedHold: function () {
        //
    },
    onCycleComplete: function () {
        //
    }
};
module.exports = new StateMachine({
    init: 'idle', transitions: transitions, data: data, methods: methods
});
