import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestSectionComponent } from './create-test-section.component';

describe('CreateTestSectionComponent', () => {
  let component: CreateTestSectionComponent;
  let fixture: ComponentFixture<CreateTestSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTestSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTestSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
