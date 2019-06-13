export function zeroPadAddress(str: string): string {
  return str ? str[0] + `00${str.slice(1)}`.slice(-2) : "";
}

export function extractorFactory(matcher: RegExp): Function {
  return function(subject: string): string | null {
    if (matcher.test(subject)) {
      const match = subject.match(matcher);

      if (match) {
        return match[1].trim();
      }
    }

    return null;
  };
}

export const extractors = {
  commentExtractor: extractorFactory(/\(\s?(.+)\s?\)/),
  blockSkipExtractor: extractorFactory(/(^\/[0-9]?)/)
};
