import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { Observable, of } from 'rxjs';
import { DataMethodService } from './data-method.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockDataService {
  get(url: string): Observable<any> {
    return of({ message: 'Success' });
  }
}

describe('SharedService', () => {
  let service: SharedService;
  let mockDataService: MockDataService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(SharedService);
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers: [
        SharedService,
        { provide: DataMethodService, useClass: MockDataService } // Provide the mock data service
      ]
    });
    service = TestBed.inject(SharedService);
    mockDataService = TestBed.inject(DataMethodService) as any; // Inject the mock data service
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should send OTP to mobile number', () => {
    spyOn(mockDataService, 'get').and.callThrough();

    const mobileNumber = '1234567890';
    service.sendOTPToMobileNumber(mobileNumber).subscribe(res => {
      expect(res.message).toBe('Success');
    });

    const expectedUrl = `https://testing.kugelblitz.xyz:8443/fineract-provider/api/v1/onboarding/otp?mobile=${mobileNumber}`;
    expect(mockDataService.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should verify OTP for mobile number', () => {
    spyOn(mockDataService, 'get').and.callThrough();

    const mobileNumber = '1234567890';
    const otp = '1234';
    service.verifyOTP(mobileNumber, otp).subscribe(res => {
      expect(res.message).toBe('Success');
    });

    const expectedUrl = `https://testing.kugelblitz.xyz:8443/fineract-provider/api/v1/onboarding/verifyotp?mobile=${mobileNumber}&otp=${otp}`;
    expect(mockDataService.get).toHaveBeenCalledWith(expectedUrl);
  });


});
