import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursePricingComponent } from './course-pricing.component';

describe('CoursePricingComponent', () => {
  let component: CoursePricingComponent;
  let fixture: ComponentFixture<CoursePricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursePricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoursePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
