import { Address } from "@/Address";

export * from "./regex";

export function zeroPadAddress(val: string): string {
  return val ? val[0] + `00${val.slice(1)}`.slice(-2) : "";
}

export function getAddrVal(test: string): number | undefined {
  return Address.parse(test).value;
}
