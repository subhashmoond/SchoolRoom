import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }

  createCoupons(payload : any){
    const url = `${environment.basePath}create/coupone/`;
    return this._dataService.post(url, payload)
  }

}
