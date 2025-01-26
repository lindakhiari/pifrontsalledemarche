import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cloneSVG } from '@ant-design/icons-angular';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MonthlyBarChartComponent } from "../../default/dashboard/monthly-bar-chart/monthly-bar-chart.component";
import { Router } from '@angular/router';
import { ModeleActuariel, ModeleActuarielService } from 'src/app/ModeleActuariel/modele-actuariel.service';
import { ProduitAssurance, ProduitAssuranceService } from 'src/app/ProduitAssurance/produit-assurance.service';

@Component({
  selector: 'app-modele-actuariel',
  standalone: true,
  imports: [SharedModule, MonthlyBarChartComponent],
  templateUrl: './modele-actuariel.component.html',
  styleUrl: './modele-actuariel.component.scss',
})
export class ModeleActuarielComponent implements OnInit {
  modeleActuariels: ModeleActuariel[] = [];
  produitsAssurance: ProduitAssurance[] = [];
  selectedModele: ModeleActuariel | null = null;
  modeleForm!: FormGroup;
  predictionChartBase64: string | null = null;
  predictions: any[] = [];

  constructor(
    private modeleActuarielService: ModeleActuarielService,
    private produitAssuranceService: ProduitAssuranceService,
    private fb: FormBuilder, 
    private router: Router
  ) {}


  
  ngOnInit(): void {
    this.modeleForm = this.fb.group({
      produitAssurance: [null, Validators.required],
      dateCalcul: ['', Validators.required],
      saveToDatabase: [false, Validators.required],
      Mtype: ['MODELISATION_SINISTRE'], // Default value
      typeModele: ['MODELISATION_SINISTRE'], // Default value
      valeurEstimee: [null],
    });

    this.syncMtypeWithTypeModele();
    // Load data
    this.loadModeleActuariels();
    this.loadProduitsAssurance(); // Load products for the dropdown
  }


// Sync Mtype with typeModele
private syncMtypeWithTypeModele(): void {
  this.modeleForm.get('typeModele')?.valueChanges.subscribe((newValue) => {
    // Update Mtype whenever typeModele changes
    this.modeleForm.patchValue({
      Mtype: newValue,
    }, { emitEvent: false }); // Prevent circular updates
  });
}
  // Load products for the dropdown
  loadProduitsAssurance(): void {
    this.produitAssuranceService.getAllProduitsAssurance().subscribe({
      next: (data) => {
        this.produitsAssurance = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits assurance :', err);
      },
    });
  }

  // Charger les modèles actuariels
  loadModeleActuariels(): void {
    this.modeleActuarielService.getAllModeleActuariels().subscribe({
      next: (data) => {
        this.modeleActuariels = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des modèles actuariels :', err);
      },
    });
  }

  // Ajouter un modèle actuariel
  addModeleActuariel(): void {
    if (this.modeleForm.valid) {
      const modeleActuariel: any = this.modeleForm.value;
      console.log(modeleActuariel)
      console.log(this.modeleForm.value.produitAssurance)
      modeleActuariel.nomActif=this.modeleForm.value.produitAssurance.nomProduit
      modeleActuariel.mtype=this.modeleForm.value.Mtype
      this.modeleActuarielService.addModeleActuariel(modeleActuariel as ModeleActuariel).subscribe({
        next: () => {
          alert('Modèle ajouté avec succès');
          this.loadModeleActuariels();
          this.modeleForm.reset();
        },
        error: (err) => {
          console.error('Erreur lors de l’ajout du modèle actuariel :', err);
        },
      });
    }
  }

  // Calculer la valeur estimée
  calculateValeurEstimee(): void {
    const { produitAssurance, dateCalcul, saveToDatabase } = this.modeleForm.value;
    this.modeleActuarielService.calculateValeurEstimee(produitAssurance.nomProduit.replace("Assurance ",""), dateCalcul, saveToDatabase).subscribe({
      next: (result) => {
        alert('Valeur estimée calculée avec succès: '+result.valeurEstimee);
        this.modeleForm.patchValue({
          valeurEstimee: result.valeurEstimee
        });
        console.log('Valeur estimée :', result);
        
        if (saveToDatabase) {
          this.loadModeleActuariels();
        }
      },
      error: (err) => {
        console.error('Erreur lors du calcul de la valeur estimée :', err);
      },
    });
  }

  // Récupérer les prédictions pour un actif donné
  getPredictionsByAssetName(nomActif: string): void {
    nomActif=nomActif.replaceAll("\\d+$", "")
    console.log(nomActif)
    this.modeleActuarielService.getPredictionsByAssetName(nomActif.replace(/^Assurance\s*/, '').replace(/\d+$/, '')).subscribe({
      next: (predictions) => {
        this.predictions = predictions;
        console.log('Prédictions récupérées :', this.predictions);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des prédictions :', err);
      },
    });
  }
  

  // Afficher le graphique des prédictions
  showPredictionChart(nomActif: string): void {
    nomActif=nomActif.replace(/\d+$/, '')
    console.log(nomActif)
    this.modeleActuarielService.getPredictionChart(nomActif).subscribe({
      next: (chartBase64) => {
        this.predictionChartBase64 = chartBase64;
        console.log('Graphique des prédictions récupéré :', this.predictionChartBase64);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du graphique des prédictions :', err);
      },
    });
  }

  // Sélectionner un modèle pour affichage ou modification
  selectModele(modele: ModeleActuariel): void {
    this.selectedModele = modele;
    this.modeleForm.patchValue(modele);
  }

  // Mettre à jour un modèle actuariel
  updateModeleActuariel(id): void {
    // if (this.modeleForm.valid && this.selectedModele) {
    //   const updatedModele = { ...this.selectedModele, ...this.modeleForm.value };
    //   this.modeleActuarielService.updateModeleActuariel(updatedModele).subscribe({
    //     next: () => {
    //       alert('Modèle mis à jour avec succès');
    //       this.loadModeleActuariels();
    //       this.modeleForm.reset();
    //       this.selectedModele = null;
    //     },
    //     error: (err) => {
    //       console.error('Erreur lors de la mise à jour du modèle actuariel :', err);
    //     },
    //   });
    // }
    this.router.navigate([`/modeles/${id}/edit`]);

  }

  // Supprimer un modèle actuariel
  deleteModeleActuariel(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce modèle actuariel ?')) {
      this.modeleActuarielService.deleteModeleActuariel(id).subscribe({
        next: () => {
          alert('Modèle supprimé avec succès');
          this.loadModeleActuariels();
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du modèle actuariel :', err);
        },
      });
    }
  }
}
