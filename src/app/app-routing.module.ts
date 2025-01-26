import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { RecommendationChartComponent } from './recommendation-chart/recommendation-chart.component';  // Import du composant
import { SentimentChartComponent } from './components/sentiment-chart/sentiment-chart.component';
import { SinistreEditComponent } from './demo/ui-component/sinistre-edit/sinistre-edit.component';
import { EditProduitAssuranceComponent } from './demo/ui-component/edit-produit-assurance/edit-produit-assurance.component';
import { EditModeleActuarielComponent } from './demo/ui-component/edit-modele-actuariel/edit-modele-actuariel.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'Evenement', loadComponent: () => import('src/app/components/evenement-add/evenement-add.component').then(m => m.EvenementAddComponent) },
      { path: 'evenements', loadComponent: () => import('src/app/components/evenement-list/evenement-list.component').then(m => m.EvenementListComponent) },
      { path: 'formations', loadComponent: () => import('src/app/components/formation-list/formation-list.component').then(m => m.FormationListComponent) },
      { path: 'recommendations', loadComponent: () => import('src/app/components/recommendations-component/recommendations-component.component').then(m => m.RecommendationsComponentComponent) },
      { path: 'marche', loadComponent: () => import('src/app/marche/marche.component').then(m => m.MarcheComponent) },
      { path: 'dashMarche', loadComponent: () => import('src/app/dash-marche/dash-marche.component').then(m => m.DashMarcheComponent) },
      { path: 'recommendation-chart', component: RecommendationChartComponent },
      { path: 'review-chart', loadComponent: () => import('src/app/components/sentiment-chart/sentiment-chart.component').then(m => m.SentimentChartComponent) },
      { path: 'Formation', loadComponent: () => import('src/app/components/formation-add/formation-add.component').then(m => m.FormationAddComponent) },
      { path: 'formations/edit/:id', loadComponent: () => import('./components/formation-edit/formation-edit.component').then(m => m.FormationEditComponent) },
      { path: 'evenement/edit/:id', loadComponent: () => import('src/app/components/evenement-edit/evenement-edit.component').then(m => m.EvenementEditComponent) },
      { path: 'liste-user', loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent) },
      { path: 'modifier-user/:id', loadComponent: () => import('src/app/user-edit/user-edit.component').then(m => m.UserEditComponent) },
      { path: 'dashboard/default', loadComponent: () => import('./demo/default/dashboard/dashboard.component').then(c => c.DefaultComponent) },

      {
        path: 'produits',
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


    ]
  }
];

const userRoutes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./components/register/register.component').then(m => m.RegisterComponent) },
      { path: 'marche-user', loadComponent: () => import('src/app/dashuser/marche-user/marche-user.component').then(m => m.MarcheComponent)},
      // Ajoute ici la route pour le dashboard utilisateur
      { path: 'user-dashbord', loadComponent: () => import('src/app/components/user-dashboard/user-dashboard.component').then(m => m.UserDashboardComponent) },
      { path: 'market-chart', loadComponent: () => import('src/app/dashuser/market-chart/market-chart.component').then(m => m.MarketChartComponent) },
      { path: 'order-book', loadComponent: () => import('src/app/dashuser/order-book/order-book.component').then(m => m.OrderBookComponent) },
      { path: 'liste-formation', loadComponent: () => import('src/app/dashuser/formation-list/formation-list.component').then(m => m.FormationListComponent) },
      { path: 'liste-evenement', loadComponent: () => import('src/app/dashuser/evenement-list/evenement-list.component').then(m => m.EvenementListComponent) },
      { path: 'review', loadComponent: () => import('src/app/components/review/review.component').then(m => m.ReviewComponent) },
      { path: 'jeux', loadComponent: () => import('src/app/trading-training/trading-training.component').then(m => m.TradingTrainingComponent) },


    ]
  }
];


const routes: Routes = [
  ...adminRoutes,  // Routes admin
  ...userRoutes    // Routes utilisateur
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
