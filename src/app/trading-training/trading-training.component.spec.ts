import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingTrainingComponent } from './trading-training.component';

describe('TradingTrainingComponent', () => {
  let component: TradingTrainingComponent;
  let fixture: ComponentFixture<TradingTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradingTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
