import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTestLessionComponent } from './list-test-lession.component';

describe('ListTestLessionComponent', () => {
  let component: ListTestLessionComponent;
  let fixture: ComponentFixture<ListTestLessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTestLessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTestLessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
