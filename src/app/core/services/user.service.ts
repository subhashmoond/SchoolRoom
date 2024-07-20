import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }

  addTeacher(body : any){
    const url = `${environment.basePath}educator/teacher/create/`;
    return this._dataService.post(url, body); 
  }

  getTeacherList(){
    const url = `${environment.basePath}educator/teacher/list`;
    return this._dataService.get(url);
  }

  deleteTeacher(body : any){
    const url = `${environment.basePath}educator/teacher/delete/`;
    return this._dataService.post(url, body)
  }


  getStudentData(){
    const url = `${environment.basePath}educator/student-list/`;
    return this._dataService.get(url);
  }


  addStudent(body : any){
    const url = `${environment.basePath}educator/student/add/`;
    return this._dataService.post(url, body);
  }

}
