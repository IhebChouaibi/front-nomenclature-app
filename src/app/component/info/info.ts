import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUp } from '../pop-up/pop-up';
import { Add } from '../add/add';
import { AddNotes } from '../add-notes/add-notes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Taric } from '../../service/taric';
import { Notes } from '../../service/notes';

@Component({
  selector: 'app-info',
  standalone: false,
  templateUrl: './info.html',
  styleUrl: './info.css'
})
export class Info {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any
    ,private dialogRef: MatDialogRef<Info>, 
    private dialog: MatDialog ,
    private snackBar: MatSnackBar,
    private notesService :Notes
   ) {
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
  @Input() idNomenclature: string = '';
 fermer(): void {
    this.dialogRef.close();
  }
  
  addNotes(): void {
    const dialogRef = this.dialog.open(AddNotes, {
      width: '400px',
      data: {
        titre: 'Ajouter une note',
        contenu: '',
        dateDebutValid: '',
        dateFinValid: '',
        idNomenclature: this.data.idNomenclature
      }
    }) 
    .afterClosed().subscribe(result => {
      if (result) {
console.log('Note ajoutée:', result);

        this.notesService.addNotesToTaric(this.data.idNomenclature,result).subscribe(response => {
           this.snackBar.open('Note ajoutée avec succès', 'Fermer', {
          duration: 3000,
        });
        }     )
          
      } else {
        this.snackBar.open('Aucune note ajoutée', 'Fermer', {
          duration: 3000,
        });
      }
    });
  }
  
}