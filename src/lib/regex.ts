import { map } from "lodash/fp";

export function regexExtract(
  matcher: RegExp,
  subject: string
): string | undefined {
  const match = matcher.exec(subject);

  return match ? match[1].trim() : undefined;
}

export function regexMatch(matcher: RegExp, subject: string): string[] {
  const matches = subject.matchAll(matcher);

  return map(m => m[1], Array.from(matches));
}
