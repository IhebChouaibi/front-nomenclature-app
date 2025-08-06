import { NC } from "./nc";

export interface Sousposition {
 idSousPosition: number;
  codeSousPosition: string;
  libelleSousPosition: string;
  nomenclatureCombinees : NC[];
    expanded?: boolean;    

}
