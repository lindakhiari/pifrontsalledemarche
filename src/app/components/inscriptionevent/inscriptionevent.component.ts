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

  inscrire(idEvenement: number): void {
    console.log('Tentative d\'inscription à l\'événement ID:', idEvenement); // Vérification de l'ID de l'événement
    
    if (!this.idUtilisateur || !idEvenement) {
      this.message = 'Veuillez remplir tous les champs correctement.';
      this.isSuccess = false;
      return;
    }

    this.inscriptionService.inscrireAEvent(this.idUtilisateur, idEvenement).subscribe(
      (response: any) => {
        this.message = response.message || 'Inscription réussie à l\'événement !';
        this.isSuccess = true;
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        this.isSuccess = false;
      }
    );
  }
}
