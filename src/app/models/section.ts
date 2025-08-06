import { Chapitre } from "./chapitre";

export interface Section {
   idSection: number;
  codeSection: string;
  libelleSection: string;
  chapitres: Chapitre[];
    expanded?: boolean;    


}
