import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUp } from '../pop-up/pop-up';

@Component({
  selector: 'app-info',
  standalone: false,
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<Info>, private dialog: MatDialog  ) {
    this.code = data.code || '';
    this.description = data.description || '';
    this.startValidity = data.startValidity || '';
    this.endValidity = data.endValidity || '';
    this.notes = data.notes || '';
  }
   @Input() code: string = '';
  @Input() description: string = '';
  @Input() startValidity: string = '';
  @Input() endValidity: string = '';
  @Input() notes: string = '';
 fermer(): void {
    this.dialogRef.close();
  }
  addNotes(): void {
    const dialogRef = this.dialog.open(PopUp, {
      width: '400px',
      data: {
        title: 'Ajouter une note',
        content: 'Veuillez saisir le contenu de la note :',
        action: 'Ajouter'
      }
    }); 
  }
  
}