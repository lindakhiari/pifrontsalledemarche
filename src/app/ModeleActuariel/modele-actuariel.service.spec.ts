import { TestBed } from '@angular/core/testing';

import { ModeleActuarielService } from './modele-actuariel.service';

describe('ModeleActuarielService', () => {
  let service: ModeleActuarielService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeleActuarielService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
