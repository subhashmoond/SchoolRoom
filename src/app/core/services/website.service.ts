import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }

  addContactDetails(payload: any){
    const url = `${environment.basePath}educator/helpline/`;
    return this._dataService.post(url, payload)
  }

  getContactDetails(){
    const url = `${environment.basePath}educator/helpline/`;
    return this._dataService.get(url);
  }

  addAboutDetails(payload : any){
    const url = `${environment.basePath}educator/aboutUs/`;
    return this._dataService.post(url, payload)
  }

  getAboutDetails(){
    const url = `${environment.basePath}educator/aboutUs/`;
    return this._dataService.get(url)
  }

  addPolicyDetails(payload : any){
    const url = `${environment.basePath}educator/privacy-policy/`;
    return this._dataService.post(url, payload);
  }

  getPolicyDetails(){
    const url = `${environment.basePath}educator/privacy-policy/`;
    return this._dataService.get(url);
  }

}
