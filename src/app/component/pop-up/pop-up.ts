import { Component, Inject } from '@angular/core';
import { Section } from '../../models/section';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './pop-up.html',
  styleUrl: './pop-up.css'
})
export class PopUp {
 sections: Section[] = [];
  popupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PopUp>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.sections = data.sections || [];
    
    this.popupForm = this.fb.group({
      libelle: [data.libelle || ''],
      code: [data.code || ''],
      selectedSectionId: [data.selectedSectionId || null]
    });
  }

  onSubmit(): void {
    const formValue = this.popupForm.value;
    const result: { libelle: string; code?: string; idSection?: number | null } = {
      libelle: formValue.libelle
    };
    
    if (this.data.entityType === 'chapitre') {
      result.code = formValue.code;
      result.idSection = formValue.selectedSectionId;
    }
    
    this.dialogRef.close(result);
  }

  onClose(): void {
    this.dialogRef.close();
  }
  }




