import { Component, OnInit } from '@angular/core';
import { EvenementService } from 'src/app/services/evenement.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  constructor(
    private evenementService: EvenementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe({
      next: (data) => {
        this.evenements = data;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des événements: ' + error.message;
        console.error(error);
      }
    });
  }

  editEvenement(id: number): void {
    this.router.navigate(['/evenement/edit', id]);
  }

  deleteEvenement(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      this.evenementService.deleteEvenement(id).subscribe(
        (response) => {
          console.log('Événement supprimé:', response);
          this.loadEvenements(); // Recharger la liste après suppression
        },
        (error) => {
          console.error('Erreur lors de la suppression de l\'événement', error);
          // Gestion d'erreur avec une notification ou autre
        }
      );
    }
  }
}
