import {  Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA,  MatDialogRef } from '@angular/material/dialog';

import { Route, Router } from '@angular/router';
import { Mesure } from '../../models/mesure';
import { MesureResponse } from '../../models/mesure-response';
import { MesureService } from '../../service/mesure';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
@Component({
  selector: 'app-traiter-mesures',
  standalone: false,
  templateUrl: './traiter-mesures.html',
  styleUrl: './traiter-mesures.css'
})
export class TraiterMesures {

  mesure:MesureResponse;

    traitementForm!: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any
    ,private dialogRef: MatDialogRef<TraiterMesures>, 
    private mesureService : MesureService,
    private fb: FormBuilder,
    public authService :AuthService,

    private router :Router  ,

   ) {
        this.mesure = data.mesure;
        this.traitementForm = this.fb.group({
      commentaire: ['', Validators.required],
      
    });

  }
   fermer(): void {
    this.dialogRef.close();
  }


  approuve() {
    this.traiterMesure("APPROUVE")
    this.fermer();
  }
  rejecter():void{
    this.traiterMesure("REFUSE");
    this.fermer();

  }
 
  traiterMesure(statut:string) {
    if (this.traitementForm.invalid ) {
      return;
    }

    
    const formValue = this.traitementForm.value;
    
    const responsableId = this.authService.getUserId();
    
    if (!responsableId) {
      console.error('Aucun responsable connecté');
      
      return;
    }
     if (!this.mesure?.idMesure) {
    console.error('ID de mesure non défini', this.mesure);
    return;
  }
console.log(this.mesure.idMesure,"**********************************************************************");
    this.mesureService.traiterMesureStatus(
      statut,
      formValue.commentaire,
      responsableId,
      [this.mesure.idMesure] 
    ).subscribe({
      next: (mesures) => {
        console.log('Mesure traitée avec succès', mesures);
        this.dialogRef.close({ success: true, mesures });
    
      },
      error: (err) => {
        console.error('Erreur lors du traitement de la mesure', err);
        
      }
    });
  }

}
