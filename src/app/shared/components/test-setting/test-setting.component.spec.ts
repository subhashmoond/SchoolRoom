import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSettingComponent } from './test-setting.component';

describe('TestSettingComponent', () => {
  let component: TestSettingComponent;
  let fixture: ComponentFixture<TestSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestSettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
