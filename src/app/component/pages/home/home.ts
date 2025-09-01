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
import { Router } from '@angular/router';
import { Position } from '../../../models/position';
import { Sousposition } from '../../../models/sousposition';
import { AuthService } from '../../../service/auth-service';
import { NotesService } from '../../../service/notes';
import { AddNotes } from '../../add-notes/add-notes';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  
 isMobile = false; 
  selectedChapitre: Chapitre | null = null; 

suffixMap: { [key: number]: string } = {};
private currentIds: number[] = [];
  state = {
    expandedPositionId: null as number | null, 
    expandedSousPositionId: null as number | null,
    expandedNcId: null as number | null,
    expandedTaricId : null as number |null
  };
  constructor (private dialog : MatDialog,
    
     private cdr: ChangeDetectorRef,
     private taricService: Taric,
     private notesService :NotesService,
     private snackBar: MatSnackBar,
     private  router :Router,
     public auth: AuthService
  
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


  addMesur(){
    this.router.navigate(["/add-mesure"])
  }
  goToAddMesure(item: any, type: string) {
  this.router.navigate(['/add-mesure'], {
    queryParams: {
      id: item.id,
      type: type
    }
  });
}
getAllTaricIdsFromPosition(position: Position): number[] {
  const ids: number[] = [];
  position.sousPositions?.forEach(sp => {
    sp.nomenclatureCombinees?.forEach(nc => {
      nc.nomenclatures?.forEach(taric => {
        ids.push(taric.idNomenclature);
      });
    });
  });
  return ids;
}

getAllTaricIdsFromSousPosition(sousPosition: Sousposition): number[] {
  const ids: number[] = [];
  sousPosition.nomenclatureCombinees?.forEach(nc => {
    nc.nomenclatures?.forEach(taric => {
      ids.push(taric.idNomenclature);
    });
  });
  return ids;
}
addMesureForPosition(position: Position) {
  const taricIds = this.getAllTaricIdsFromPosition(position);
  console.log("TARIC IDs for position:", taricIds);

  this.router.navigate(['/add-mesure'], {
    queryParams: { ids: taricIds.join(','), type: 'position' }
  });
}

addMesureForSousPosition(sousPosition: Sousposition) {
  const taricIds = this.getAllTaricIdsFromSousPosition(sousPosition);
  console.log("TARIC IDs for sous-position:", taricIds);

  this.router.navigate(['/add-mesure'], {
    queryParams: { ids: taricIds.join(','), type: 'sousPosition' }
  });
}

 addNotesToTarics(ids: number[]): void {
    this.currentIds = ids;
    
    const dialogRef = this.dialog.open(AddNotes, {
      width: '400px',
      data: {
        titre: 'Ajouter une note',
        contenu: '',
        dateDebutValid: '',
        dateFinValid: '',
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        if (result.idNomenclature) {
          delete result.idNomenclature;
        }
        
        console.log('Données à envoyer:', result);
        console.log('IDs TARIC:', this.currentIds);
        
        this.notesService.addNotesToTarics(this.currentIds, result).subscribe({
          next: (response) => {
            this.snackBar.open('Note ajoutée avec succès', 'Fermer', {
              duration: 3000,
            });
          },
          error: (error) => {
            console.error('Erreur lors de l\'ajout de la note', error);
            this.snackBar.open('Erreur lors de l\'ajout de la note', 'Fermer', {
              duration: 3000,
            });
          }
        });
      } else {
        this.snackBar.open('Aucune note ajoutée', 'Fermer', {
          duration: 3000,
        });
      }
    });
  }

  addNoteToPosition(position: Position): void {
    const taricIds = this.getAllTaricIdsFromPosition(position);
    console.log('IDs pour la position:', taricIds);
    this.addNotesToTarics(taricIds);
  }

  addNoteToSousPosition(sousPosition: Sousposition): void {
    const taricIds = this.getAllTaricIdsFromSousPosition(sousPosition);
    console.log('IDs pour la sous-position:', taricIds);
    this.addNotesToTarics(taricIds);
  }



  addNoteToTaric(taric: TARIC): void {
    console.log('ID pour le TARIC:', taric.idNomenclature);
    this.addNotesToTarics([taric.idNomenclature]);
  }
}