import { Description } from "./description";
import { Notes } from "./notes";

export interface TARIC {
      idNomenclature: number;
  codeNomenclature: string;
  descriptions: Description[];
  idSuffix: number;
  dateDebutValid:Date;
  dateFinValid?: Date;
  notes : Notes[];
}
