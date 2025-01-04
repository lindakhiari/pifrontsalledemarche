import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeleActuarielService } from 'src/app/ModeleActuariel/modele-actuariel.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-edit-modele-actuariel',
  standalone: true,
  templateUrl: './edit-modele-actuariel.component.html',
  styleUrl: './edit-modele-actuariel.component.scss',
  imports: [SharedModule],
})
export class EditModeleActuarielComponent implements OnInit {
  editForm!: FormGroup;
  modeleId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private modeleActuarielService: ModeleActuarielService
  ) {}

  private formatToDateInputValue(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.modeleId = Number(this.route.snapshot.paramMap.get('id')); // Récupère l'ID depuis l'URL

    // Initialisation du formulaire
    this.editForm = this.fb.group({
      nomActif: ['', Validators.required],
      dateCalcul: ['', Validators.required],
      valeurEstimee: [0, [Validators.required, Validators.min(0)]],
    });
    

    // Charger les données du modèle
    this.modeleActuarielService.getModeleActuariel(this.modeleId).subscribe({
      next: (modele) => {
        console.log("modle: ",modele)
        if (modele.dateCalcul) {
          modele.dateCalcul = this.formatToDateInputValue(modele.dateCalcul);
        }
        this.editForm.patchValue(modele);      },
      error: (err) => {
        console.error('Erreur lors du chargement du modèle :', err);
        alert('Impossible de charger les données du modèle.');
      },
    });
  }

  // Méthode pour soumettre les modifications
  updateModele(): void {
    if (this.editForm.valid) {
      const updatedModele = { ...this.editForm.value, idModele: this.modeleId };

      this.modeleActuarielService.updateModeleActuariel(updatedModele).subscribe({
        next: () => {
          alert('Modèle modifié avec succès.');
          this.router.navigate(['/modeles']); // Redirection après modification
        },
        error: (err) => {
          console.error('Erreur lors de la modification du modèle :', err);
          alert('Erreur lors de la modification du modèle.');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
