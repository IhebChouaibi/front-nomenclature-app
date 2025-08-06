import { Chapitre } from "./chapitre";

export interface Section {
   id: number;
  codeSection: string;
  libelleSection: string;
  chapitres: Chapitre[];

}
