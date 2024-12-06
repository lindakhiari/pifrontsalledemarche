import { Component, OnInit } from '@angular/core';
import { EvenementService } from 'src/app/services/evenement.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
@Component({
  selector: 'app-evenement-add',
  templateUrl: './evenement-add.component.html',
  styleUrls: ['./evenement-add.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule], // Ajoutez les modules nécessaires ici
})
export class EvenementAddComponent implements OnInit {
  evenementForm: FormGroup;

  constructor(
    private evenementService: EvenementService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.evenementForm = this.fb.group({
      nomEvenement: ['', [Validators.required]],  // Utiliser 'nomEvenement' ici
      description: [''],
      dateDebut: ['', [Validators.required]],
      dateFin: ['', [Validators.required]],
      prix: ['', [Validators.required, Validators.min(0)]], // Ajout du champ prix
    });
  }

  onSubmit(): void {
    console.log(this.evenementForm.value); // Log des valeurs du formulaire
    if (this.evenementForm.valid) {
      this.evenementService.addEvenement(this.evenementForm.value).subscribe(
        (response) => {
          console.log('Événement ajouté:', response);
          this.router.navigate(['/evenements']);
        },
        (error) => {
          console.error("Erreur lors de l'ajout de l'événement", error);
        }
      );
    } else {
      console.log('Le formulaire est invalide');
    }
  }
}