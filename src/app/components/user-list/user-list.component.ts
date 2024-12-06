import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Ajout de CommonModule
import { RouterModule } from '@angular/router';  // Ajouter l'importation du RouterModule
import { AuthService } from 'src/app/services/auth.service'; // Importation du service AuthService

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],  // Ajout de CommonModule dans imports
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: any[] = [];  // Liste des utilisateurs
  errorMessage: string = '';  // Message d'erreur s'il y en a

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Méthode pour récupérer les utilisateurs
  loadUsers(): void {
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.authService.deleteUser(id).subscribe({
        next: () => {
          // Retirer l'utilisateur de la liste après la suppression
          this.users = this.users.filter(user => user.id !== id);
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la suppression de l\'utilisateur.';
        }
      });
    }
  }
}
