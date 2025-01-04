import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProduitAssuranceService } from 'src/app/ProduitAssurance/produit-assurance.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produit-assurance',
  templateUrl: './produit-assurance.component.html',
  styleUrls: ['./produit-assurance.component.scss'],
  standalone: true,
  imports: [SharedModule],
})
export class ProduitAssuranceComponent implements OnInit {
  produitsAssurance: any[] = [];
  produitForm!: FormGroup;
  ratioForm!: FormGroup; // Formulaire pour calculer le ratio Sinistre/Prime
  generateForm!: FormGroup; // Formulaire pour générer un produit d'assurance
  ratioResult: any; // Résultat du ratio Sinistre/Prime clos
  generatedProduit: any; // Résultat du produit généré
  isEditMode = false;
  selectedProduitId!: number;

  // Calculs
  primeResult: number | null = null;
  coverageResult: number | null = null;

  constructor(
    private produitAssuranceService: ProduitAssuranceService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProduitsAssurance();

    this.produitForm = this.fb.group({
      NomProduit: ['', Validators.required],
      prime: [0, [Validators.required, Validators.min(0)]],
      couverture: [0, [Validators.required, Validators.min(0)]],
      Atype: ['', Validators.required],
    });

    this.ratioForm = this.fb.group({
      nomProduit: ['', Validators.required],
    });

    this.generateForm = this.fb.group({
      nomActif: ['', Validators.required],
      dateCalcul: ['', Validators.required],
      typeAssurance: ['', Validators.required],
      idProfil: [0, Validators.required],
    });
  }

  loadProduitsAssurance(): void {
    this.produitAssuranceService.getAllProduitsAssurance().subscribe({
      next: (produits) => {
        this.produitsAssurance = produits;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
        alert('Erreur lors du chargement des produits.');
      },
    });
  }

  generateProduitAssurance(): void {
    if (this.generateForm.valid) {
      const data = this.generateForm.value;

      this.produitAssuranceService.calculatePrime(data.nomActif, data.dateCalcul).subscribe({
        next: (prime) => {
          this.primeResult = prime;
          console.log('Prime calculée:', prime);
        },
        error: (err) => {
          console.error('Erreur lors du calcul de la prime :', err);
        },
      });

      this.produitAssuranceService.calculateCoverage(data.nomActif, data.dateCalcul).subscribe({
        next: (coverage) => {
          this.coverageResult = coverage;
          console.log('Couverture calculée:', coverage);
        },
        error: (err) => {
          console.error('Erreur lors du calcul de la couverture :', err);
        },
      });

      this.produitAssuranceService.generateProduitAssurance(data).subscribe({
        next: (produit) => {
          this.generatedProduit = produit;
          alert('Produit généré avec succès.');
          this.loadProduitsAssurance();
        },
        error: (err) => {
          console.error('Erreur lors de la génération du produit :', err);
          alert('Erreur lors de la génération du produit.');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }

  calculateSinistrePrimeRatioForClos(): void {
    const nomProduit = this.ratioForm.value.nomProduit;
    this.produitAssuranceService.calculateSinistrePrimeRatioForClos(nomProduit).subscribe({
      next: (result) => {
        this.ratioResult = result;
        alert(`Ratio Sinistre/Prime clos pour ${nomProduit}: ${result.ratioSinistrePrimeClos}`);
      },
      error: (err) => {
        console.error('Erreur lors du calcul du ratio :', err);
        alert('Erreur lors du calcul du ratio.');
      },
    });
  }

  deleteProduit(idProduit: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.produitAssuranceService.deleteProduitAssurance(idProduit).subscribe({
        next: () => {
          alert('Produit supprimé avec succès.');
          this.loadProduitsAssurance();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du produit :', err);
        },
      });
    }
  }

  editProduit(id: any): void {
    this.router.navigate([`/produits/${id}/edit`]);
  }

  updateProduit(): void {
    if (this.generateForm.valid) {
      const data = this.generateForm.value;
      data.idProduit = this.selectedProduitId;

      this.produitAssuranceService.updateProduitAssurance(data).subscribe({
        next: () => {
          alert('Produit mis à jour avec succès.');
          this.isEditMode = false;
          this.loadProduitsAssurance();
          this.resetForm();
        },
        error: (err) => {
          console.error('Erreur lors de la mise à jour du produit :', err);
          alert('Erreur lors de la mise à jour du produit.');
        },
      });
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
  }

  resetForm(): void {
    this.generateForm.reset();
    this.isEditMode = false;
    this.selectedProduitId = null;
  }
}
