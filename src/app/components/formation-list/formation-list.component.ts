import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule]  
})
export class FormationListComponent implements OnInit {
  formations: any[] = [];
  router: any;
  errorMessage: string;

  constructor(private formationService: FormationService,private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.error('Utilisateur non connecté. Redirection...');
     
    } else {
      this.loadFormations();
      this.getFormations();
    }
  }
  

  getFormations(): void {
    this.formationService.getFormations().subscribe(
      (data) => {
        console.log('Formations reçues:', data);
        this.formations = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des formations:', error);
      }
    );
  }
  loadFormations(): void {
    this.formationService.getFormations().subscribe({
      next: (data) => {
        this.formations = data; // Met à jour la liste locale des formations
      },
      error: (err) => {
        console.error('Erreur lors du chargement des formations :', err);
        this.errorMessage = 'Impossible de charger les formations.';
      }
    });
  }

  deleteFormation(id: number): void {
    this.formationService.deleteFormation(id).subscribe({
      next: (response) => {
        console.log(response.message); // Afficher le message de succès
        // Mettre à jour la liste locale en supprimant la formation correspondante
        this.formations = this.formations.filter((formation) => formation.id !== id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression :', err.message);
        this.errorMessage = `Erreur : ${err.message}`;
      }
    });
  }
  
}
