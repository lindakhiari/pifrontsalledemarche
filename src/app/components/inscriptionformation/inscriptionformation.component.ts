import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from 'src/app/services/inscription.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importer le service Router

@Component({
  selector: 'app-inscriptionformation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inscriptionformation.component.html',
  styleUrls: ['./inscriptionformation.component.scss'],
})
export class InscriptionformationComponent implements OnInit {
  idUtilisateur: number = 0;  // Initialisation de l'ID de l'utilisateur
  idFormation: number = 0; // Initialisation de l'ID de la formation
  message: string = '';
  isSuccess: boolean = false;

  constructor(
    private inscriptionService: InscriptionService,
    private route: ActivatedRoute,
    private router: Router // Injecter le service Router

  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de l'utilisateur depuis le localStorage
    this.idUtilisateur = Number(localStorage.getItem('user_id')); // Récupérer l'ID utilisateur
    console.log('ID de l\'utilisateur récupéré depuis localStorage:', this.idUtilisateur);

    // Récupérer l'ID de la formation depuis l'URL
    this.route.queryParams.subscribe(params => {
      this.idFormation = params['idFormation'];
      console.log('ID de la formation récupéré de l\'URL:', this.idFormation);
    });
  }

  inscrire(): void {
    if (!this.idUtilisateur || !this.idFormation) {
      this.message = 'Veuillez remplir tous les champs correctement.';
      this.isSuccess = false;
      return;
    }

    this.inscriptionService.inscrireAFormation(this.idUtilisateur, this.idFormation).subscribe(
      (response: any) => {
        this.message = response.message || 'Inscription réussie !';
        this.isSuccess = true;
      },
      (error) => {
        this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        this.isSuccess = false;
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/liste-formation']); // Remplacez '/liste-formation' par le chemin exact de votre route
  }
}
