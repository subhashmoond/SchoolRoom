import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMainComponent } from './login-main.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService } from '@ngx-translate/core';

describe('LoginMainComponent', () => {
  let component: LoginMainComponent;
  let fixture: ComponentFixture<LoginMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginMainComponent, HttpClientTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set latitude and longitude when geolocation is supported', () => {
    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    };

    spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
      (successCallback) => {
        successCallback(mockPosition);
      }
    );

    component.locationAllow();

    expect(component.latitude).toBe(mockPosition.coords.latitude);
    expect(component.longitude).toBe(mockPosition.coords.longitude);
  });

  
  
});
