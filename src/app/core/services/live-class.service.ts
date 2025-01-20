import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LiveClassService {

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }

  addLiveClassContent(payload: any) {
    const url = `${environment.basePath}content/youtube_live/live-streaming/`;
    return this._dataService.post(url, payload);
  }

  addLinkLiveContent(payload: any) {
    const url = `${environment.basePath}content/live-streaming/link-wise/`;
    return this._dataService.post(url, payload);
  }


  deleteYouTubeLive(liveId : any){
    const url = `${environment.basePath}content/youtube_live/${liveId}/details`;
    return this._dataService.delete(url);
  }

  deleteLinkLive(liveId : any){
    const url = `${environment.basePath}content/live-link-wise/${liveId}/details`;
    return this._dataService.delete(url);
  }

  getliveDetailById(liveId :any){
    const url = `${environment.basePath}content/youtube_live/${liveId}/details`;
    return this._dataService.get(url);
  }

  getlinkliveDetailById(liveId : any){
    const url = `${environment.basePath}content/live-link-wise/${liveId}/details`;
    return this._dataService.get(url);
  }

  editYoutubeLive(liveId : any, payload : any){
    const url = `${environment.basePath}content/youtube_live/${liveId}/details`;
    return this._dataService.post(url, payload);
  }

  editLinkLive(liveId : any, payload : any){
    const url = `${environment.basePath}content/live-link-wise/${liveId}/details`;
    return this._dataService.post(url, payload);
  }


}
