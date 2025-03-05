import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

    constructor(private http : HttpClient, private _dataService : DataMethodService) { }

    getSignupUserReport(){
      const url = `${environment.basePath}educator/signup-user/analytics?start_date=2025-02-23&filter_type=custom`;
      return this._dataService.get(url);
    }

    getActiveUserReport(){
      const url = `${environment.basePath}educator/active-user/analytics?filter_type=last_7_days&start_date=2025-02-25`;
      return this._dataService.get(url);
    }

    getNewEnrollmentUserReport(){
      const url = `${environment.basePath}educator/enrollment/analytics?start_date=2025-02-23&filter_type=custom`;
      return this._dataService.get(url);
    }

    getRevenueReport(){
      const url = `${environment.basePath}educator/revenue/analytics?start_date=2025-02-23&filter_type=last_7_days`;
      return this._dataService.get(url);
    }

    getTransactionsReport(){
      const url = `${environment.basePath}educator/transactions?product_ids=008da9dbbaf348c4816cd5ef697c53ba&product_ids=ec26884c735e44a38742059392b12f5c`;
      return this._dataService.get(url);
    }
  
}
