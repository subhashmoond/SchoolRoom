import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChapterAddComponent } from './test-chapter-add.component';

describe('TestChapterAddComponent', () => {
  let component: TestChapterAddComponent;
  let fixture: ComponentFixture<TestChapterAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestChapterAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestChapterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
