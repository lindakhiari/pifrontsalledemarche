import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/formations';

  constructor(private http: HttpClient) {}

  // Générer les en-têtes d'autorisation (sans token)
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    if (error.status === 401) {
      console.error('Erreur 401 - Non autorisé :', error.message);
    } else {
      console.error('Erreur API :', error);
    }
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }

  // Récupérer les formations
  getFormations(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/afficher`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  addFormation(formation: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/ajouter`, formation, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  deleteFormation(id: number): Observable<{ success: boolean; message: string }> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.apiUrl}/supprimer/${id}`, { headers, responseType: 'text' })
      .pipe(
        map((response: string) => ({
          success: true,
          message: response,
        })),
        catchError((error) => {
          console.error(`Erreur lors de la suppression de la formation avec ID ${id}:`, error);
          return throwError(() =>
            new Error(`Échec de la suppression de la formation: ${error.message || 'Erreur inconnue'}`)
          );
        })
      );
  }

  getFormationById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/afficher/${id}`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  updateFormation(id: number, formation: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/modifier/${id}`, formation, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
