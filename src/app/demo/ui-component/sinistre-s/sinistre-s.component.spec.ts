import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinistreSComponent } from './sinistre-s.component';

describe('SinistreSComponent', () => {
  let component: SinistreSComponent;
  let fixture: ComponentFixture<SinistreSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinistreSComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinistreSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
