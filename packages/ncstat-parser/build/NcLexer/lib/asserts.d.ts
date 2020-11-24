import { Token } from "ts-tokenizr";
import { AddressToken } from "../../types";
import { NcToken } from "../NcToken";
export declare function assertIsAddressToken(token: Token | AddressToken): asserts token is AddressToken;
export declare function assertIsNumericToken(token: Token | AddressToken): asserts token is NcToken & {
    value: number;
};
//# sourceMappingURL=asserts.d.ts.map