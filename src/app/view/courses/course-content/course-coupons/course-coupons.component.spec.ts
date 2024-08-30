import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCouponsComponent } from './course-coupons.component';

describe('CourseCouponsComponent', () => {
  let component: CourseCouponsComponent;
  let fixture: ComponentFixture<CourseCouponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCouponsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCouponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
