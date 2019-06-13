import { IValueAddress } from "../types";
export declare class Address implements IValueAddress {
    static factory(addr: string): Address;
    prefix: string;
    value: number;
    constructor(valAddr: string);
    toString(): string;
    isPositive(): boolean;
    isZero(): boolean;
    isNegative(): boolean;
}
