import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProduitAssuranceComponent } from './edit-produit-assurance.component';

describe('EditProduitAssuranceComponent', () => {
  let component: EditProduitAssuranceComponent;
  let fixture: ComponentFixture<EditProduitAssuranceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProduitAssuranceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProduitAssuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
