import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Project import
import { AdminComponent } from './theme/layouts/admin-layout/admin-layout.component';
import { GuestComponent } from './theme/layouts/guest/guest.component';
import { RecommendationChartComponent } from './recommendation-chart/recommendation-chart.component';  // Import du composant
import { SentimentChartComponent } from './components/sentiment-chart/sentiment-chart.component';

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
      { path: 'recommendation-chart', component: RecommendationChartComponent },
      { path: 'review-chart', loadComponent: () => import('src/app/components/sentiment-chart/sentiment-chart.component').then(m => m.SentimentChartComponent) },
      { path: 'Formation', loadComponent: () => import('src/app/components/formation-add/formation-add.component').then(m => m.FormationAddComponent) },
      { path: 'formations/edit/:id', loadComponent: () => import('./components/formation-edit/formation-edit.component').then(m => m.FormationEditComponent) },
      { path: 'evenement/edit/:id', loadComponent: () => import('src/app/components/evenement-edit/evenement-edit.component').then(m => m.EvenementEditComponent) },
      { path: 'liste-user', loadComponent: () => import('./components/user-list/user-list.component').then(m => m.UserListComponent) },
      { path: 'modifier-user/:id', loadComponent: () => import('src/app/user-edit/user-edit.component').then(m => m.UserEditComponent) },
      { path: 'dashboard/default', loadComponent: () => import('./demo/default/dashboard/dashboard.component').then(c => c.DefaultComponent) },


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
