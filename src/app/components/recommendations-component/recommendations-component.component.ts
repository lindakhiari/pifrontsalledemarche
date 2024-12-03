import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importation de CommonModule pour *ngIf
import { RecommendationServiceService } from 'src/app/services/recommendation-service.service';  // Import du service

@Component({
  selector: 'app-recommendations-component',
  standalone: true,  // Le composant est autonome
  imports: [CommonModule],  // S'assurer que CommonModule est bien importé ici
  templateUrl: './recommendations-component.component.html',
  styleUrls: ['./recommendations-component.component.scss']
})
export class RecommendationsComponentComponent {
  formation: string = '';
  evenement: string = '';

  // Déclaration des propriétés de chargement
  isLoadingFormation: boolean = false;  // Initialement pas en cours de chargement pour la formation
  isLoadingEvent: boolean = false;     // Initialement pas en cours de chargement pour l'événement

  constructor(private recommendationService: RecommendationServiceService) { }

  // Méthode pour rechercher la formation
  searchFormation(): void {
    this.isLoadingFormation = true;  // Affichage du message de chargement
    this.isLoadingEvent = false;     // Masquer le chargement de l'événement

    // Appel du service pour récupérer les recommandations de formation
    this.recommendationService.getRecommendations().subscribe(
      (data) => {
        // Assignez les données reçues à vos variables
        this.formation = data.formation;
        this.evenement = ''; // Réinitialiser l'événement
        this.isLoadingFormation = false; // Désactiver le message de chargement après la récupération des données
      },
      (error) => {
        console.error('Erreur lors de la récupération des recommandations de formation', error);
        this.isLoadingFormation = false;
      }
    );
  }

  // Méthode pour rechercher l'événement
  searchEvenement(): void {
    this.isLoadingEvent = true;  // Affichage du message de chargement
    this.isLoadingFormation = false; // Masquer le chargement de la formation

    // Appel du service pour récupérer les recommandations d'événement
    this.recommendationService.getRecommendations().subscribe(
      (data) => {
        // Assignez les données reçues à vos variables
        this.evenement = data.evenement;
        this.formation = ''; // Réinitialiser la formation
        this.isLoadingEvent = false; // Désactiver le message de chargement après la récupération des données
      },
      (error) => {
        console.error('Erreur lors de la récupération des recommandations d\'événement', error);
        this.isLoadingEvent = false;
      }
    );
  }
}
