import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateThumbnailComponent } from './update-thumbnail.component';

describe('UpdateThumbnailComponent', () => {
  let component: UpdateThumbnailComponent;
  let fixture: ComponentFixture<UpdateThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
