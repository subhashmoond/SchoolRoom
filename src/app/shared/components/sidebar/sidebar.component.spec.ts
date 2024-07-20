import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({  
      imports: [SidebarComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle nav item active state', () => {
    const item = { active: false };
    component.toggleNavActive(item);
    expect(item.active).toBeTrue();
  });

  it('should set profileToggle to false on profile item leave', () => {
    component.profileToggle = true;
    // component.profileIteamLeave(false);
    expect(component.profileToggle).toBeFalse();
  });

  it('should set profileToggle to true on profile item enter', () => {
    component.profileToggle = false;
    // component.profileIteamEnter(true);
    expect(component.profileToggle).toBeTrue();
  });

  it('should handle null values in methods', () => {
    component.toggleNavActive(null);
  });

});
