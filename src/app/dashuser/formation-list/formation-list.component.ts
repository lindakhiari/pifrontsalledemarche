import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../services/formation.service';
import { InscriptionService } from '../../services/inscription.service';
import { ActivatedRoute, Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formation-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.scss'],
})
export class FormationListComponent implements OnInit {
  formations: any[] = [];
  errorMessage: string = '';
  message: string = '';
  isSuccess: boolean = false;
  idUtilisateur: number = 0;

  constructor(
    private formationService: FormationService,
    private inscriptionService: InscriptionService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFormations();
    this.idUtilisateur = Number(localStorage.getItem('user_id'));
    console.log('ID utilisateur:', this.idUtilisateur);
  }

  loadFormations(): void {
    this.formationService.getFormations().subscribe({
      next: (data) => (this.formations = data),
      error: (err) => {
        console.error('Erreur lors du chargement des formations:', err);
        this.errorMessage = 'Impossible de charger les formations.';
      },
    });
  }

  inscrire(idFormation: number): void {
    if (!this.idUtilisateur || !idFormation) {
      this.message = 'Veuillez remplir tous les champs correctement.';
      this.isSuccess = false;
      return;
    }

    this.inscriptionService.inscrireAFormation(this.idUtilisateur, idFormation).subscribe({
      next: (response: any) => {
        this.message = response.message || 'Inscription réussie !';
        this.isSuccess = true;
      },
      error: () => {
        this.message = 'Erreur lors de l\'inscription. Veuillez réessayer.';
        this.isSuccess = false;
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/market-chart']);
  }
}
