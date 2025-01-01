import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from 'src/app/services/evenement.service';
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { RouterModule } from '@angular/router'; // Importer RouterModule

@Component({
  selector: 'app-evenement-edit',
  templateUrl: './evenement-edit.component.html',
  styleUrls: ['./evenement-edit.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class EvenementEditComponent implements OnInit {
  evenement: any;

  constructor(
    private evenementService: EvenementService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;

    if (!id) {
      alert('L\'ID de l\'événement est invalide.');
      return;
    }

    this.evenementService.getEvenementById(id).subscribe({
      next: (data: any) => {
        if (data && data.idEvenement) {
          this.evenement = data;
          console.log(this.evenement);  // Vérifiez si l'objet événement contient bien `idEvenement`
        } else {
          alert('Événement non trouvé.');
          this.router.navigate(['/evenement']);
        }
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'événement:', error);
        alert('Impossible de charger les données de l\'événement.');
      },
    });
  }

  updateEvenement(): void {
    if (!this.evenement || !this.evenement.idEvenement) {
      console.error('ID de l\'événement manquant');
      alert('L\'ID de l\'événement est invalide.');
      return;
    }

    // Assurez-vous que l'ID est bien passé dans la méthode d'update
    this.evenementService.updateEvenement(this.evenement.idEvenement, this.evenement).subscribe({
      next: (data) => {
        console.log('Événement mis à jour avec succès:', data);
        this.router.navigate(['/evenements']);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'événement:', error);
        alert('Une erreur s\'est produite lors de la mise à jour de l\'événement. Veuillez réessayer.');
      },
    });
  }
}
