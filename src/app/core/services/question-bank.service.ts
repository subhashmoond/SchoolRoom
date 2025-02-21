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
 
}
