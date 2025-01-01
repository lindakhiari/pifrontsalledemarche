import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';  // Importation de BaseChartDirective

import { RouterModule } from '@angular/router'; // Assurez-vous d'importer RouterModule
import { LoginComponent } from 'src/app/components/login/login.component'; // Ajoutez vos composants ici
import { FormsModule } from '@angular/forms'; // Importez FormsModule ici
// Project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './theme/shared/shared.module'


@NgModule({
  declarations: [AppComponent], // N'incluez que AppComponent ici
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Assurez-vous que FormsModule est ici
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule ,


    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
