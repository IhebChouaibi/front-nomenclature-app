import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImportData } from '../../service/import-data';
@Component({
  selector: 'app-exportdata',
  standalone: false,
  templateUrl: './exportdata.html',
  styleUrl: './exportdata.css'
})
export class Exportdata {
  file : File[] = [];

uploading? : false ;
uploadMessage :string ='';
  constructor (
    private dialogRef : MatDialogRef<Exportdata> , 
    @Inject(MAT_DIALOG_DATA) public data :any ){


  }
  onSelect(event : any ){
   for (let files of event.addedFiles) { // ✅ correct
    this.file.push(files);
  }
  }

  onRemove(file: File) {
    this.file = this.file.filter(f => f !== file);
  }

close(): void {
    this.dialogRef.close();
  }
 onUpload(): void {
  if (!this.file.length) {
    this.uploadMessage = "Veuillez choisir un fichier.";
    return;
  }

  this.uploadMessage = "Importation en cours…"; 

  setTimeout(() => {
    this.dialogRef.close(this.file[0]);
  }, 1000); 
}
 onFileChange(event: any): void {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    this.file = [selectedFile]; 
  }
}
}
