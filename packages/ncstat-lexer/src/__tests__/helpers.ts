/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { get } from "lodash/fp";

import { NcToken } from "../NcLexer";

export function testProp(
  token: NcToken,
  prop: string,
  value: string | number
) {
  let acctual = value;

  if (typeof value === "string") {
    acctual = `"${value}"`;
  }

  test(`${prop} is ${acctual}`, () => {
    return expect(get(prop, token)).toBe(value);
  });
}
export function testToken(
  token: NcToken,
  type: string,
  value: string | number | any
) {
  testProp(token, "type", type);
  testProp(token, "value", value);
}

export function testAddrTokenPrefixAndValue(
  token: NcToken,
  testPrefix: string,
  testValue: number
) {
  testProp(token, "type", "ADDR");
  const tokenVal = get("value", token);
  test(`prefix is "${testPrefix}"`, () => {
    return expect(tokenVal.prefix).toBe(testPrefix);
  });
  test(`value is "${testValue}"`, () => {
    return expect(tokenVal.value).toBe(testValue);
  });
}
