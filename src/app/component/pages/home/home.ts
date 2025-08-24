import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ElementRef, inject } from '@angular/core';

import { Chapitre } from '../../../models/chapitre';

import { Info } from '../../info/info';
import { MatDialog } from '@angular/material/dialog';
import { TARIC } from '../../../models/taric';
import { ImportData } from '../../../service/import-data';
import { Exportdata } from '../../exportdata/exportdata';
import { AddNomenclature } from '../../add-nomenclature/add-nomenclature';

import { Taric } from '../../../service/taric';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  
 isMobile = false; 
  selectedChapitre: Chapitre | null = null; 
isUploading = false;
uploadMessage = '';
suffixMap: { [key: number]: string } = {};

  state = {
    expandedPositionId: null as number | null, 
    expandedSousPositionId: null as number | null,
    expandedNcId: null as number | null,
    expandedTaricId : null as number |null
  };
  constructor (private dialog : MatDialog,
    private importData : ImportData ,
     private cdr: ChangeDetectorRef,
     private taricService: Taric,
  
     private snackBar: MatSnackBar
  
  ){}

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < 768;
  }

  ngOnInit() {
    this.onResize();
  }

  onChapitreSelected(chapitre: Chapitre) {
    this.selectedChapitre = chapitre;
    this.resetExpansionState();
    chapitre.positions.forEach(pos =>
    pos.sousPositions.forEach(sp =>
      sp.nomenclatureCombinees.forEach(nc =>
        nc.nomenclatures.forEach(taric =>
          this.loadSuffix(taric.idSuffix)
        )
      )
    )
  );
  }
  private loadSuffix(idSuffix: number): void {
    if(!this.suffixMap[idSuffix]) {
    this.taricService.getSuffix(idSuffix).subscribe({
      next: (suffix) => {
       this.suffixMap[idSuffix] = suffix.codeSuffix;
      },
      error: (err) => {
        console.error('Error retrieving suffix:', err);
      }
    });
  }}

  private resetExpansionState() {
    this.state = {
      expandedPositionId: null,
      expandedSousPositionId: null,
      expandedNcId: null,
      expandedTaricId :null
    };
  }
  

  togglePosition(id: number) {
    if (this.state.expandedPositionId === id) {
      this.state.expandedPositionId = null;
    } else {
      this.state.expandedPositionId = id;
      this.state.expandedSousPositionId = null;
      this.state.expandedNcId = null;
    }
  }
  

  toggleSousPosition(id: number) {
    if (this.state.expandedSousPositionId === id) {
      this.state.expandedSousPositionId = null;
    } else {
      this.state.expandedSousPositionId = id;
      this.state.expandedNcId = null; 
    }
  }

  toggleNc(id: number) {
    if (this.state.expandedNcId === id) {
      this.state.expandedNcId = null;
    } else {
      this.state.expandedNcId = id;
    }
  }
  openInfoDialog (taric :TARIC) : void {
    const suffix = this.suffixMap[taric.idSuffix] ;
    let libelle= '';
  
  if (Array.isArray(taric.descriptions)) {
    for (const desc of taric.descriptions) {
      if (desc.status === '1') {
        libelle = desc.description; 
        break; 
      }
    }
  }
    this.dialog.open(Info ,{
      width :'500px',
      data :{
        code :taric.codeNomenclature + '-'+ suffix,
        description :libelle ,
        startValidity :taric.dateDebutValid, 
        endValidity :taric.dateFinValid,
     //notes: taric.notes.length > 0? taric.notes[0].contenu: "Aucune note disponible !!",
  idNomenclature: taric.idNomenclature 
      }

    });
   
  }
openAddFile(): void {
  const dialogRef = this.dialog.open(Exportdata, { width: '500px' });

  dialogRef.afterClosed().subscribe((file: File) => {
    if (file) {
      this.isUploading = true;
      this.uploadMessage = "Importation en cours…";
      this.cdr.detectChanges(); 
      this.importData.importData(file).subscribe({
        next: (res) => {
          this.uploadMessage = "✅ Importation réussie !";
          this.isUploading = false;
          console.log('Import successful::::::::::::::::', res);
                this.cdr.detectChanges(); 

          setTimeout(() => {
            this.uploadMessage = '';
                  this.cdr.detectChanges(); 

          }, 3000);
        },
        error: (err) => {
          console.error('Import error:::::::::::::::', err);
          this.uploadMessage = "❌ Erreur : " + (err?.error ?? 'Importation échouée.');
          this.isUploading = false;
                this.cdr.detectChanges(); 

        }
      });
    }
  });
}

openAddNomenclature() {
 const dialogRef = this.dialog.open(
  AddNomenclature

  , { width: '800px' ,
    disableClose: true
  }
); dialogRef.afterClosed().subscribe(formData => {
    if (formData) {
      this.createTaricWithDetails(formData);
    }
  });
}

 createTaricWithDetails(formData: any) {
   const request = {
    codeNomenclature: formData.codeNomenclature,
    dateDebutValid: formData.dateDebutValid,
    dateFinValid: formData.dateFinValid,
    suffixDto: formData.suffixDto,
      descriptions: formData.descriptions.map((d: any) => ({
      description: d.description,
      dateDebutValid: d.dateDebutValid,
      dateFinValid: d.dateFinValid,
      status: d.status ?? 1  
    })),
    notes: formData.notes || []};
    this.taricService.createTaric(request).subscribe({
         next: (response) => {
      console.log("✅ TARIC créé avec détails :", response);
      this.snackBar.open('TARIC créé avec succès !', 'Fermer', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
       this.cdr.detectChanges(); 
      
    },
    error: (err) => {
      console.error("❌ Erreur lors de la création :", err);
      this.snackBar.open('Erreur lors de la création du TARIC.', 'Fermer', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
    });
  }
}
