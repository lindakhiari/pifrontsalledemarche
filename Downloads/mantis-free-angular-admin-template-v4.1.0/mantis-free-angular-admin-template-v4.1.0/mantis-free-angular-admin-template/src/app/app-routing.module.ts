// angular import
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { SinistreEditComponent } from './demo/ui-component/sinistre-edit/sinistre-edit.component';
import { EditProduitAssuranceComponent } from './demo/ui-component/edit-produit-assurance/edit-produit-assurance.component';
import { EditModeleActuarielComponent } from './demo/ui-component/edit-modele-actuariel/edit-modele-actuariel.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/default',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then((c) => c.DefaultComponent)
      },


      {
        path: 'produit-assurance',
        loadComponent: () => import('./demo/ui-component/produit-assurance/produit-assurance.component').then((c) => c.ProduitAssuranceComponent)
      },

      {
        path: 'modele-actuariel',
        loadComponent: () => import('./demo/ui-component/modele-actuariel/modele-actuariel.component').then((c) => c.ModeleActuarielComponent)
      },


      {
        path: 'sinistre-s',
        loadComponent: () => import('./demo/ui-component/sinistre-s/sinistre-s.component').then((c) => c.SinistreSComponent)
      },

      { path: 'sinistres/:id/edit', component: SinistreEditComponent },

      { path: 'produits/:id/edit', component: EditProduitAssuranceComponent },

      { path: 'modeles/:id/edit', component: EditModeleActuarielComponent },

      {
        
        path: 'typography',
        loadComponent: () => import('./demo/ui-component/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/ui-component/ui-color/ui-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/authentication/login/login.component')
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/authentication/register/register.component')
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
