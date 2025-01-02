import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule, formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,],
  standalone: true
})
export class MarcheComponent implements OnInit {
  actifs: any[] = [];
  actifForm!: FormGroup;
  historiqueForm!: FormGroup;
  editMode = false;
  currentActifId: number | null = null;
  currentActifHistorique: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.initForms();
    this.fetchActifs();
  }
  onSubmit() {
    if (this.actifForm.invalid) return;

    const actifData = this.actifForm.value;
    if (this.editMode && this.currentActifId !== null) {
      // Update existing Actif
      this.http.put(`http://localhost:8089/ProjetSalleDeMarche/api/actifs/${this.currentActifId}`, actifData)
        .subscribe(() => {
          this.fetchActifs();
          this.resetForm();
        });
    } else {
      // Create new Actif
      this.http.post('http://localhost:8089/ProjetSalleDeMarche/api/actifs', actifData)
        .subscribe(() => {
          this.fetchActifs();
          this.resetForm();
        });
    }
  }
  initForms() {
    this.actifForm = this.fb.group({
      nomActif: ['', [Validators.required]],
      valeurActuelle: ['', [Validators.required, Validators.min(0)]],
      typeActif: ['', Validators.required],
      marche: ['', Validators.required],
    });

    this.historiqueForm = this.fb.group({
      periode: ['', [Validators.required]],
      valeur: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onHistoriqueSubmit() {
    if (this.historiqueForm.invalid || this.currentActifId === null) return;
    const rawDate = this.historiqueForm.value.periode;
    const formattedDate = formatDate(rawDate, 'yyyy-MM-dd', 'en');
    const historiqueData = {
      ...this.historiqueForm.value,
      actifFinancier: { idActifFinancier: this.currentActifId },
    };

    this.http
      .post('http://localhost:8089/ProjetSalleDeMarche/api/historiques', historiqueData)
      .subscribe(() => {
        this.fetchHistorique(this.currentActifId!);
        this.historiqueForm.reset();
      });
  }

  fetchActifs() {
    this.http.get('http://localhost:8089/ProjetSalleDeMarche/api/actifs').subscribe((data: any) => {
      this.actifs = data;
    });
  }

  fetchHistorique(id: number) {
    this.http.get(`http://localhost:8089/ProjetSalleDeMarche/api/actifs/${id}/historiques`).subscribe((data: any) => {
      this.currentActifHistorique = data;
    });
  }

  onEdit(actif: any) {
    this.editMode = true;
    this.currentActifId = actif.idActifFinancier;
    this.actifForm.patchValue(actif);
    this.fetchHistorique(actif.idActifFinancier);
  }

  resetForm() {
    this.actifForm.reset();
    this.historiqueForm.reset();
    this.editMode = false;
    this.currentActifId = null;
    this.currentActifHistorique = [];
  }

  onDelete(id: number) {
    this.http.delete(`http://localhost:8089/ProjetSalleDeMarche/api/actifs/${id}`).subscribe(() => {
      this.fetchActifs();
    });
  }
}
