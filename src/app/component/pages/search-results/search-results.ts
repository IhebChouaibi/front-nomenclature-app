import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Taric } from '../../../service/taric';
import { TARIC } from '../../../models/taric';
import { Info } from '../../info/info';
import { MatDialog } from '@angular/material/dialog';
import { PageResponse } from '../../../models/page-response';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-search-results',
  standalone: false,
  templateUrl: './search-results.html',
  styleUrl: './search-results.css'
})
export class SearchResults implements OnInit {
  searchTerm: string = '';
  codeTaric = '';
  
  taricList : PageResponse<any>= {
  content: [],
  totalPages: 0,
  totalElements: 0,
  size: 0,
  number: 0,
  last: false,
  first: true,
  empty: true,
  numberOfElements: 0
};
currentPage = 0;
pageSize = 20;
  errorMessage: string = '';
  constructor(private route : ActivatedRoute,
    private taricService: Taric,
  private cdr: ChangeDetectorRef,
private dialog:MatDialog) {} 

  ngOnInit() {
  this.route.queryParamMap.subscribe(params => {
    this.codeTaric = params.get('codeTaric') || '';
    if (this.codeTaric) {
      this.taricService.searchTaricByCode(this.codeTaric).subscribe({
        next: (data) => {
          this.taricList= data || [];
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage = err.error.message || 'Erreur lors de la recherche';
          this.cdr.detectChanges();
        }
      });
    }
  });
}
   search(page: number = 0) {
  this.currentPage = page;
  this.taricService.searchTaricByCode(this.codeTaric, this.currentPage, this.pageSize)
    .subscribe({
      next: (res) => {
        this.taricList = res;
        this.errorMessage = '';
      },
      error: () => {
        this.errorMessage = 'Aucun résultat trouvé.';
        this.taricList = {
          content: [],
          totalPages: 0,
          totalElements: 0,
          size: 0,
          number: 0,
          last: true,
          first: true,
          empty: true,
          numberOfElements: 0
        };
      }
    });
}


  
 openInfoDialog (taric :TARIC) : void {
   let libelle= '';
  
  if (Array.isArray(taric.descriptions)) {
    for (const desc of taric.descriptions) {
      if (desc.status === '1') {
        libelle = desc.description; 
        break; 
      }
    }
  }
    this.dialog.open(Info,{
      width :'500px',
      data :{
        code :taric.codeNomenclature,
        description :libelle ,
        startValidity :taric.dateDebutValid, 
        endValidity :taric.dateFinValid,
        notes : taric.notes.length > 0 ? taric.notes[0].contenu : "Aucune note disponible , vous pouvez ajouter une note en cliquant sur le bouton 'Ajouter une note .  ",
          
         

      }

    })
  }
   
onPageChange(event: PageEvent) {
  this.pageSize = event.pageSize;
  this.search(event.pageIndex);
}
}
