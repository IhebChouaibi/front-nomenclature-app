import { C } from '@angular/cdk/keycodes';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  standalone: false,
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add {

  addForm: FormGroup;
  constructor( private dialogRef : MatDialogRef<Add>,    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
) {
this.addForm = this.fb.group({
      code : [data.code || ''],
      libelle: [data.libelle || ''],
      idParent : [data.idParent || ''],})

  }
  onSubmit(): void {
    const formValue = this.addForm.value;
    const result: { libelle: string; code: string; idParent: number  } = {
      libelle: formValue.libelle,
      code : formValue.code,
      idParent: Number(formValue.idParent)
    }
    this.dialogRef.close(result);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
