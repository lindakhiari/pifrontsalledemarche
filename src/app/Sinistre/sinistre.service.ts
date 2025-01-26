import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SinistreService {

  sinistres: any[] = []; // Liste pour stocker les résultats
  startDate!: string; // Date de début
  endDate!: string;
  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/api'; // URL du backend

  constructor(private http: HttpClient) {}

  // Récupérer tous les sinistres
  getAllSinistres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  addSinistre(sinistre: any): Observable<any> {
    const params = new HttpParams()
      .set('nomProduit', sinistre.nomProduit)
      .set('dateSinistre', sinistre.dateSinistre)
      .set('montantSinistre', sinistre.montantSinistre.toString())
      .set('etatSinistre', sinistre.etatSinistre);
  
    return this.http.post<any>(`${this.apiUrl}/ajouter`, null, { params });
  }
  // Supprimer un sinistre par ID
  deleteSinistre(id: number): Observable<any> {
    if (!id) {
      console.error('L\'ID fourni pour la suppression est invalide ou non défini.');
      throw new Error('ID invalide pour la suppression');
    }
  
    return this.http.delete(`${this.apiUrl}/sinistre/delete/${id}`);
  }

  updateSinistre(id: number, updates: any): Observable<any> {
    console.log('URL utilisée pour la mise à jour :', `${this.apiUrl}sinistre//update/${id}`);
    console.log('Données envoyées :', updates);
    return this.http.put<any>(`${this.apiUrl}/sinistre/update/${id}`, updates);
  }

  getSinistreById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sinistreDTO/${id}`);
  }
  

  getSinistresByDateRange(startDate: string, endDate: string): Observable<any[]> {
    const params = new HttpParams()
      .set('startDate',startDate)
      .set('endDate', endDate);
  
    return this.http.get<any[]>(`${this.apiUrl}/date-range`, { params });
  }
  
}
