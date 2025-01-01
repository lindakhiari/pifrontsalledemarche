import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentimentChartService {

  private apiUrl = 'http://localhost:8089/ProjetSalleDeMarche/reviews/sentiment-percentage'; // URL de l'API Spring Boot

  constructor(private http: HttpClient) {}

  getSentimentPercentage(): Observable<{ positive: number; negative: number }> {
    return this.http.get<{ positive: number; negative: number }>(this.apiUrl);
  }
}
