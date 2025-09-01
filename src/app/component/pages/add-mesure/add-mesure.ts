import { ChangeDetectorRef, Component } from '@angular/core';
import { MesureService } from '../../../service/mesure';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Mesure } from '../../../models/mesure';
import { Reglementation } from '../../../models/reglementation';
import { MouvementCommercial } from '../../../models/mouvement-commercial';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route } from '@angular/router';
import { NC } from '../../../models/nc';
import { Sousposition } from '../../../models/sousposition';
import { Position } from '../../../models/position';

@Component({
  selector: 'app-add-mesure',
  standalone: false,
  templateUrl: './add-mesure.html',
  styleUrl: './add-mesure.css'
})
export class AddMesure {

  mesureForm!: FormGroup;
  mvtList: MouvementCommercial[] = [];
  reglementList: Reglementation[] = [];
 idEntity: number[]= [];
  entityType!: string;
  constructor(
    private fb: FormBuilder,
    private mesureService: MesureService,
         private cdr: ChangeDetectorRef,

    private route :ActivatedRoute
  ) {}

  ngOnInit(): void {
    
      this.route.queryParams.subscribe(params => {
   
    const ids = params['ids'];
    this.entityType = params['type']; 
    if(ids){
 this.idEntity = ids.split(',').map((id: string) => +id); 
    }
    console.log("Ajouter mesure pour--------------------------------------------------------------------------------------", this.entityType, "ID:", this.idEntity);
  });

    this.mesureForm = this.fb.group({
      codeMesure: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      numeroQuota: [''],
      idMvtCommercial: ['', Validators.required],
      idReglement: [null]
    });

    this.loadMouvements();
    this.loadReglements();
  }

  loadMouvements() {
    this.mesureService.getAllMvt().subscribe({
      next: (data) => {this.mvtList = data
        ;
        this.cdr.detectChanges();
      }

      ,
      error: (err) => console.error('Erreur chargement mouvements', err)
    });
  }

  loadReglements() {
    this.mesureService.getAllReglement().subscribe({
      next: (data) => this.reglementList = data,
      error: (err) => console.error('Erreur chargement règlements', err)
    });
  }
onMvtChange(event: any) {
  const selectedId = event.value; 
  console.log("Mvt sélectionné:", selectedId);
}
 
   onSubmit() {
  if (this.mesureForm.invalid || !this.idEntity || this.idEntity.length === 0) {
    alert("Pas d'IDs de TARIC trouvés !");
    return;
  }

  const mesure: Mesure = this.mesureForm.value;
  
  console.log("ID Mvt sélectionné:", mesure.idMvtCommercial);
  this.mesureService.addMesure(this.idEntity, mesure).subscribe({
    next: (res) => {
      console.log('Mesure créée avec succès ', res);
      alert('Mesure ajoutée avec succès' + res.idMvtCommercial);

      this.mesureForm.reset();
    },
    error: (err) => {
      console.error('Erreur lors de l’ajout de la mesure ', err);
      alert('Erreur lors de l’ajout de la mesure');
    }
  });
}
  }
  

