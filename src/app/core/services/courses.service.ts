import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }


  addCourses(body : any){
    const url = `${environment.basePath}course/create/`;
    return this._dataService.post(url, body);
  }

}
