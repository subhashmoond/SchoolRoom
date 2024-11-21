import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCourseComponent } from './test-course.component';

describe('TestCourseComponent', () => {
  let component: TestCourseComponent;
  let fixture: ComponentFixture<TestCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
