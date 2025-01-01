import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importez RouterModule ici
import {  HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterModule],  // Ajoutez RouterModule ici
  templateUrl: './navbar.component.html',
  styleUrl: './styles.css'
})
export class NavbarComponent {
 
}
