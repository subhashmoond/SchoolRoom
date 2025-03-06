import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataMethodService } from '../../shared/services/data-method.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  private dataSource = new BehaviorSubject<string>('Initial Value'); // Default value
  currentData = this.dataSource.asObservable();

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }


  updateData(newData: string) {
    this.dataSource.next(newData);
  }


  getDashboradAnalyticsData() {
    const url = `${environment.basePath}educator/overview/analytics`;
    return this._dataService.get(url)
  }

  getSeduledEventsDashbord() {
    const url = `${environment.basePath}content/live/session-list/`;
    return this._dataService.get(url)
  }

  getSignupUserReport(payload: any) {
    let url = `${environment.basePath}educator/signup-user/analytics?filter_type=${payload.filter_type}`;

    if (payload.fromDate && payload.toDate) {
      url += `&start_date=${payload.fromDate}&end_date=${payload.toDate}`;
    }

    return this._dataService.get(url);
  }

  getActiveUserReport(payload: any) {
    let url = `${environment.basePath}educator/active-user/analytics?filter_type=${payload.filter_type}`;
    if (payload.fromDate && payload.toDate) {
      url += `&start_date=${payload.fromDate}&end_date=${payload.toDate}`;
    }
    return this._dataService.get(url);
  }


  getNewEnrollmentUserReport(payload: any) {
    let url = `${environment.basePath}educator/enrollment/analytics?filter_type=${payload.filter_type}`;
    if (payload.fromDate && payload.toDate) {
      url += `&start_date=${payload.fromDate}&end_date=${payload.toDate}`;
    }
    return this._dataService.get(url);
  }


  getRevenueReport(payload: any) {
    let url = `${environment.basePath}educator/revenue/analytics?filter_type=${payload.filter_type}`;
    if (payload.fromDate && payload.toDate) {
      url += `&start_date=${payload.fromDate}&end_date=${payload.toDate}`;
    }
    return this._dataService.get(url);
  }

  getTransactionsReport() {
    const url = `${environment.basePath}educator/transactions?product_ids=008da9dbbaf348c4816cd5ef697c53ba&product_ids=ec26884c735e44a38742059392b12f5c`;
    return this._dataService.get(url);
  }

}
