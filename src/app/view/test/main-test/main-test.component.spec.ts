import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTestComponent } from './main-test.component';

describe('MainTestComponent', () => {
  let component: MainTestComponent;
  let fixture: ComponentFixture<MainTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
