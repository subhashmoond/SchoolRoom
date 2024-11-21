import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSettingComponent } from './question-setting.component';

describe('QuestionSettingComponent', () => {
  let component: QuestionSettingComponent;
  let fixture: ComponentFixture<QuestionSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
