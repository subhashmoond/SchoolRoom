import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPushMessageComponent } from './add-push-message.component';

describe('AddPushMessageComponent', () => {
  let component: AddPushMessageComponent;
  let fixture: ComponentFixture<AddPushMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPushMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPushMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
