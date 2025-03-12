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

  getLiveSessionsList(){
    const url = `${environment.basePath}content/live/session-list/`;
    return this._dataService.get(url);
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

  // getTransactionsReport(payload : any) {
  //   const url = `${environment.basePath}educator/transactions?`;

  //   if (payload.start_date && payload.end_date) {
  //     url += `&start_date=${payload.start_date}&end_date=${payload.end_date}`;
  //   }
  //   if(payload.status){
  //     url += `&status=${payload.status}`;
  //   }
  //   if(payload.product_type){
  //     url += `&product_type=${payload.product_type}`;
  //   }
  //   if(payload.product_ids){
  //     url += `&product_id=${payload.product_ids}`;
  //   }

  //   return this._dataService.get(url);
  // }

  getTransactionsReport(payload: any) {
    let url = `${environment.basePath}educator/transactions?`;  // Changed const to let

    if (payload.start_date && payload.end_date) {
      url += `&start_date=${payload.start_date}&end_date=${payload.end_date}`;
    }
    if (payload.status) {
      url += `&status=${payload.status}`;
    }
   
    if (payload.product_ids) {
      url += `&product_ids=${payload.product_ids}`;
    }

    return this._dataService.get(url);
}


  // Get Digital Products 
  getDigitalProductOverview(){
    const url = `${environment.basePath}digital-product/overviews/analytics`;
    return this._dataService.get(url)
  }

  getDigitalProductRevenueReport(payload: any) {
    let url = `${environment.basePath}digital-product/revenue/analytics?filter_type=${payload.filter_type}`;
    if (payload.fromDate && payload.toDate) {
      url += `&start_date=${payload.fromDate}&end_date=${payload.toDate}`;
    }
    return this._dataService.get(url);
  }

  getDigitalProductTransactionData(payload: any) {
    let url = `${environment.basePath}digital-product/transaction/list?`;
    if (payload.start_date && payload.end_date) {
      url += `&start_date=${payload.start_date}&end_date=${payload.end_date}`;
    }
    if(payload.status){
      url += `&status=${payload.status}`;
    }
    if(payload.product_ids){
      url += `&product_ids=${payload.product_ids}`;
    }
    return this._dataService.get(url);
  }


}
