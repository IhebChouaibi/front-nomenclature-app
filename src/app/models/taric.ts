import { Notes } from "./notes";

export interface TARIC {
      idNomenclature: number;
  codeNomenclature: string;
  libelleNomenclature: string;
  idSuffixe?: number;
  dateDebutValid:Date;
  dateFinValid?: Date;
  notes : Notes[];
}
