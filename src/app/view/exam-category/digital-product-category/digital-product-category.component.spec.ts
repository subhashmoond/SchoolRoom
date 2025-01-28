import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalProductCategoryComponent } from './digital-product-category.component';

describe('DigitalProductCategoryComponent', () => {
  let component: DigitalProductCategoryComponent;
  let fixture: ComponentFixture<DigitalProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DigitalProductCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DigitalProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
