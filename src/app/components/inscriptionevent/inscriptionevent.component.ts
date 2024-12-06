import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Pour la liaison avec les inputs
import { InscriptionService } from 'src/app/services/inscription.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inscriptionevent',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscriptionevent.component.html',
  styleUrls: ['./inscriptionevent.component.scss'], // Corrigé en `styleUrls`
})
export class InscriptioneventComponent {
  idUtilisateur: number = 0; // Initialisation des champs
  idEvenement: number = 0;
  message: string = '';
  isSuccess: boolean = false; // Permet de différencier succès/erreur

  constructor(private inscriptionService: InscriptionService) {}

  inscrire() {
    if (!this.idUtilisateur || !this.idEvenement) {
      this.message = 'Veuillez remplir tous les champs correctement.';
      this.isSuccess = false;
      return;
    }

    this.inscriptionService.inscrireAEvent(this.idUtilisateur, this.idEvenement).subscribe(
      (response: any) => {
        // Réponse en cas de succès
        this.message = response.message || 'Inscription à l\'événement réussie !';
        this.isSuccess = true; // Indique un succès
      },
      (error) => {
        // Réponse en cas d'erreur
        this.message = 'Erreur lors de l\'inscription à l\'événement. Veuillez réessayer.';
        this.isSuccess = false; // Indique une erreur
      }
    );
  }
}
