import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDigitalProductCategoryComponent } from './add-digital-product-category.component';

describe('AddDigitalProductCategoryComponent', () => {
  let component: AddDigitalProductCategoryComponent;
  let fixture: ComponentFixture<AddDigitalProductCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDigitalProductCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDigitalProductCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
