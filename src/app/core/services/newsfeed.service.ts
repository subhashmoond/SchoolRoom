import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private http : HttpClient, private _dataService : DataMethodService) { }

  getNewsFeedList(){
    const url = `${environment.basePath}management/1/posts`;
    return this._dataService.get(url)
  }

  getPostTypeList(){
    const url = `${environment.basePath}management/post-types`;
    return this._dataService.get(url)
  }

  addPost(payload : any){
    const url = `${environment.basePath}management/post/create`;
    return this._dataService.post(url, payload);
  }

  postStatusUpdate(id : any, payload : any){
    const url = `${environment.basePath}management/post/${id}/update`;
    return this._dataService.post(url, payload);
  }

  deletePost(id : any){
    const url = `${environment.basePath}management/post/${id}/delete`;
    return this._dataService.delete(url);
  }

}
