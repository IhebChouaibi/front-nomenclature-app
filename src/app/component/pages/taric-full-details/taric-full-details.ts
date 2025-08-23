import { Component, OnInit } from '@angular/core';
import { TARIC } from '../../../models/taric';
import { ActivatedRoute } from '@angular/router';
import { Taric } from '../../../service/taric';

@Component({
  selector: 'app-taric-full-details',
  standalone: false,
  templateUrl: './taric-full-details.html',
  styleUrls: ['./taric-full-details.css'] })
export class TaricFullDetails implements OnInit {

  taric!: TARIC;   
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private taricService: Taric
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

  loadTaric(id: number): void {
    this.taricService.getTaricById(id).subscribe({
      next: (data: TARIC) => {
        this.taric = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du Taric', err);
        this.errorMessage = "Impossible de charger les données du Taric";
        this.isLoading = false;
      }
    });
  }
}
