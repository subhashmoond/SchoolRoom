import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'device_id';


  constructor(private http: HttpClient, private _dataService: DataMethodService, private router : Router) { }

  userLogin(body: any){
    const url = `${environment.basePath}educator/login/`;
    return this._dataService.post(url, body);
  }

  createLoanApplication(payload : any){
    const url = `${environment.basePath}fineract-provider/api/v1/loans/loanapplication`;
    // const url = `${environment.basePath}fineract-provider/api/v1/loans/newApplicationForm`;
    return this._dataService.post(url, payload);
  }

  getDeviceId(): string {
    let deviceId = localStorage.getItem(this.localStorageKey);
    if (!deviceId) {
      deviceId = uuidv4();
      localStorage.setItem(this.localStorageKey, deviceId);
    }
    return deviceId;
  }

  // Student App API 

  signUpStudent(payload : any){
    const url = `${environment.basePath}learner/register/`;
    return this._dataService.post(url, payload)
  }

  studentLogIn(payload : any){
    const url = `${environment.basePath}learner/login/`;
    return this._dataService.post(url, payload);
  }

  otpVerify(payload : any){
    const url = `${environment.basePath}learner/otp_verify/`;
    return this._dataService.post(url, payload);
  }

  reSendOtp(payload : any){
    const url = `${environment.basePath}learner/resend-otp/`;
    return this._dataService.post(url, payload);
  }

}
