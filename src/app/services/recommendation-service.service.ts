import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecommendationServiceService {
  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/api/ia/recommandations';  // URL de votre API Spring

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les recommandations
  getRecommendations(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
