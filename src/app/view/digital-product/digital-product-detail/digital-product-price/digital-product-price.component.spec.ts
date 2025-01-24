import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalProductPriceComponent } from './digital-product-price.component';

describe('DigitalProductPriceComponent', () => {
  let component: DigitalProductPriceComponent;
  let fixture: ComponentFixture<DigitalProductPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalProductPriceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalProductPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
