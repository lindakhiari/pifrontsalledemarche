import { TestBed } from '@angular/core/testing';

import { ProduitAssuranceService } from './produit-assurance.service';

describe('ProduitAssuranceService', () => {
  let service: ProduitAssuranceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitAssuranceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
