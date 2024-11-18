import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http : HttpClient, private _dataService : DataMethodService) { }

  addTest(payload: any){
    const url = `${environment.basePath}content/test/create/`;
    return this._dataService.post(url, payload);
  }


}
