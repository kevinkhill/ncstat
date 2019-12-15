export function zeroPadAddress(val: string): string {
  return val ? val[0] + `00${val.slice(1)}`.slice(-2) : "";
}

type Extractor = (subject: string) => string;

export function extractorFactory(matcher: RegExp): Extractor {
  return (subject: string): string => {
    const match = matcher.exec(subject);

    return match ? match[1].trim() : "";
  };
}

export const regexExtract = (matcher: RegExp, subject: string): string => {
  const match = matcher.exec(subject);

  return match ? match[1].trim() : "";
};
