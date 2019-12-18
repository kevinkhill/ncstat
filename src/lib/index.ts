import { Address } from "../Address";

export * from "./regex";

export function hasDot(input: string): boolean {
  return String.prototype.includes.call(input, ".");
}

export function zeroPadAddress(input: string): string {
  return input ? input[0] + `00${input.slice(1)}`.slice(-2) : "";
}

export function getAddrVal(input: string): number | undefined {
  return Address.parse(input)?.value;
}

export function isNumeric(input: string): boolean {
  if (typeof input === 'number') {
    return input - input === 0;
  } else if (typeof input === 'string' && input.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+input) : isFinite(+input);
  } else {
    return false;
  }
};
