import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor(private http : HttpClient, private _dataService : DataMethodService) { }

  updateWallet(payload : any){
    const url = `${environment.basePath}management/wallet-settings/details/`;
    return this._dataService.post(url, payload);
  }
  
  getWalletData(){
    const url = `${environment.basePath}management/wallet-settings/details`;
    return this._dataService.get(url);
  }

  getReferralData(){
    const url = `${environment.basePath}management/refer-settings/details/`;
    return this._dataService.get(url);
  }

  updateReferralCode(payload : any){
    const url = `${environment.basePath}management/refer-settings/details/`;
    return this._dataService.post(url, payload)
  }

}
