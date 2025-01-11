import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCurriculumComponent } from './test-curriculum.component';

describe('TestCurriculumComponent', () => {
  let component: TestCurriculumComponent;
  let fixture: ComponentFixture<TestCurriculumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestCurriculumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestCurriculumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
