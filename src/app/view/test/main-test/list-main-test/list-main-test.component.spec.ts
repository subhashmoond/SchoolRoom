import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMainTestComponent } from './list-main-test.component';

describe('ListMainTestComponent', () => {
  let component: ListMainTestComponent;
  let fixture: ComponentFixture<ListMainTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListMainTestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListMainTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
