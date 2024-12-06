import { TestBed } from '@angular/core/testing';

import { SentimentChartService } from './services/sentiment-chart.service';

describe('SentimentChartService', () => {
  let service: SentimentChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentimentChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
