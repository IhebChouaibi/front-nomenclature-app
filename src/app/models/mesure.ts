import { Validations } from "./validations";

export interface Mesure {
    idMesure:number,
    codeMesure : string ,
    dateDebut :Date,
    dateFin :Date,
    numeroQuota :string,
    idMvtCommercial: number;  
  idReglement?: number;
 
    validations :Validations[]

}
