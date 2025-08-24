import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TARIC } from '../../../models/taric';
import { ActivatedRoute } from '@angular/router';
import { Taric } from '../../../service/taric';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from '../../../service/notes';
import { AddNotes } from '../../add-notes/add-notes';
import { Vallidation } from '../../../service/vallidation';
import { Statut } from '../../../models/statut';
import { Mesure } from '../../../models/mesure';

@Component({
  selector: 'app-taric-full-details',
  standalone: false,
  templateUrl: './taric-full-details.html',
  styleUrls: ['./taric-full-details.css'] })
export class TaricFullDetails implements OnInit {

  taric: TARIC = {} as TARIC;
  isLoading = true;
  errorMessage = '';
  suffixMap: { [key: number]: string } = {};
  statut: { [key: number]: string } = {}; 
  statutMap: { [id: number]: string } = {};


  constructor(
    private route: ActivatedRoute,
    private taricService: Taric,
     private cdr: ChangeDetectorRef,
         private dialog: MatDialog ,
    private snackBar: MatSnackBar,
    private notesService :NotesService,
    private valid :Vallidation
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      
     this.loadTaric(id);

    } else {
      this.errorMessage = "ID invalide ou manquant dans l'URL";
      this.isLoading = false;
    }
  }
  loadStatut(idStatus: number) {
  if (!this.statutMap[idStatus]) {
    this.valid.getStatut(idStatus).subscribe({
      next: (statut) => {
        this.statutMap[idStatus] = statut.libelle;
      },
      error: (err) => console.error(err)
    });
  }
}

  loadTaric(id: number): void {
    this.taricService.getTaricById(id).subscribe({
      next: (data: TARIC) => {
        
        this.taric = data;
           console.log('RAW TARIC:', data);  
        this.isLoading = false;
      
        if(this.taric.idSuffix){
          this.loadSuffix(this.taric.idSuffix)
          
        }
        this.taric.mesures.forEach(mesure => {
  mesure.validations.forEach(val => this.loadStatut(val.idStatus));
});

                this.cdr.detectChanges();

      },
      error: (err) => {
        console.error('Erreur lors du chargement du Taric', err);
        this.errorMessage = "Impossible de charger les données du Taric";
        this.isLoading = false;
      }
    });
  }
   private loadSuffix(idSuffix: number): void {
    if(!this.suffixMap[idSuffix]) {
    this.taricService.getSuffix(idSuffix).subscribe({
      next: (suffix) => {
          console.log("Réponse suffix API =", suffix);

       this.suffixMap[idSuffix] = suffix.codeSuffix; 
      },
      error: (err) => {
        console.error('Error retrieving suffix:', err);
      }
    });
  }}
    addNotes(idNomenclature : number): void {
    const dialogRef = this.dialog.open(AddNotes, {
      width: '400px',
      data: {
        titre: 'Ajouter une note',
        contenu: '',
        dateDebutValid: '',
        dateFinValid: '',
        idNomenclature: idNomenclature
      }
    }) 
    .afterClosed().subscribe(result => {
      if (result) {
console.log('Note ajoutée:', result);

        this.notesService.addNotesToTaric(idNomenclature,result).subscribe(response => {
           this.snackBar.open('Note ajoutée avec succès', 'Fermer', {
          duration: 3000,
        });
          if (!this.taric.notes) {
    this.taric.notes = [];
  }
  this.taric.notes.push(response);

         this.cdr.detectChanges(); 
        }     )
          
      } else {
        this.snackBar.open('Aucune note ajoutée', 'Fermer', {
          duration: 3000,
        });
      }
    });
  }


  getMesuresByStatus(status: string) {
  return this.taric?.mesures?.filter(m => 
    m.validations?.some(v => this.statutMap[v.idStatus] === status)
  ) || [];
  }
}
