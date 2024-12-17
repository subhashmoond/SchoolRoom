import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourAppComponent } from './your-app.component';

describe('YourAppComponent', () => {
  let component: YourAppComponent;
  let fixture: ComponentFixture<YourAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
