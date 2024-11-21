import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestCourseComponent } from './create-test-course.component';

describe('CreateTestCourseComponent', () => {
  let component: CreateTestCourseComponent;
  let fixture: ComponentFixture<CreateTestCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTestCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTestCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
