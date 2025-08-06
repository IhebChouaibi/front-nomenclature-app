import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { HomeService } from '../../service/home-service';
import { Section } from '../../models/section';
import { Chapitre } from '../../models/chapitre';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css'
})
export class PopUp {
 

   

  form: FormGroup;
titre : string  = "";
libelleLabel : string ="";
codeLabel:String="code";
disableCode :boolean =false;

    constructor(private fb: FormBuilder ,
       private dialogRef : MatDialogRef<PopUp>,
       @Inject (MAT_DIALOG_DATA)public data:any) {
        this.titre = data?.titre||'Formulaire';
        this.libelleLabel = data?.libelleLabel || 'Libellé';
       this.codeLabel = data?.codeLabel || 'Code';
          this.disableCode = data?.disableCode || false;
    this.form = this.fb.group({
      libelle: [data?.libelle, Validators.required],
      code: [{ value: data?.code, disabled: this.disableCode }] 
    });
  }

 onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.getRawValue());
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
    save() {
  this.dialogRef.close({
    libelle: this.data.libelle
  });
}
  
  }




