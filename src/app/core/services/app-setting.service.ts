import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {

    constructor(private http: HttpClient, private _dataService: DataMethodService) { }

    addAppConfiguration(payload : any){
      const url = `${environment.basePath}management/app-configuration`;
      return this._dataService.post(url, payload);
    }
  
}
