import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamCategoryService {

    constructor(private http : HttpClient, private _dataService : DataMethodService) { }


    addExamCategory(payload : any){
      const url = `${environment.basePath}membership/exam-category/add/`;
      return this._dataService.post(url, payload)
    }

    getExamCategoryList(){
      const url = `${environment.basePath}membership/exam-cat-sub-categorys/`;
      return this._dataService.get(url)
    }

    addExamSubCategory(payload : any){
      const url = `${environment.basePath}membership/exam-subcategory/add/`;
      return this._dataService.post(url, payload);
    }

    deleteCategory(payload : any){
      const url = `${environment.basePath}membership/exam-category/delete/`;
      return this._dataService.post(url, payload)
    }

    deleteSubCategory(payload : any){
      const url = `${environment.basePath}membership/exam-subcategory/delete/`;
      return this._dataService.post(url, payload);
    }

  
}
