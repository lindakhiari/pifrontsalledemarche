import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMarcheComponent } from './dash-marche.component';

describe('DashMarcheComponent', () => {
  let component: DashMarcheComponent;
  let fixture: ComponentFixture<DashMarcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashMarcheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashMarcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
