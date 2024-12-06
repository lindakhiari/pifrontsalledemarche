import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
})
export class UserEditComponent implements OnInit {
  user: any = { id: 0, username: '', email: '', firstName: '', lastName: '', roles: [] };

  constructor(
    private authService: AuthService, // Injection du service AuthService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.authService.getUserById(id).subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur:', error);
        alert('Impossible de charger les données de l\'utilisateur.');
      },
    });
  }

  updateUser(): void {
    // Assurez-vous que l'ID de l'utilisateur est correctement défini
    this.authService.updateUser(this.user.id, this.user).subscribe({
      next: (data) => {
        console.log('Utilisateur mis à jour avec succès:', data);
        this.router.navigate(['/liste-user']);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
        alert('Une erreur s\'est produite lors de la mise à jour de l\'utilisateur. Veuillez réessayer.');
      },
    });
  }
}
