import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainTestComponent } from './create-main-test.component';

describe('CreateMainTestComponent', () => {
  let component: CreateMainTestComponent;
  let fixture: ComponentFixture<CreateMainTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMainTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMainTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
