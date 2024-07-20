import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBatcheComponent } from './list-batche.component';

describe('ListBatcheComponent', () => {
  let component: ListBatcheComponent;
  let fixture: ComponentFixture<ListBatcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBatcheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBatcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
