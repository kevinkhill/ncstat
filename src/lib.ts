export function zeroPadAddress(val: string): string {
  return val ? val[0] + `00${val.slice(1)}`.slice(-2) : "";
}

// tslint:disable-next-line: ban-types
function extractorFactory(matcher: RegExp): Function {
  return (subject: string) => {
    if (matcher.test(subject)) {
      const match = subject.match(matcher);

      if (match) {
        return match[1].trim();
      }
    }

    return null;
  };
}

export const commentExtractor = extractorFactory(/\(\s?(.+)\s?\)/);

export const blockSkipExtractor = extractorFactory(/(^\/[0-9]?)/);
