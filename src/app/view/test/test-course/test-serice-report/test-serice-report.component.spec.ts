import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSericeReportComponent } from './test-serice-report.component';

describe('TestSericeReportComponent', () => {
  let component: TestSericeReportComponent;
  let fixture: ComponentFixture<TestSericeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSericeReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSericeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
