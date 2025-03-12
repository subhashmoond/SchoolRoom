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


  // Create campaign API 

  createCampaign(payload : any){
    const url = `${environment.basePath}management/create-campaign/`;
    return this._dataService.post(url, payload)
  }

  getCampaignDataList(param : any){
    let url = `${environment.basePath}management/notification/campaign-list/?page_size=${param.page_size}&page=${param.current_page}`;

    if (param.type) {
      url += `&type=All=${param.type}`;
    }

    return this._dataService.get(url);
  }

}
