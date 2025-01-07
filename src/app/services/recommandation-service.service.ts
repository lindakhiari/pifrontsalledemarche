import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'; // Importer catchError pour gérer les erreurs

@Injectable({
  providedIn: 'root'
})
export class RecommandationService {  // Simplification du nom du service

  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/recommendations/recommendation';  // URL de votre API Spring


  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les recommandations
  getRecommandations(): Observable<any[]> {
    console.log('Tentative de récupération des recommandations depuis l\'URL:', this.apiUrl); // Log de l'URL
  
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap(data => {
        console.log('Données récupérées:', data); // Log des données récupérées
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des recommandations', error);
        return of([]); // Retourne un Observable avec une liste vide en cas d'erreur
      })
    );
  }
  
}
