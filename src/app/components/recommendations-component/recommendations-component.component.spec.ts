import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationsComponentComponent } from './recommendations-component.component';

describe('RecommendationsComponentComponent', () => {
  let component: RecommendationsComponentComponent;
  let fixture: ComponentFixture<RecommendationsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendationsComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendationsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
