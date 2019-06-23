export function zeroPadAddress(val) {
    return val ? val[0] + ("00" + val.slice(1)).slice(-2) : "";
}
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
export var commentExtractor = extractorFactory(/\(\s?(.+)\s?\)/);
export var blockSkipExtractor = extractorFactory(/(^\/[0-9]?)/);
