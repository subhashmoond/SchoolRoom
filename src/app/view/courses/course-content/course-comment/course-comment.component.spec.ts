import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCommentComponent } from './course-comment.component';

describe('CourseCommentComponent', () => {
  let component: CourseCommentComponent;
  let fixture: ComponentFixture<CourseCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCommentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
