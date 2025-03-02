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

   getBankQuestionList(questionBankId : any){
    const url = `${environment.basePath}ts/question-bank/${questionBankId}/question-list/?page=1&page_size=20`;
    return this._dataService.get(url);
   }
 
}
