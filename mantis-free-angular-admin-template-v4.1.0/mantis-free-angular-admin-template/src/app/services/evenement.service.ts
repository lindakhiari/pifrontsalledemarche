import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/evenements';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  // Générer les en-têtes d'autorisation
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    if (!token) {
      console.warn('Aucun jeton JWT trouvé.');
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('Erreur API :', error);
    return throwError(() => new Error(error.message || 'Erreur inconnue'));
  }

  // Récupérer tous les événements
  getEvenements(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/afficher`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Récupérer un événement par ID
  getEvenementById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/afficher/${id}`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Ajouter un événement
  addEvenement(evenement: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/ajouter`, evenement, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Modifier un événement
  updateEvenement(id: number, evenement: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put<any>(`${this.apiUrl}/modifier/${id}`, evenement, { headers }).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.error('Erreur 401 - Non autorisé :', error.message);
          // Ne redirige plus vers /login, mais retourne une erreur appropriée.
        } else {
          console.error('Erreur API :', error);
        }
        return throwError(() => new Error(error.message || 'Erreur inconnue'));
      })
    );
  }

  // Supprimer un événement
  deleteEvenement(id: number): Observable<{ success: boolean; message: string }> {
    const headers = this.getHeaders();
    return this.http
      .delete(`${this.apiUrl}/supprimer?idEvenement=${id}`, { headers, responseType: 'text' })
      .pipe(
        map((response: string) => ({
          success: true,
          message: response,
        })),
        catchError((error) => {
          console.error(`Erreur lors de la suppression de l'événement avec ID ${id}:`, error);
          return throwError(() =>
            new Error(`Échec de la suppression de l'événement: ${error.message || 'Erreur inconnue'}`)
          );
        })
      );
  }

  // Actions d'interaction avec un événement (like, vue, clic, favori)
  interactWithEvent(userId: number, eventId: number, interactionType: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post<any>(
      `${this.apiUrl}/interactions`,
      { userId, eventId, type: interactionType },
      { headers }
    ).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Récupérer les calendriers Google
  getCalendars(authorizationCode: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/calendriers?authorizationCode=${authorizationCode}`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }

  // Prédire le prix d'une action
  predictStockPrice(symbol: string): Observable<string> {
    const headers = this.getHeaders();
    return this.http.get<string>(`${this.apiUrl}/defi/predire-prix?symbol=${symbol}`, { headers }).pipe(
      catchError(this.handleError.bind(this))
    );
  }
}
