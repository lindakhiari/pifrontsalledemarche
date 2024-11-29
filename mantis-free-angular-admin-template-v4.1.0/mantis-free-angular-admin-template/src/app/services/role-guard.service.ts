import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiredRole = next.data['role']; // Récupère le rôle nécessaire pour la route
    const userRole = this.authService.getUserRole(); // Récupère le rôle de l'utilisateur connecté

    if (this.authService.isLoggedIn() && userRole === requiredRole) {
      return true; // L'utilisateur est connecté et a le bon rôle
    } else {
      this.router.navigate(['/login']);
      return false; // L'utilisateur n'a pas le bon rôle ou n'est pas connecté
    }
  }
}
