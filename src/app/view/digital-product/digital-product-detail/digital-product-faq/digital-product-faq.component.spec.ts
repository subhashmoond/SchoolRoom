import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalProductFaqComponent } from './digital-product-faq.component';

describe('DigitalProductFaqComponent', () => {
  let component: DigitalProductFaqComponent;
  let fixture: ComponentFixture<DigitalProductFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalProductFaqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalProductFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
