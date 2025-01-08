
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitAssuranceService } from 'src/app/ProduitAssurance/produit-assurance.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
@Component({
  selector: 'app-edit-produit-assurance',
  standalone: true,

  templateUrl: './edit-produit-assurance.component.html',
  styleUrl: './edit-produit-assurance.component.scss',
 
  imports: [SharedModule],
})
export class EditProduitAssuranceComponent implements OnInit {
  editForm!: FormGroup;
  produitId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    private produitAssuranceService: ProduitAssuranceService
  ) {}

  ngOnInit(): void {
    this.produitId = Number(this.route.snapshot.paramMap.get('id')); // Récupère l'ID depuis l'URL

    // Initialisation du formulaire
    this.editForm = this.fb.group({
      nomProduit: ['', Validators.required],
      prime: [0, [Validators.required, Validators.min(0)]],
      couverture: [0, [Validators.required, Validators.min(0)]],
      atype: ['', Validators.required]
    });

    // Charger les données du produit
    this.produitAssuranceService.getProduitAssuranceById(this.produitId).subscribe({
      next: (produit) => {
        console.log("proddd:",produit)
        this.editForm.patchValue(produit); // Pré-remplit le formulaire avec les données existantes
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit :', err);
        alert('Impossible de charger les données du produit.');
      }
    });
  }

  // Méthode pour soumettre les modifications
  updateProduit(): void {
    if (this.editForm.valid) {
      const updatedProduit = { ...this.editForm.value, idProduit: this.produitId };

      this.produitAssuranceService.updateProduitAssurance(updatedProduit).subscribe({
        next: () => {
          alert('Produit modifié avec succès.');
          this.router.navigate(['/produits']); // Redirection après modification
        },
        error: (err) => {
          console.error('Erreur lors de la modification du produit :', err);
          alert('Erreur lors de la modification du produit.');
        }
      });
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
