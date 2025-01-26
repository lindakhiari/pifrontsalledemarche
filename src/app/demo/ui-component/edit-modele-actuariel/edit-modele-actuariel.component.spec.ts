import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeleActuarielComponent } from './edit-modele-actuariel.component';

describe('EditModeleActuarielComponent', () => {
  let component: EditModeleActuarielComponent;
  let fixture: ComponentFixture<EditModeleActuarielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditModeleActuarielComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditModeleActuarielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
