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

  getGeminiAPI(){
    const url = `${environment.basePath}membership/gemini_api_key/`;
    return this._dataService.get(url);
  }


}
