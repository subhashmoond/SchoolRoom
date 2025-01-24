import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from './data-method.service';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private toggleButtonSubject = new BehaviorSubject<boolean>(true);
  toggleButtonValue$ = this.toggleButtonSubject.asObservable();

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }

  settoggleButtonValue(value:any): void {
    this.toggleButtonSubject.next(value);
  }

  getGeminiAPI(){
    const url = `${environment.basePath}membership/gemini_api_key/`;
    return this._dataService.get(url);
  }

  getAIResponse(payload:any){
    const url = `${environment.basePath}course/getAiResponse/`;
    return this._dataService.post(url, payload)
  }

  getExamCategory(){
    const url = `${environment.basePath}membership/exam-categorys/`;
    return this._dataService.get(url)
  }

  getExamSubCategory(payload : any){
    const url = `${environment.basePath}membership/exam-subcategorys/`;
    return this._dataService.post(url, payload)
  }

  getInstituteSharePresentes(payload : any){
    const url = `${environment.basePath}educator/institute-share-presentes/`;
    return this._dataService.post(url, payload)
  }


  getLangList(){
    const url = `${environment.basePath}educator/language/enum/`;
    return this._dataService.get(url)
  }

}
