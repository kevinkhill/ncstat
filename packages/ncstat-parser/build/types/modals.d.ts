import { Modals } from "../NcSpec";
export interface ModalGroups {
    [K: string]: string;
    GROUP_01: Modals.RAPID | Modals.FEED;
    GROUP_02: Modals.XY | Modals.XZ | Modals.YZ;
    GROUP_03: Modals.ABSOLUTE | Modals.INCREMENTAL;
    GROUP_05: string;
    GROUP_06: string;
    GROUP_07: string;
    GROUP_08: string;
    GROUP_10: string;
    GROUP_12: string;
}
export declare type ModalGroupStrings = keyof ModalGroups;
//# sourceMappingURL=modals.d.ts.map