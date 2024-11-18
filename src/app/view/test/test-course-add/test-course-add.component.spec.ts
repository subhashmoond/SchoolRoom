import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCourseAddComponent } from './test-course-add.component';

describe('TestCourseAddComponent', () => {
  let component: TestCourseAddComponent;
  let fixture: ComponentFixture<TestCourseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCourseAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
