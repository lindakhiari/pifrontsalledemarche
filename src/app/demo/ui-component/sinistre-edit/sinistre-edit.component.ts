

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { SinistreService } from 'src/app/Sinistre/sinistre.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
@Component({
  selector: 'app-sinistre-edit',
  templateUrl: './sinistre-edit.component.html',
  styleUrls: ['./sinistre-edit.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SinistreEditComponent implements OnInit {
  editForm!: FormGroup;
  sinistreId!: number;

  constructor(
    private fb: FormBuilder,
    private sinistreService: SinistreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sinistreId = Number(this.route.snapshot.paramMap.get('id'));

    // Charger les données du sinistre
    this.sinistreService.getSinistreById(this.sinistreId).subscribe((sinistre) => {
      console.log(sinistre)
      if (sinistre.dateSinistre) {
        sinistre.dateSinistre = this.formatDate(sinistre.dateSinistre);
      }
      this.editForm.patchValue(sinistre);
    });

    this.editForm = this.fb.group({
      nomProduit: ['', Validators.required],
      dateSinistre: ['', Validators.required],
      montantSinistre: [0, [Validators.required, Validators.min(0)]],
      etatSinistre: ['', Validators.required]
    });
  }
  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  updateSinistre(): void {
    if (this.editForm.invalid) {
      alert('Veuillez remplir correctement le formulaire.');
      return;
    }
  
    // Create a copy of the form values and convert montantSinistre to a string
    const updates = { ...this.editForm.value, montantSinistre: String(this.editForm.value.montantSinistre) };
  
    // Call the service with the updated values
    this.sinistreService.updateSinistre(this.sinistreId, updates).subscribe({
      next: (response) => {
        alert('Sinistre modifié avec succès.');
        this.router.navigate(['/sinistres']); // Retour à la liste
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour :', err);
        alert('Erreur lors de la mise à jour.');
      }
    });
  }
  
  cancel(): void {
    this.router.navigate(['/sinistres']); // Retour à la liste sans modification
  }
}
