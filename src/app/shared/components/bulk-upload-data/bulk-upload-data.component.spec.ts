import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUploadDataComponent } from './bulk-upload-data.component';

describe('BulkUploadDataComponent', () => {
  let component: BulkUploadDataComponent;
  let fixture: ComponentFixture<BulkUploadDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulkUploadDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BulkUploadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
