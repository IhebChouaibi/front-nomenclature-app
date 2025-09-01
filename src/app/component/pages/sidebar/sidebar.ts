import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, InjectionToken, Output, ViewChild } from '@angular/core';
import { Chapitre } from '../../../models/chapitre';
import { HomeService } from '../../../service/home-service';
import { PageResponse } from '../../../models/page-response';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUp } from '../../pop-up/pop-up';
import { Router } from '@angular/router';
import { Add } from '../../add/add';
import { AuthService } from '../../../service/auth-service';
@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
 @Output() chapitreSelected = new EventEmitter<Chapitre>();
  @ViewChild('editInput') editInput!: ElementRef;

  sectionsData!: PageResponse<any>;
  currentPage = 0;
  searchTerm = '';
  searchResult?: any;
  newChapitre = { code: '', libelle: '' };
  selectedChapitreId: number | null = null;
  
  state = {
    expandedSectionId: null as number | null,
    addingChapitreToSectionId: null as number | null,
    editingSectionId: null as number | null,
    editingChapitreId: null as number | null
  };

  constructor(
    private router: Router, 
    private homeService: HomeService,
    private cdRef: ChangeDetectorRef,
    private dialog :MatDialog,
   public auth: AuthService
    
  ) {}

  ngOnInit() {
    this.loadSections();
  }

  loadSections() {
    this.homeService.getSection(this.currentPage, 7).subscribe({
      next: (res) => {
        res.content = res.content.sort((a, b) => a.idSection - b.idSection);
        this.sectionsData = res;
        
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error loading sections', err)
    });
  }

  onSearch() {
   if (this.searchTerm.trim()){
    this.router.navigate(['/search'], {
      queryParams: { codeTaric: this.searchTerm }     
   })
  }
  }
  saveItem(type: 'section' | 'chapitre', id: number, libelle: string) {
    if (!libelle.trim()) return;
    this.homeService.update(
      type === 'section' ? 'updateSection' : 'updateChapitre', 
      id, 
      libelle
    ).subscribe(() => {
      this.state[type === 'section' ? 'editingSectionId' : 'editingChapitreId'] = null;
      this.loadSections();
    });
  }

  deleteItem(type: 'section' | 'chapitre', id: number) {
    if (!confirm(`Supprimer ce ${type}?`)) return;
    this.homeService.delete(
      type === 'section' ? 'deleteSection' : 'deleteChapitre', 
      id
    ).subscribe(() => this.loadSections());
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadSections();
  }

addChapitre(idSection :number){
  this.dialog.open(Add ,{
    width: '500px',
    data: {
   titre: 'Ajouter un chapitre ',
      codeLabel: 'Code chapitre ',
      libelleLabel: 'chapitre Libellé',
      idParent: idSection
    }

  }).afterClosed().subscribe(result=>
  {
    
    if(result ){
    console.log('Résultat popup :', result);
   
      this.homeService.create<Chapitre>('addChapitre',{
        idSection : result.idParent,
        codeChapitre : result.code,
        libelleChapitre:result.libelle,
        
      }).subscribe(()=>{
        this.loadSections();
      })
    }
  }
  );
  
}
 
  private findItem(type: 'section' | 'chapitre', id: number): any {
  if (!this.sectionsData || !this.sectionsData.content) return null;

  for (const section of this.sectionsData.content) {
    if (type === 'section' && section.idSection === id) return section;

    if (type === 'chapitre' && section.chapitres) {
      const chapitre = section.chapitres.find((c: Chapitre) => c.idChapitre === id);
      if (chapitre) return chapitre;
    }
  }

  return null;
}

startEdit(type: 'section' | 'chapitre', id: number) {
  const item = this.findItem(type, id);
  if (!item) return; 
  
  const dialogRef = this.dialog.open(PopUp, {
    width: '500px',
    data: {
      entityType: type,
      titre: type === 'chapitre' ? 'Modifier un chapitre' : 'Modifier une section',
      libelleLabel: 'Libellé',
      codeLabel: 'Code',
      sections: this.sectionsData?.content || [],
      id: type === 'section' ? item.idSection : undefined,
      code: type === 'chapitre' ? item.codeChapitre : item.codeSection,
      libelle: type === 'chapitre' ? item.libelleChapitre : item.libelleSection,
      selectedSectionId: type === 'chapitre' ? item.idSection : undefined
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (type === 'chapitre') {
        

        this.homeService.update('updateChapitre', id, {
          libelleChapitre: result.libelle,
          codeChapitre: result.code,
          idSection: result.idSection
        }).subscribe({
          next: () => this.loadSections(),
          error: (err) => console.error('Error updating chapter', err)
        });
      } else {
        this.homeService.update('updateSection', id, result.libelle)
          .subscribe({
            next: () => this.loadSections(),
            error: (err) => console.error('Error updating section', err)
          });
      }
    }
  });
}

  getPages(): number[] {
    return this.sectionsData 
      ? Array(this.sectionsData.totalPages).fill(0).map((_, i) => i) 
      : [];
  }

  toggleChapitres(id: number) {
    this.state.expandedSectionId = this.state.expandedSectionId === id ? null : id;
        console.log(id);

  }

  selectChapitre(chapitre: Chapitre) {
    this.selectedChapitreId = chapitre.idChapitre;
    this.chapitreSelected.emit(chapitre);
  }
  
}
