import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importation de CommonModule pour *ngIf
import { RecommandationService } from 'src/app/services/recommandation-service.service';  // Import du service

@Component({
  selector: 'app-recommendations-component',
  standalone: true,  // Le composant est autonome
  imports: [CommonModule],  // S'assurer que CommonModule est bien importé ici
  templateUrl: './recommendations-component.component.html',
  styleUrls: ['./recommendations-component.component.scss']
})
export class RecommendationsComponentComponent implements OnInit {

  recommandations: any[] = [];  // Liste des recommandations
  errorMessage: string = '';  // Message d'erreur (si nécessaire)

  constructor(private recommandationService: RecommandationService) {}

  ngOnInit(): void {
    // Récupération des recommandations depuis le service
    this.recommandationService.getRecommandations().subscribe(
      (data: any[]) => {
        if (data.length > 0) {
          this.recommandations = data;
        } else {
          this.errorMessage = 'Aucune recommandation disponible pour le moment.';
        }
      },
      error => {
        console.error('Erreur lors de la récupération des recommandations', error);
        this.errorMessage = 'Erreur lors de la récupération des recommandations';
      }
    );
  }
}