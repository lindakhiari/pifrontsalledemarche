import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptioneventComponent } from './inscriptionevent.component';

describe('InscriptioneventComponent', () => {
  let component: InscriptioneventComponent;
  let fixture: ComponentFixture<InscriptioneventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InscriptioneventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptioneventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
