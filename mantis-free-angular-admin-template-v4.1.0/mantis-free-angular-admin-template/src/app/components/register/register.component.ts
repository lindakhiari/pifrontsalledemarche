import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  role: string = 'USER'; // Rôle par défaut

  errorMessage: string = '';
  isLoading: boolean = false;

  availableRoles: string[] = ['USER', 'ADMIN']; // Liste des rôles disponibles

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (!this.validateInput()) {
      this.errorMessage = 'Tous les champs sont requis et doivent être valides.';
      return;
    }

    this.isLoading = true;
    const registerData = {
      username: this.username,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role // Inclure le rôle sélectionné
    };

    this.http.post('http://localhost:8089/ProjetSalleDeMarche/api/auth/register', registerData, { responseType: 'text' })
      .subscribe({
        next: (response) => {
          alert(response);
          this.resetForm();
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = error.error || 'Échec de l’enregistrement. Réessayez.';
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }

  private validateInput(): boolean {
    return (
      this.username.trim() !== '' &&
      this.email.trim() !== '' &&
      this.password.trim() !== '' &&
      this.firstName.trim() !== '' &&
      this.lastName.trim() !== '' &&
      this.role.trim() !== ''
    );
  }

  private resetForm(): void {
    this.username = '';
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.role = 'USER'; // Réinitialiser le rôle par défaut
    this.errorMessage = '';
  }
}
