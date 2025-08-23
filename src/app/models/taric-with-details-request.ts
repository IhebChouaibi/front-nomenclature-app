import { Description } from "../service/description";
import { Notes } from "../service/notes";
import { Suffix } from "./suffix";

export interface TaricWithDetailsRequest {
    codeNomenclature: string;
    dateDebutValid: Date ;
    dateFinValid?: Date;
    suffixDto: Suffix;
    descriptions: Description[];
    notes : Notes[];
}
