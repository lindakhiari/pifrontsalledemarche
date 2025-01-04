import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAssuranceComponent } from './produit-assurance.component';

describe('ProduitAssuranceComponent', () => {
  let component: ProduitAssuranceComponent;
  let fixture: ComponentFixture<ProduitAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitAssuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
