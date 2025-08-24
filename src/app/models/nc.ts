import { TARIC } from "./taric";

export interface NC {
     idNCombinee: number;
  codeNCombinee: string;
  libelleNC:string;
  nomenclatures: TARIC[];         
  expanded?: boolean;    
}
