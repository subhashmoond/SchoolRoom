import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasswordFormComponent } from './create-password-form.component';

describe('CreatePasswordFormComponent', () => {
  let component: CreatePasswordFormComponent;
  let fixture: ComponentFixture<CreatePasswordFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePasswordFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
