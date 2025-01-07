import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PredictionResponse } from './fichierts/PredictionResponse';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private apiUrl = 'http://127.0.0.1:5000/predict';  // L'URL de votre API Flask

  constructor(private http: HttpClient) {}

  // Méthode pour récupérer les données financières
 
  getPredictions(): Observable<PredictionResponse> {
    return this.http.get<PredictionResponse>(this.apiUrl);
  }
}
