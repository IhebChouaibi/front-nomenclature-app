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
  constructor (private importData : ImportData ,
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
 onUpload (){
  if(!this.file){
    this.uploadMessage =" Veuillez choisir un fichier.";
  }
  this.importData.importData(this.file[0]).subscribe({
    next:(res)=>{this.uploadMessage = "Importation réussie.";
      this.uploading =false ;
       setTimeout(() => {
        this.dialogRef.close(res);
      }, 1000);

     },
    error : (err)=>{
         this.uploadMessage = 'Erreur : ' + (err?.error ?? 'Importation échouée.');
        this.uploading = false;
    }

  });
 }
 onFileChange(event: any): void {
  const selectedFile = event.target.files[0];
  if (selectedFile) {
    this.file = [selectedFile]; 
  }
}
}
