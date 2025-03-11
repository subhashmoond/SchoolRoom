import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalProductReportComponent } from './digital-product-report.component';

describe('DigitalProductReportComponent', () => {
  let component: DigitalProductReportComponent;
  let fixture: ComponentFixture<DigitalProductReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalProductReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalProductReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
