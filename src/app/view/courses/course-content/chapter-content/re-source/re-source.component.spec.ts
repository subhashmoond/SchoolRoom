import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReSourceComponent } from './re-source.component';

describe('ReSourceComponent', () => {
  let component: ReSourceComponent;
  let fixture: ComponentFixture<ReSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
