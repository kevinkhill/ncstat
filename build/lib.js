"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function zeroPadAddress(val) {
    return val ? val[0] + ("00" + val.slice(1)).slice(-2) : "";
}
exports.zeroPadAddress = zeroPadAddress;
function extractorFactory(matcher) {
    return function (subject) {
        if (matcher.test(subject)) {
            var match = subject.match(matcher);
            if (match) {
                return match[1].trim();
            }
        }
        return null;
    };
}
exports.extractorFactory = extractorFactory;
exports.extractors = {
    commentExtractor: extractorFactory(/\(\s?(.+)\s?\)/),
    blockSkipExtractor: extractorFactory(/(^\/[0-9]?)/)
};
//# sourceMappingURL=lib.js.map