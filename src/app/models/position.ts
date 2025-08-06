import { Sousposition } from "./sousposition";

export interface Position {
      idPosition: number;
  codePosition: string;
  libellePosition: string;
  sousPositions : Sousposition [];
    expanded?: boolean;    

}
