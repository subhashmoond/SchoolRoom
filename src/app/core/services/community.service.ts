import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }

  getCommunitysList(){
    const url = `${environment.basePath}c/communitie/list/`;
    return this._dataService.get(url)
  }

  getCommunityContent(){
    const url = `${environment.basePath}c/community/content/`;
    return this._dataService.get(url);
  }

  addCommunity(institute_id: number ,payload : any){
    const url = `${environment.basePath}c/${institute_id}/community/create/`;
    return this._dataService.post(url, payload)
  }

  updateCommunity(id : any, payload : any){
    const url = `${environment.basePath}c/community/${id}/`;
    return this._dataService.post(url, payload);
  }

  addGroups(communityId : number, payload : any){
    const url = `${environment.basePath}c/${communityId}/create/group/`;
    return this._dataService.post(url, payload)
  }

  deleteGroup(id : number){
    const url = `${environment.basePath}c/group/${id}/`;
    return this._dataService.delete(url)
  }

  getGroupById(id:number){
    const url = `${environment.basePath}c/group/${id}/`;
    return this._dataService.get(url);
  }

  updateGropu(id : number, payload : any){
    const url = `${environment.basePath}c/group/${id}/`;
    return this._dataService.post(url, payload);
  }

  addMemberInGroup(groupId : number, payload: any){
    const url = `${environment.basePath}c/group/${groupId}/add-member/`;
    return this._dataService.post(url, payload);
  }

  getAllMembers(groupId : any){
    const url = `${environment.basePath}c/group/${groupId}/members/`;
    return this._dataService.get(url);
  }

  deleteMemberFromGroup(groupId : any, payload : any){
    const url = `${environment.basePath}c/group/${groupId}/remove-member/`;
    return this._dataService.post(url, payload)
  }

  fileUploadInGroup(groupId : any, payload : any){
    const url = `${environment.basePath}c/group-chat/${groupId}/`;
    return this._dataService.post(url, payload)
  }

}
