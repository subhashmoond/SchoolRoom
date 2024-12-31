import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalProductDetailComponent } from './digital-product-detail.component';

describe('DigitalProductDetailComponent', () => {
  let component: DigitalProductDetailComponent;
  let fixture: ComponentFixture<DigitalProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalProductDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
