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
  imports: [FormsModule, CommonModule,RouterModule],
})
export class EvenementListComponent implements OnInit {
  evenements: any[] = [];

  constructor(
    private evenementService: EvenementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe(
      (data) => {
        console.log('Données récupérées:', data);
        this.evenements = data.map((evenement: any) => {
          return {
            ...evenement,
            dateDebut: new Date(evenement.dateDebut),
            dateFin: new Date(evenement.dateFin),
          };
        });
      },
      (error) => {
        console.error('Erreur lors du chargement des événements', error);
      }
    );
  }
  

  editEvenement(id: number): void {
    this.router.navigate(['/evenement/edit', id]);
  }

  deleteEvenement(id: number): void {
    this.evenementService.deleteEvenement(id).subscribe(
      (response) => {
        console.log('Événement supprimé:', response);
        this.loadEvenements(); // Recharger la liste après suppression
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'événement', error);
      }
    );
  }
}
