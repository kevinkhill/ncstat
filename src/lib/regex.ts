import { map } from "lodash/fp";

export const BLOCK_SKIP_REGEX = /^\/([0-9]?)/;
export const COMMENT_REGEX = /\(\s?(.+)\s?\)/;
export const FEEDRATE_REGEX = /F([0-9]+(?:\\.[0-9]*)?)/g;
export const ADDRESS_REGEX = /([A-Z][#-]*[0-9.]+)(?![^(]*\))/g;

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
