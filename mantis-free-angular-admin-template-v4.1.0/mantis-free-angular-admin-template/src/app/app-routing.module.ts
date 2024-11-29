import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/register',
        pathMatch: 'full'
      },
      {
        path: 'dashboard/default',
        loadComponent: () => import('./demo/default/dashboard/dashboard.component').then(c => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('src/app/components/evenement-add/evenement-add.component').then(m => m.EvenementAddComponent)
      },
      {
        path: 'evenements',
        loadComponent: () => import('src/app/components/evenement-list/evenement-list.component').then(m => m.EvenementListComponent)
      },
      {
        path: 'formations',
        loadComponent: () =>  import('src/app/components/formation-list/formation-list.component').then(m => m.FormationListComponent)
      },
     
      {
        path: 'color',
        loadComponent: () => import('src/app/components/formation-add/formation-add.component').then(m => m.FormationAddComponent)
      },
      {
        path: 'formations/edit/:id',
        loadComponent: () => import('./components/formation-edit/formation-edit.component').then(m => m.FormationEditComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'progressions', // Ajout de la route pour le composant Progression
        loadComponent: () => import('./components/progression/progression.component').then(m => m.ProgressionComponent)
      },
     
      {
        path: 'evenement/edit/:id',
        loadComponent: () => import('src/app/components/evenement-edit/evenement-edit.component').then(m => m.EvenementEditComponent)
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [ {
      path: 'login', // Ajout de la route pour le composant Progression
      loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
    },
    
    {
      path: 'register', // Ajout de la route pour le composant Progression
      loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent)
    },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
