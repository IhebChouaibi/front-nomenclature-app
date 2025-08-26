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
 idEntity!: number;
  entityType!: string;
  constructor(
    private fb: FormBuilder,
    private mesureService: MesureService,
         private cdr: ChangeDetectorRef,

    private route :ActivatedRoute
  ) {}

  ngOnInit(): void {
    
      this.route.queryParams.subscribe(params => {
    this.idEntity = +params['id'];
    this.entityType = params['type']; // "position", "sousPosition" ou "taric"
    console.log("Ajouter mesure pour", this.entityType, "ID:", this.idEntity);
  });

    this.mesureForm = this.fb.group({
      codeMesure: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      numeroQuota: [''],
      idMvtCommercial: [null, Validators.required],
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

  onSubmit() {
    if (this.mesureForm.invalid) {
      return;
    }

    const mesure: Mesure = this.mesureForm.value;

    // Exemple : ids Tarics simulés, à récupérer selon ton contexte
    const idTarics: number[] = [1, 2]; 

    this.mesureService.addMesure(idTarics, mesure).subscribe({
      next: (res) => {
        console.log('Mesure créée avec succès ✅', res);
        alert('Mesure ajoutée avec succès');
        this.mesureForm.reset();
      },
      error: (err) => {
        console.error('Erreur lors de l’ajout de la mesure ❌', err);
        alert('Erreur lors de l’ajout de la mesure');
      }
    });
  }
  getAllTaricIds(nomenclatureCombinees: NC[]): number[] {
  return nomenclatureCombinees.flatMap(nc => 
    nc.nomenclatures?.map(taric => taric.idNomenclature) ?? []
  );
}

getAllTaricIdsFromSousPosition(sp: Sousposition): number[] {
  return this.getAllTaricIds(sp.nomenclatureCombinees);
}

getAllTaricIdsFromPosition(position: Position): number[] {
  return position.sousPositions?.flatMap(sp => this.getAllTaricIdsFromSousPosition(sp)) ?? [];
}
}
