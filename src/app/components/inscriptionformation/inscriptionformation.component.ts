import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pour la liaison avec les inputs
import { InscriptionService } from 'src/app/services/inscription.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscriptionformation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscriptionformation.component.html',
  styleUrls: ['./inscriptionformation.component.scss'], // Corrigé en `styleUrls` au lieu de `styleUrl`
})
export class InscriptionformationComponent {
  idUtilisateur: number = 0; // Initialisation des champs
  idFormation: number = 0;
  message: string = '';
  isSuccess: boolean = false; // Permet de différencier succès/erreur

  constructor(private inscriptionService: InscriptionService) {}

  inscrire() {
    if (!this.idUtilisateur || !this.idFormation) {
      this.message = 'Veuillez remplir tous les champs correctement.';
      this.isSuccess = false;
      return;
    }

    this.inscriptionService.inscrireAFormation(this.idUtilisateur, this.idFormation).subscribe(
      (response: any) => {
        // Réponse en cas de succès
        this.message = response.message || 'Inscription réussie !';
        this.isSuccess = true; // Indique un succès
      },
      (error) => {
        // Réponse en cas d'erreur
        this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        this.isSuccess = false; // Indique une erreur
      }
    );
  }
}
