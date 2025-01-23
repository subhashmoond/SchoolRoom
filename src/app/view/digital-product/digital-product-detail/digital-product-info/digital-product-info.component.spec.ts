import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalProductInfoComponent } from './digital-product-info.component';

describe('DigitalProductInfoComponent', () => {
  let component: DigitalProductInfoComponent;
  let fixture: ComponentFixture<DigitalProductInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalProductInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
