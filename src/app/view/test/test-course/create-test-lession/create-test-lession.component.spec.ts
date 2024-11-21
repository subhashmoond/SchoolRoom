import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestLessionComponent } from './create-test-lession.component';

describe('CreateTestLessionComponent', () => {
  let component: CreateTestLessionComponent;
  let fixture: ComponentFixture<CreateTestLessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTestLessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTestLessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
