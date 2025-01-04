import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleActuarielComponent } from './modele-actuariel.component';

describe('ModeleActuarielComponent', () => {
  let component: ModeleActuarielComponent;
  let fixture: ComponentFixture<ModeleActuarielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeleActuarielComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleActuarielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
