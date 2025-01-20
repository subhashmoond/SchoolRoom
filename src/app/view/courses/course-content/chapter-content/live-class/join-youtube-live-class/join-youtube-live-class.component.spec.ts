import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinYoutubeLiveClassComponent } from './join-youtube-live-class.component';

describe('JoinYoutubeLiveClassComponent', () => {
  let component: JoinYoutubeLiveClassComponent;
  let fixture: ComponentFixture<JoinYoutubeLiveClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinYoutubeLiveClassComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JoinYoutubeLiveClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
