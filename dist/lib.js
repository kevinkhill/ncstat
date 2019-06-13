"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function zeroPadAddress(str) {
    return str ? str[0] + ("00" + str.slice(1)).slice(-2) : "";
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
