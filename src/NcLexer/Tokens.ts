export const Tokens = {
  // Match <PRG_DELIM> as "%", required for proper NC files
  PRG_DELIM: /%/,

  // Match <NEWLINE> as "\n" at end of a line
  NEWLINE: /\n/,

  // Match <BLOCK_SKIP> as "/"
  BLOCK_SKIP: /\/([0-9]?)/,

  // Match <COMMENT> as "(string)"
  COMMENT: /\(\s?(.+)\s?\)/,

  // Match <PRG_NUMBER> as "O1234", ":1234"
  PRG_NUMBER: /(?:O|:)([0-9]{4,5}?)/,

  // Match <G_CODE> as "G00", "G10", "G43"
  G_CODE: /(G[0-9]+(?:\\.[0-9]*)?)/,

  // Match <M_CODE> as "M00", "M6", "M107"
  M_CODE: /(M[0-9]+)/,

  // Match <FEEDRATE> as "F12.3"
  FEEDRATE: /(F[0-9]+(?:\\.[0-9]*)?)/,

  // Match <ADDRESS> as "A1", "B2.0"
  ADDRESS: /([A-FH-LN-P-Z][#-]*[0-9.]+)(?![^(]*\))/,

  // Ignore whitespace
  WHITESPACE: /[ \t]+/,

  // Ignore comments
  JS_STYLE_COMMENT: /\/\/[^\r\n]*\r?\n/
};
