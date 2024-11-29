import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { AuthService } from 'src/app/services/auth.service'; // Import du service AuthService
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formation-add',
  standalone: true,
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.scss'],
  imports: [FormsModule, RouterModule] 
})
export class FormationAddComponent {
  formation: any = { titre: '', description: '', dateCreation: '' };

  constructor(
    private formationService: FormationService,
    private router: Router,
    private authService: AuthService  // Injection du service AuthService
  ) {}

  addFormation(): void {
    const token = this.authService.getToken(); // Récupération du token d'authentification

    if (!token) {
      alert('Vous devez être connecté pour ajouter une formation.');
      this.router.navigate(['/login']);  // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
      return;
    }

    this.formationService.addFormation(this.formation).subscribe({
      next: (data) => {
        console.log('Formation ajoutée avec succès:', data);
        this.router.navigate(['/formations']);  // Rediriger vers la liste des formations après ajout
      },
      error: (error) => {
        console.error('Erreur lors de l\'ajout de la formation:', error);
        alert('Une erreur s\'est produite lors de l\'ajout de la formation. Veuillez réessayer.');
      },
    });
  }
}
