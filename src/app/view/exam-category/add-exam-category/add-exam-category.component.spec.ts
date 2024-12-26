import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamCategoryComponent } from './add-exam-category.component';

describe('AddExamCategoryComponent', () => {
  let component: AddExamCategoryComponent;
  let fixture: ComponentFixture<AddExamCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExamCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExamCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
