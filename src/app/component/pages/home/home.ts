import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild, ElementRef, inject } from '@angular/core';
import { HomeService } from '../../../service/home-service';
import { Section } from '../../../models/section';
import { PageResponse } from '../../../models/page-response';
import { Chapitre } from '../../../models/chapitre';
import { Position } from '../../../models/position';
import { Sousposition } from '../../../models/sousposition';
import { NC } from '../../../models/nc';
import { Info } from '../../info/info';
import { MatDialog } from '@angular/material/dialog';
import { TARIC } from '../../../models/taric';
import { ImportData } from '../../../service/import-data';
import { Exportdata } from '../../exportdata/exportdata';
import { AddNomenclature } from '../../add-nomenclature/add-nomenclature';
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
  state = {
    expandedPositionId: null as number | null, 
    expandedSousPositionId: null as number | null,
    expandedNcId: null as number | null,
    expandedTaricId : null as number |null
  };
  constructor (private dialog : MatDialog,
    private importData : ImportData ,
     private cdr: ChangeDetectorRef
  
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
  }

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
    this.dialog.open(Info ,{
      width :'500px',
      data :{
        code :taric.codeNomenclature,
        description :taric.libelleNomenclature ,
        startValidity :"27/04/2023" ,
        endValidity :"26/04/2024",
        notes :"hhhhhhhhhahahha", 

      }

    })
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
openAddManually() {
   const dialogRef = this.dialog.open(AddNomenclature, { width: '500px' });

}

}