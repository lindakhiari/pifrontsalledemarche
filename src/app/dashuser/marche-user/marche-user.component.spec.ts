import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcheUserComponent } from './marche-user.component';

describe('MarcheUserComponent', () => {
  let component: MarcheUserComponent;
  let fixture: ComponentFixture<MarcheUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcheUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarcheUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
