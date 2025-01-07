import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // Importation de RouterModule

@Component({
  selector: 'app-formation-add',
  standalone: true,
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.scss'],
  imports: [FormsModule,RouterModule]  // Utilisation uniquement de FormsModule pour un formulaire template-driven
})
export class FormationAddComponent {
  formation: any = { titre: '', description: '', dateCreation: '', prix: '' }; // Initialisation de l'objet formation

  constructor(
    private formationService: FormationService,
    private router: Router
  ) {}

  // Méthode pour ajouter une formation
  addFormation(): void {
    // Appel au service pour ajouter la formation
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
