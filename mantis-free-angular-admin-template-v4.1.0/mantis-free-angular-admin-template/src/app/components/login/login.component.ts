import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.isLoading = true;

    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:8089/ProjetSalleDeMarche/api/auth/login', loginData)
      .subscribe({
        next: (response: any) => {
          console.log('Login response:', response);

          // Récupérer le token, type et les rôles
          const token = `${response.tokenType}${response.tokenType.trim() ? ' ' : ''}${response.accessToken}`;
          const roles = response.roles || [];

          // Sauvegarder le token et les rôles dans un objet structuré
          const authData = {
            token: token,
            roles: roles
          };

          // Sauvegarde dans localStorage sous forme de JSON
          localStorage.setItem('auth_data', JSON.stringify(authData));
          console.log('Auth data sauvegardé:', authData);

          // Redirection selon le rôle
          if (roles.includes('ADMIN')) {
            this.router.navigate(['/dashboard/default']); // Exemple pour un rôle admin
          } else if (roles.includes('USER')) {
            this.router.navigate(['/user/home']); // Exemple pour un rôle utilisateur
          } else {
            this.router.navigate(['/dashboard/default']); // Redirection par défaut
          }
        },
        error: (error) => {
          console.error('Login failed', error);
          this.errorMessage = error.error?.message || 'Échec de la connexion. Veuillez réessayer.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
