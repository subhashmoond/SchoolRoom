import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http : HttpClient, private _dataService : DataMethodService) { }

  getQuestionType(){
    const url = `${environment.basePath}content/question-type/list/`;
    return this._dataService.get(url);
  }

  addTest(payload: any){
    const url = `${environment.basePath}content/test/create/`;
    return this._dataService.post(url, payload);
  }

  addTestSection(id : any, payload : any){
    const url = `${environment.basePath}content/${id}/section/create`;
    return this._dataService.post(url, payload);
  }

  getTestDetails(id : any){
    const url = `${environment.basePath}content/test/${id}/`;
    return this._dataService.get(url)
  }

  addQuestions(payload : any){
    const url = `${environment.basePath}content/question/create/`;
    return this._dataService.post(url, payload)
  }

  getTestSectionCOntent(id : any){
    const url = `${environment.basePath}content/test/${id}/section-question/`;
    return this._dataService.get(url)
  }

  getQuestionDetail(id : any){
    const url = `${environment.basePath}content/questions/${id}/`;
    return this._dataService.get(url);
  }

  deleteQuestionDetail(payload : any){
    const url = `${environment.basePath}content/question-delete/`;
    return this._dataService.post(url, payload);
  }


}
