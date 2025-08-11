import { Notes } from "./notes";

export interface TARIC {
      idNomenclature: number;
  codeNomenclature: string;
  libelleNomenclature: string;
  idSuffix: number;
  dateDebutValid:Date;
  dateFinValid?: Date;
  notes : Notes[];
}
