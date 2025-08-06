import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../../../service/home-service';
import { AuthService } from '../../../service/auth-service';
import { Section } from '../../../models/section';
import { PageResponse } from '../../../models/page-response';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  homeData: any;
  sectionsData!: PageResponse<Section>;
  currentPage = 0;
  pageSize = 7;
  searchTerm = '';
  searchResult?: Section;
  isMobile = false;
  expandedSectionId: number | null = null; // Changé de string à number

  constructor(
    private homeService: HomeService,
    private authService: AuthService,
    private router: Router
  ) {
    this.checkIfMobile();
  }

  // Correction du HostListener
  @HostListener('window:resize')
  onResize() {
    this.checkIfMobile();
  }

  ngOnInit() {
    // this.loadHomeData();
    this.loadSections();
  }

  checkIfMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  // loadHomeData() {
  //   this.homeService.getHome().subscribe({
  //     next: (data) => this.homeData = data,
  //     error: (err) => console.error('Error loading home data', err)
  //   });
  // }

  loadSections() {
    this.homeService.getSection(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        console.log('Sections response:', response);
        this.sectionsData = response;
        this.expandedSectionId = null;
      },
      error: (err) => console.error('Error loading sections', err)
    });
  }

  onSearch() {
    if (this.searchTerm) {
      this.homeService.searchSection(this.searchTerm).subscribe({
        next: (data) => {
          this.searchResult = data;
          this.expandedSectionId = data.id; // data.id est maintenant un nombre
        },
        error: (err) => {
          console.error('Search error', err);
          this.searchResult = undefined;
        }
      });
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.loadSections();
  }

  toggleChapitres(sectionId: number) {
    if (this.expandedSectionId === sectionId) {
      this.expandedSectionId = null;
    } else {
      this.expandedSectionId = sectionId;
    }
  }
}