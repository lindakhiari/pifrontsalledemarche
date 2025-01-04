import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ModeleActuariel {
  idModele: number;
  nomActif: string;
  dateCalcul: string;
  valeurEstimee: number;
  // Ajoutez les autres propriétés si nécessaire
}

@Injectable({
  providedIn: 'root',
})
export class ModeleActuarielService {
  private baseUrl = 'http://localhost:80/SalleDeMarche/api'; // Changez l'URL si nécessaire

  constructor(private http: HttpClient) {}

  // Ajouter un modèle actuariel
  addModeleActuariel(modeleActuariel: ModeleActuariel): Observable<ModeleActuariel> {
    return this.http.post<ModeleActuariel>(`${this.baseUrl}/modelactuariel/ajout`, modeleActuariel);
  }

  // Récupérer un modèle actuariel par ID
  getModeleActuariel(id: number): Observable<ModeleActuariel> {
    return this.http.get<ModeleActuariel>(`${this.baseUrl}/modelactuariel/${id}`);
  }

  // Récupérer tous les modèles actuariels
  getAllModeleActuariels(): Observable<ModeleActuariel[]> {
    return this.http.get<ModeleActuariel[]>(`${this.baseUrl}/modelactuariel`);
  }

  // Supprimer un modèle actuariel par ID
  deleteModeleActuariel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/modelactuariel/delete/${id}`);
  }

  // Mettre à jour un modèle actuariel
  updateModeleActuariel(modeleActuariel: ModeleActuariel): Observable<ModeleActuariel> {
    return this.http.put<ModeleActuariel>(`${this.baseUrl}/modelactuariel/update`, modeleActuariel);
  }

  // Calculer la valeur estimée
  calculateValeurEstimee(
    nomActif: string,
    dateCalcul: string,
    saveToDatabase: boolean
  ): Observable<any> {
    const params = new HttpParams()
      .set('nomActif', nomActif)
      .set('dateCalcul', dateCalcul)
      .set('saveToDatabase', saveToDatabase.toString());
    return this.http.get<any>(`${this.baseUrl}/calculateValeurEstimee`, { params });
  }

  // Récupérer les prédictions par nom d'actif
  getPredictionsByAssetName(nomActif: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/predictions/${nomActif}`);
  }

  // Récupérer le graphique des prédictions (base64)
  getPredictionChart(nomActif: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/predictions/chart/${nomActif}`);
  }
}
