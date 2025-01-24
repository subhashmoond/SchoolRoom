import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalProductReviewComponent } from './digital-product-review.component';

describe('DigitalProductReviewComponent', () => {
  let component: DigitalProductReviewComponent;
  let fixture: ComponentFixture<DigitalProductReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalProductReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalProductReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
