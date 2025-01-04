import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistreEditComponent } from './sinistre-edit.component';

describe('SinistreEditComponent', () => {
  let component: SinistreEditComponent;
  let fixture: ComponentFixture<SinistreEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinistreEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinistreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
