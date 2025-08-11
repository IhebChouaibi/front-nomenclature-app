import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-notes',
  standalone: false,
  templateUrl: './add-notes.html',
  styleUrl: './add-notes.css'
})
export class AddNotes {

  addForm: FormGroup;
  constructor( private dialogRef : MatDialogRef<AddNotes>,
       private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
) {
this.addForm = this.fb.group({
      contenu : [data.contenu || ''],
       dateRange: this.fb.group({
    dateDebutValid: [null], 
    dateFinValid: [null]
  }),
      idNomenclature: [data.idNomenclature || ''] ,})

  }
  onSubmit(): void {
if (this.addForm.valid) {
  const formData = this.addForm.value;
const result ={
    contenu: formData.contenu,
    dateDebutValid: this.formatDate(formData.dateRange.dateDebutValid),
        dateFinValid: this.formatDate(formData.dateRange.dateFinValid),
  idNomenclature : formData.idNomenclature
};
this.dialogRef.close(result);

}

  }
  onClose(): void {
    this.dialogRef.close();
  }
    private formatDate(date: Date | null): string | null {
    if (!date) return null;
    return date.toISOString().split('T')[0];
  }
}
