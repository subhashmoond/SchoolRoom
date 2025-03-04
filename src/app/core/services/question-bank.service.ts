import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {

   constructor(private http: HttpClient, private _dataService: DataMethodService) { }

   getQuestionBankList(){
    const url = `${environment.basePath}ts/question/banks/`;
    return this._dataService.get(url)
   }

   deleteQuestionBank(bankId : any){
    const url = `${environment.basePath}ts/question-bank/${bankId}/`;
    return this._dataService.delete(url)
   }

   addQuestionBank(payload : any){
    const url = `${environment.basePath}ts/question-bank/`;
    return this._dataService.post(url, payload)
   }

   editQuestionBank(questionBankId : any, payload : any){
    const url = `${environment.basePath}ts/question-bank/${questionBankId}/`;
    return this._dataService.post(url, payload);
   }

   getBankQuestionList(filterData : any){
    const url = `${environment.basePath}ts/question-bank/${filterData.bankId}/question-list/?page=${filterData.page}&page_size=${filterData.page_size}`;
    return this._dataService.get(url);
   }

   getAllQuestionBank(){
    const url = `${environment.basePath}ts/question/banks/`;
    return this._dataService.get(url);
   }

   getQuestionByBankID(bankId : any){
    const url = `${environment.basePath}ts/question-bank/${bankId}/question-list/?page=1&page_size=20`;
    return this._dataService.get(url);
   }

   importQuestions( payload : any ){
    const url = `${environment.basePath}ts/import-questions/`;
    return this._dataService.post( url, payload )
   }

   importQuestionCourseTest(payload : any){
    const url = `${environment.basePath}content/import-questions/`;
    return this._dataService.post( url, payload );
   }

   deleteQuestionInBank(payload : any){
    const url = `${environment.basePath}ts/question-delete/`;
    return this._dataService.post(url, payload)
   }
 
}
