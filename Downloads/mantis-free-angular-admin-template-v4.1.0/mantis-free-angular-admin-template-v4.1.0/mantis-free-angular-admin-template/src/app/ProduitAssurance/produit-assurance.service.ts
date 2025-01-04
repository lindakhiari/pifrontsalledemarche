import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProduitAssurance {
  idProduit: number;
  nomProduit: string;
  prime: number;
  couverture: number;
  atype: string;
  profil: any; // Remplacez "any" par un type spécifique si disponible
}

@Injectable({
  providedIn: 'root',
})
export class ProduitAssuranceService {
  private apiUrl = 'http://localhost:80/SalleDeMarche/api';

  constructor(private http: HttpClient) {}

  getAllProduitsAssurance(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/produitassurance`);
  }
  

  // Ajouter un produit d'assurance
  addProduitAssurance(produit: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/ajout`, produit);
  }

  // Récupérer un produit d'assurance par ID
  getProduitAssuranceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/produitassurance/${id}`);
  }

  // Mettre à jour un produit d'assurance
  updateProduitAssurance(produit: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/produitassurance/update`, produit);
  }

  deleteProduitAssurance(idProduit: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:80/SalleDeMarche/api/produitassurance/delete/${idProduit}`);
  }

  // Calculer la prime
  calculatePrime(nomActif: string, dateCalcul: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/calculatePrime?nomActif=${nomActif}&dateCalcul=${dateCalcul}`
    );
  }

  // Calculer la couverture
  calculateCoverage(nomActif: string, dateCalcul: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/calculateCoverage?nomActif=${nomActif}&dateCalcul=${dateCalcul}`
    );
  }

  generateProduitAssurance(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/generate`, data);
  }

  // Calculer le ratio Sinistre/Prime
  calculateSinistrePrimeRatio(idProduit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sinistre-prime-ratio/${idProduit}`);
  }

  // Calculer le ratio Sinistre/Prime pour les sinistres clos
  calculateSinistrePrimeRatioForClos(nomProduit: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/calculateSinistrePrimeRatio/clos?nomProduit=${nomProduit}`
    );
  }

  // Récupérer les produits par plage de dates
  getProduitsByDateRange(startDate: string, endDate: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/date-rangeP?startDate=${startDate}&endDate=${endDate}`
    );
  }
}