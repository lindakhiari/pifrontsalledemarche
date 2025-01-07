import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userIdSubject = new BehaviorSubject<number | null>(null);  // Ajouter un BehaviorSubject pour l'ID utilisateur

  private authTokenSubject = new BehaviorSubject<string | null>(null);
  private readonly tokenKey = 'auth_token';
  private readonly apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/api/auth'; // URL d'authentification
  private readonly userIdKey = 'user_id';  // Clé pour l'ID utilisateur dans le localStorage

  constructor(private http: HttpClient) {
    this.initializeToken();
    this.initializeUserId();

  }

  // Initialiser le token au chargement
  private initializeToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      if (!this.estTokenExpire(token)) {
        this.authTokenSubject.next(token); // Initialiser le token si valide
      } else {
        this.logout(); // Supprimer le token expiré
      }
    }
  }
  private initializeUserId(): void {
    const userId = localStorage.getItem(this.userIdKey);
    if (userId) {
      this.userIdSubject.next(parseInt(userId, 10)); // Initialiser l'ID utilisateur si disponible
    }
  }

  // Vérifie si le token est expiré
  estTokenExpire(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload du JWT
      const expirationDate = payload.exp * 1000; // Expiration en millisecondes
      return expirationDate < Date.now(); // Comparer à la date actuelle
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return true; // Considérer comme expiré en cas d'erreur
    }
  }

  // Récupérer le token actuel
  getToken(): string | null {
    return this.authTokenSubject.getValue();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        const token = response.accessToken?.trim();
        const userId = response.userId;  // Récupérer l'ID utilisateur depuis la réponse

        if (token) {
          localStorage.setItem(this.tokenKey, token); // Stocker le token
          this.authTokenSubject.next(token);
        }

        if (userId) {
          localStorage.setItem(this.userIdKey, userId.toString()); // Stocker l'ID utilisateur
          this.userIdSubject.next(userId); // Mettre à jour le BehaviorSubject avec l'ID utilisateur
        }
      }),
      catchError((error) => {
        console.error('Erreur de connexion:', error);
        return throwError(() => new Error(error.error?.message || 'Échec de la connexion.'));
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userIdKey); // Supprimer l'ID utilisateur du stockage local
    this.authTokenSubject.next(null);
    this.userIdSubject.next(null); // Réinitialiser l'ID utilisateur
  }
  

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.estTokenExpire(token); // Vérifie l'existence et la validité du token
  }

  // Gestion des erreurs standardisée
  private handleError(error: any): Observable<never> {
    console.error('Erreur HTTP:', error);
    return throwError(() => new Error(error.error?.message || 'Erreur serveur.'));
  }

  getUsers(): Observable<any[]> {
    // Suppression de la gestion du token
    // Pas besoin de vérifier le token ou de l'ajouter dans les en-têtes
  
    // Utilisation de l'URL correcte directement ici
    return this.http.get<any[]>('http://localhost:8089/ProjetSalleDeMarche/api/users').pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return throwError(() => new Error(error.error?.message || 'Erreur lors de la récupération des utilisateurs.'));
      })
    );
  }
  
  // Méthode pour supprimer un utilisateur par ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8089/ProjetSalleDeMarche/user/supprimer/${id}`);
  }
  
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8089/ProjetSalleDeMarche/upade/${id}`, user);
  }
  
  getUserById(id: number): Observable<any> {
    // Effectuer la requête HTTP pour récupérer l'utilisateur par ID
    return this.http.get<any>(`http://localhost:8089/ProjetSalleDeMarche/find/${id}`).pipe(
      catchError((error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        return throwError(() => new Error(error.error?.message || 'Erreur lors de la récupération de l\'utilisateur.'));
      })
    );
  }
  
  
}
