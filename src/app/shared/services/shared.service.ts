import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from './data-method.service';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private toggleButtonSubject = new BehaviorSubject<boolean>(true);
  toggleButtonValue$ = this.toggleButtonSubject.asObservable();

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }

  settoggleButtonValue(value:any): void {
    this.toggleButtonSubject.next(value);
  }

  sendOTPToMobileNumber(mobileNumber: string) {
    const url = `${environment.basePath}fineract-provider/api/v1/onboarding/otp?mobile=${mobileNumber}`;
    return this._dataService.get(url); 
  }


  verifyOTP(mobileNumber : any, otp: string) {
    const url = `${environment.basePath}fineract-provider/api/v1/onboarding/verifyotp?mobile=${mobileNumber}&otp=${otp}`;
    return this._dataService.get(url); 
  }

  getCodeValueOptions(){
    const url = `${environment.basePath}fineract-provider/api/v1/codes/65/codevalues`;
    return this._dataService.get(url);
  }

}
