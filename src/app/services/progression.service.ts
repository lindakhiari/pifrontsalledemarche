import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgressionService {
  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/progressions';

  constructor(private http: HttpClient) {}

  // Méthode pour obtenir la durée totale d'une progression
  getTrainingDuration(progressionId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/${progressionId}/duration`).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération de la durée de la progression:', error);
        return throwError(error);
      })
    );
  }

  // Méthode pour mettre à jour le statut d'une progression
  updateProgressionStatus(progressionId: number): Observable<any> { // Here we keep it as 'any'
    return this.http.put<any>(`${this.apiUrl}/${progressionId}/update-status`, {}).pipe(
      catchError(error => {
        console.error('Erreur lors de la mise à jour du statut de la progression:', error);
        return throwError(error);
      })
    );
  }

  getAllProgressions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des progressions:', error);
        return throwError(error);
      })
    );
  }
}
