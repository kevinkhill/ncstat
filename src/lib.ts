export function zeroPadAddress(val: string): string {
  return val ? val[0] + `00${val.slice(1)}`.slice(-2) : "";
}

export function extractorFactory(
  matcher: RegExp
): (subject: string) => string | undefined {
  return subject => {
    if (matcher.test(subject)) {
      const match = matcher.exec(subject);

      if (match) {
        return match[1].trim();
      }
    }
  };
}
