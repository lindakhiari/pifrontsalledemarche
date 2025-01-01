import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche'; // L'URL de votre backend (vous pouvez l'adapter si nécessaire)

  constructor(private http: HttpClient) { }


  /**
   * Inscrire un utilisateur à un événement
   * @param idUtilisateur ID de l'utilisateur
   * @param idEvenement ID de l'événement
   * @returns Observable avec une réponse JSON ou un message d'erreur
   */
  inscrireAEvent(idUtilisateur: number, idEvenement: number): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/evenements/inscrire/${idEvenement}/${idUtilisateur}`, {})
      .pipe(
        catchError((error) => {
          // Gestion des erreurs améliorée
          console.error('Erreur lors de l\'inscription à l\'événement:', error);
          return throwError(() => new Error('Échec de l\'inscription à l\'événement.'));
        })
      );
  }
  

  /**
   * Inscrire un utilisateur à une formation
   * @param idUtilisateur ID de l'utilisateur
   * @param idFormation ID de la formation
   * @returns Observable avec une réponse JSON ou un message d'erreur
   */
  inscrireAFormation(idUtilisateur: number, idFormation: number): Observable<any> {
    return this.http
      .post<string>(`${this.apiUrl}/formations/inscrire/${idFormation}/${idUtilisateur}`, {})
      .pipe(
        catchError((error) => {
          console.error('Erreur lors de l\'inscription à la formation:', error);
          return throwError(() => new Error('Échec de l\'inscription à la formation.'));
        })
      );
  }
}
