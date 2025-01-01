import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionformationComponent } from './inscriptionformation.component';

describe('InscriptionformationComponent', () => {
  let component: InscriptionformationComponent;
  let fixture: ComponentFixture<InscriptionformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptionformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
