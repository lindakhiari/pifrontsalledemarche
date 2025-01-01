import { Component, OnInit } from '@angular/core';
import { EvenementService } from 'src/app/services/evenement.service';
import { InscriptionService } from 'src/app/services/inscription.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class EvenementListComponent implements OnInit {
  evenements: any[] = [];
  errorMessage: string = '';
  message: string = '';
  isSuccess: boolean = false;
  idUtilisateur: number = 0; // ID utilisateur récupéré
  
  constructor(
    private evenementService: EvenementService,
    private inscriptionService: InscriptionService,
    private router: Router // Ajouter le Router dans le constructeur
  ) {}

  ngOnInit(): void {
    this.loadEvenements();

    // Récupérer l'ID de l'utilisateur depuis le localStorage
    this.idUtilisateur = Number(localStorage.getItem('user_id')); // Récupérer l'ID utilisateur
    console.log('ID de l\'utilisateur récupéré depuis localStorage:', this.idUtilisateur);
  }

  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe({
      next: (data) => {
        this.evenements = data;
        console.log('Événements chargés:', this.evenements); // Vérification des événements reçus
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des événements: ' + error.message;
        console.error(error);
      }
    });
  }
  

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
  
        // Ajouter le solde avant et après inscription à la réponse pour affichage
      },
      (error) => {
        console.error('Erreur lors de l\'inscription:', error);
        this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        this.isSuccess = false;
      }
    );
  }
  
  
  // Fonction pour revenir à la liste des formations
  goBack(): void {
    this.router.navigate(['/market-chart']); // Vous pouvez remplacer '/market-chart' par l'URL que vous souhaitez
  }
}
