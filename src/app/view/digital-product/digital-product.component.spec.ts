import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalProductComponent } from './digital-product.component';

describe('DigitalProductComponent', () => {
  let component: DigitalProductComponent;
  let fixture: ComponentFixture<DigitalProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
