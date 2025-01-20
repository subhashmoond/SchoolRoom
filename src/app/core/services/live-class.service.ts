import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveClassService {

constructor(private http : HttpClient, private _dataService : DataMethodService) { }

addLiveClassContent(payload : any){
  const url = `${environment.basePath}content/youtube_live/live-streaming/`;
  return this._dataService.post(url, payload)
}


}
