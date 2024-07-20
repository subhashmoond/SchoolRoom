import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class DataMethodService {

  constructor( private _httpClient : HttpClient ) { }

  get(url: string) : Observable<any> {
    return this._httpClient.get(url);
  }

  post(url:string, payload : string){
    return this._httpClient.post(url, payload)
  }

  put(url:string, payload : string){
    return this._httpClient.put(url, payload)
  }

  delete(url:string){
    return this._httpClient.delete(url)
  }


}
