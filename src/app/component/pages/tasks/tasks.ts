import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Taric } from '../../../service/taric';
import { MesureService } from '../../../service/mesure';
import { PageResponse } from '../../../models/page-response';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class Tasks {
  currentPage = 0;
  pageSize = 10;
    MesureData!: PageResponse<any>;
  selectionMode = false;
  selectedMesures: number[] = [];
  pressTimer: any;
    @ViewChild(MatPaginator) paginator!: MatPaginator;



  constructor(private mesureService :MesureService,
        private cdRef: ChangeDetectorRef,

  ){

  }
  ngOnInit() {
    this.getMesureByStatutEn_Attente();
  }



getMesureByStatutEn_Attente() {
  this.mesureService
    .getMesureByStatus('EN_ATTENTE', this.currentPage, this.pageSize)
    .subscribe({
      next: (res) => {

        this.MesureData = res; 
        console.log(this.MesureData.content, "==== Mesures ====");

        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error loading Mesure', err),
    });
}

 onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMesureByStatutEn_Attente();
  }
 
  press(event: Event, mesureId: number) {
    this.pressTimer = setTimeout(() => {
      this.onLongPress(mesureId);
    }, 600); 
  }

    release(event: Event) {
    clearTimeout(this.pressTimer);
  }

 
   toggleSelection(mesureId: number) {
    if (this.selectedMesures.includes(mesureId)) {
      this.selectedMesures = this.selectedMesures.filter(id => id !== mesureId);
    } else {
      this.selectedMesures.push(mesureId);
    }

    if (this.selectedMesures.length === 0) {
      this.selectionMode = false; 
    }

    console.log('Selected:', this.selectedMesures);
  }

  clearSelection() {
    this.selectedMesures = [];
    this.selectionMode = false;
  } 
    onLongPress(mesureId: number) {
    this.selectionMode = true;
    this.toggleSelection(mesureId);
  }
    accepter() {
    console.log("Mesures acceptées:", this.selectedMesures);
  }

  rejeter() {
    console.log("Mesures rejetées:", this.selectedMesures);
  }
  
}
