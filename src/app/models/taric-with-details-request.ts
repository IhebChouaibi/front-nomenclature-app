
import { Description } from "./description";
import { Notes } from "./notes";
import { Suffix } from "./suffix";

export interface TaricWithDetailsRequest {
    codeNomenclature: string;
    dateDebutValid: Date ;
    dateFinValid?: Date;
    suffixDto: Suffix;
    descriptions: Description[];
    notes : Notes[];
}
