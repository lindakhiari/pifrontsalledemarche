import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/reviews'; // URL du backend

  constructor(private http: HttpClient) {}

  // Ajouter un avis
  addReview(review: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, review);
  }

  // Obtenir le sentiment associé à un avis
  getReviewSentiment(reviewId: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${reviewId}/sentiment`, {
      responseType: 'text', // Le sentiment est une chaîne de caractères
    });
  }
}
