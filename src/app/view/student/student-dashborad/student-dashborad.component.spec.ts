import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboradComponent } from './student-dashborad.component';

describe('StudentDashboradComponent', () => {
  let component: StudentDashboradComponent;
  let fixture: ComponentFixture<StudentDashboradComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDashboradComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentDashboradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
