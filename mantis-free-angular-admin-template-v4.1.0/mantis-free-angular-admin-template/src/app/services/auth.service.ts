import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenSubject = new BehaviorSubject<string | null>(null);
  private userRoleSubject = new BehaviorSubject<string | null>(null); // Gestion des rôles
  private readonly tokenKey = 'auth_token';
  private readonly apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/api/auth';

  constructor(private http: HttpClient,private router: Router) {
    this.initializeToken();
  }

  private initializeToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      if (!this.estTokenExpire(token)) {
        this.authTokenSubject.next(token);
        const role = this.decodeRoleFromToken(token);
        this.userRoleSubject.next(role); // Initialiser le rôle
      } else {
        this.logout();
      }
    }
  }

  estTokenExpire(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = payload.exp * 1000;
      return expirationDate < Date.now();
    } catch (error) {
      console.error('Erreur lors de la vérification du token:', error);
      return true;
    }
  }

  getToken(): string | null {
    return this.authTokenSubject.getValue();
  }

  private decodeRoleFromToken(token: string): string | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (error) {
      console.error('Erreur lors du décodage du rôle:', error);
      return null;
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        const token = response.accessToken?.trim();
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          this.authTokenSubject.next(token);

          const role = this.decodeRoleFromToken(token);
          if (role) {
            this.userRoleSubject.next(role);
          } else {
            console.warn('Aucun rôle trouvé dans le JWT.');
          }
        } else {
          throw new Error('Aucun jeton JWT reçu.');
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
    this.authTokenSubject.next(null);
    this.userRoleSubject.next(null);
    this.router.navigate(['/login']); 
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.estTokenExpire(token);
  }

  getUserRole(): string | null {
    return this.userRoleSubject.getValue();
  }

  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  private handleError(error: any): Observable<never> {
    console.error('Erreur HTTP:', error);
    return throwError(() => new Error(error.error?.message || 'Erreur serveur.'));
  }
}
