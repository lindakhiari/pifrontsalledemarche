import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationService } from '../../services/formation.service';
import { AuthService } from '../../services/auth.service'; // Import du service AuthService
import { FormsModule } from '@angular/forms'; // Importer FormsModule
import { CommonModule } from '@angular/common'; // Importer CommonModule
import { RouterModule } from '@angular/router'; // Importer RouterModule

@Component({
  selector: 'app-formation-edit',
  templateUrl: './formation-edit.component.html',
  styleUrls: ['./formation-edit.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class FormationEditComponent implements OnInit {
  formation: any;

  constructor(
    private formationService: FormationService,
    private authService: AuthService, // Injection du service AuthService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (!token) {
      alert('Vous devez être connecté pour accéder à cette page.');
     
      return;
    }

    const id = +this.route.snapshot.paramMap.get('id')!;
    this.formationService.getFormationById(id).subscribe({
      next: (data: any) => {
        this.formation = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la formation:', error);
        alert('Impossible de charger les données de la formation.');
      },
    });
  }

  updateFormation(): void {
    const token = this.authService.getToken();
    if (!token) {
      alert('Votre session a expiré. Veuillez vous reconnecter.');
     
      return;
    }

    this.formationService.updateFormation(this.formation.id, this.formation).subscribe({
      next: (data) => {
        console.log('Formation mise à jour avec succès:', data);
        this.router.navigate(['/formations']);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de la formation:', error);
        alert('Une erreur s\'est produite lors de la mise à jour de la formation. Veuillez réessayer.');
      },
    });
  }
}
