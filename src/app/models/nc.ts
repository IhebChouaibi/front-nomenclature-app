import { TARIC } from "./taric";

export interface NC {
     idNCombinee: number;
  codeNCombinee: string;
  libelleNC:string;
  nomenclatures: TARIC[];         // Ajouter les TARIC
  expanded?: boolean;    
}
