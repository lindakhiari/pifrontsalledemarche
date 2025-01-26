import { Component, OnInit } from '@angular/core';
import { SinistreService } from 'src/app/Sinistre/sinistre.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sinistre-s',
  templateUrl: './sinistre-s.component.html',
  styleUrls: ['./sinistre-s.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class SinistreSComponent implements OnInit {
 // Liste pour stocker les résultats
 
  startDate!: string; // Date de début
  endDate!: string; // Date de fin
  filteredSinistres: any[] = [];
  newSinistre  = { nomProduit: '', dateSinistre: '', montantSinistre: 0, etatSinistre: '' };
  dateRange: { startDate: string; endDate: string } = { startDate: '', endDate: '' };
  sinistres: any[] = [];
  sinistreForm!: FormGroup;
  
  isEditMode: boolean = false;
  editingSinistreId!: number;
  
  
  constructor(private sinistreService: SinistreService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Initialisation du formulaire
    this.sinistreForm = this.fb.group({
      nomProduit: ['', Validators.required],
      dateSinistre: ['', Validators.required],
      montantSinistre: [0, [Validators.required, Validators.min(0)]],
      etatSinistre: ['', Validators.required]
    });
    this.getAllSinistres();
  }
  // ngOnInit(): void {
  //   this.getAllSinistres();
  //   this.loadSinistres();
  // }
  loadSinistres(): void {
    this.sinistreService.getAllSinistres().subscribe((data) => {
      this.sinistres = data;
    });
  }

  
  getAllSinistres(): void {
    this.sinistreService.getAllSinistres().subscribe({
      next: (data) => {
        this.sinistres = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des sinistres:', err);
      },
    });
  }

  addSinistre(): void {
    if (this.sinistreForm.invalid) {
      alert('Veuillez remplir correctement le formulaire');
      return;
    }
  
    const sinistreData = this.sinistreForm.value;
  
    this.sinistreService.addSinistre(sinistreData).subscribe({
      next: (response) => {
        console.log('Sinistre ajouté avec succès :', response);
        alert('Sinistre ajouté avec succès');
        this.loadSinistres(); // Recharge la liste
        this.resetForm();
      },
      error: (err) => {
        console.error('Erreur lors de l\'ajout du sinistre :', err);
        alert('Erreur lors de l\'ajout');
      },
    });
  }
  


  deleteSinistre(id: number): void {
    console.log('Tentative de suppression pour l\'ID :', id);
  
    if (!id) {
      alert('L\'ID du sinistre est invalide. Impossible de supprimer.');
      return;
    }
  
    if (confirm('Êtes-vous sûr de vouloir supprimer ce sinistre ?')) {
      this.sinistreService.deleteSinistre(id).subscribe({
        next: () => {
          this.sinistres = this.sinistres.filter((sinistre) => sinistre.id !== id);
          alert('Sinistre supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du sinistre :', err);
          alert('Erreur lors de la suppression.');
        },
      });
    }
  }
  
  updateSinistre(id: number): void {
    this.router.navigate([`/sinistres/${id}/edit`]);
  }


  getSinistresByDate(): void {
    if (!this.dateRange.startDate || !this.dateRange.endDate) {
      alert('Veuillez sélectionner une plage de dates valide');
      return;
    }
  
    this.sinistreService.getSinistresByDateRange(this.dateRange.startDate, this.dateRange.endDate).subscribe({
      next: (data) => {
        console.log('Résultats de la recherche :', data);
        this.sinistres = data;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des sinistres par dates :', err);
      },
    });
  }

  
  editSinistre(id: number): void {
    this.router.navigate([`/sinistres/${id}/edit`]);
  }
  resetForm(): void {
    this.sinistreForm.reset();
    this.isEditMode = false;
    this.editingSinistreId = 0;
  }
}

