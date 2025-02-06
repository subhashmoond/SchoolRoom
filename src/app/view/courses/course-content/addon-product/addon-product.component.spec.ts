import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonProductComponent } from './addon-product.component';

describe('AddonProductComponent', () => {
  let component: AddonProductComponent;
  let fixture: ComponentFixture<AddonProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddonProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddonProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
