import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCommunityComponent } from './setting-community.component';

describe('SettingCommunityComponent', () => {
  let component: SettingCommunityComponent;
  let fixture: ComponentFixture<SettingCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingCommunityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
