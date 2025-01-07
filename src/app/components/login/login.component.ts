import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // Vérification pour admin avec username et password "admin"
    if (this.username === 'admin' && this.password === 'admin') {
      // Simule un rôle d'administrateur sans utiliser JWT
      const token = 'dummy-token-for-admin'; // Token factice pour admin
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user_role', 'ROLE_ADMIN');

      console.log('Connexion réussie pour l\'administrateur');
      this.router.navigate(['/dashboard/default']); // Redirection tableau de bord admin
      return; // Arrête l'exécution ici si c'est l'admin
    }

    // Si ce n'est pas l'admin, on continue avec l'authentification via l'API pour l'utilisateur
    const loginData = { username: this.username, password: this.password };

    this.http.post('http://localhost:8089/ProjetSalleDeMarche/api/auth/login', loginData)
      .subscribe({
        next: (response: any) => {
          console.log('Réponse de connexion:', response);

          // Sauvegarde du token JWT et des rôles dans le localStorage
          const token = `${response.tokenType}${response.tokenType.trim() ? ' ' : ''}${response.accessToken}`;
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user_role', response.roles?.[0] || 'ROLE_USER'); // Par défaut, utilisateur

          // Sauvegarde de l'ID de l'utilisateur
          if (response.userId) {
            localStorage.setItem('user_id', response.userId); // Stocker l'ID utilisateur dans localStorage
            console.log('ID de l\'utilisateur sauvegardé dans localStorage:', response.userId);
          } else {
            console.error('ID de l\'utilisateur non trouvé');
          }

          // Redirection en fonction du rôle
          if (response.roles?.[0] === 'ROLE_ADMIN') {
            this.router.navigate(['/dashboard/default']); // Page admin
          } else {
            this.router.navigate(['/market-chart']); // Page utilisateur
          }
        },
        error: (error) => {
          console.error('Échec de la connexion', error);
          alert(`Erreur de connexion : ${error.error?.message || 'Erreur inconnue'}`);  // Affiche un message d'erreur
        }
      });
  }
}
