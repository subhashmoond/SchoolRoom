import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBatcheComponent } from './add-batche.component';

describe('AddBatcheComponent', () => {
  let component: AddBatcheComponent;
  let fixture: ComponentFixture<AddBatcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBatcheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBatcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
