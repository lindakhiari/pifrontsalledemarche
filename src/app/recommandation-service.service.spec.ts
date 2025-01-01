import { TestBed } from '@angular/core/testing';
import { RecommandationService } from './services/recommandation-service.service'; // Correct importation

describe('RecommandationService', () => { // Nom du service corrigé
  let service: RecommandationService; // Utilisation correcte du nom du service

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommandationService); // Injection du service
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test si le service est correctement créé
  });
});
