import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkQuestionUploadComponent } from './bulk-question-upload.component';

describe('BulkQuestionUploadComponent', () => {
  let component: BulkQuestionUploadComponent;
  let fixture: ComponentFixture<BulkQuestionUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkQuestionUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkQuestionUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
