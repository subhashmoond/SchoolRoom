import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingMapsService {

  // private mapAPI = 'https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=I5NA_VBofnRW5igXxDi-tJSXRTHKn24Xc9E2Qzac7zU'

  constructor(private http : HttpClient) { }

  getLocationName(latitude: number, longitude: number): Observable<any> {
    const bingURL = `https://atlas.microsoft.com/search/address/reverse/json?api-version=1.0&subscription-key=I5NA_VBofnRW5igXxDi-tJSXRTHKn24Xc9E2Qzac7zU&query=${latitude},${longitude}`
    return this.http.get(bingURL);
  }

  getLatLongByAddressName(locationName : string){
    const bingURL = `https://atlas.microsoft.com/search/address/json?api-version=1.0&subscription-key=I5NA_VBofnRW5igXxDi-tJSXRTHKn24Xc9E2Qzac7zU&query=${locationName}`;
    return this.http.get(bingURL)
  }

}
