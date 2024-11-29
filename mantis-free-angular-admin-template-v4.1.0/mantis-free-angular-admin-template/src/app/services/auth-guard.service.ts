import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Vérifie si l'utilisateur est connecté
    if (this.authService.isLoggedIn()) {
      return true; // L'utilisateur est connecté
    } else {
      this.router.navigate(['/login']);
      return false; // L'utilisateur n'est pas connecté
    }
  }
}
