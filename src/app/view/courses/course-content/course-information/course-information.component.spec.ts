import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInformationComponent } from './course-information.component';

describe('CourseInformationComponent', () => {
  let component: CourseInformationComponent;
  let fixture: ComponentFixture<CourseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
