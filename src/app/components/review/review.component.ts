import { Component } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importation du Router

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], // Pas besoin d'importer Router ici
})
export class ReviewComponent {
  review = {
    title: '',
    content: '',
    stars: 0,
  };
  sentiment: string | null = null;

  constructor(private reviewService: ReviewService, private router: Router) {} // Injection du Router ici

  // Ajouter un avis et analyser le sentiment
  submitReview() {
    this.reviewService.addReview(this.review).subscribe(
      (response) => {
        console.log('Avis ajouté avec succès :', response);
        this.sentiment = response.sentiment; // Afficher le sentiment dans l'interface utilisateur
      },
      (error) => {
        console.error('Erreur lors de l’ajout de l’avis :', error);
      }
    );
  }

  goBack() {
    // Redirige vers la page d'accueil
    this.router.navigate(['/market-chart']); // Ajustez le chemin de la page d'accueil
  }
}
