import { Validation } from "./validation";

export interface Mesure {
    idMesure:number,
    codeMesure : string ,
    dateDebut :Date,
    dateFin :Date,
    numeroQuota :string,
    validations :Validation[]

}
