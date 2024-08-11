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

  getCoursesList(){
    const url = `${environment.basePath}course/list/`;
    return this._dataService.get(url)
  }

  getCourseDetailById(id : number){
    const url = `${environment.basePath}course/${id}/content`;
    return this._dataService.get(url);
  }

  getCourseChapterAndSubject(id : number){
    const url = `${environment.basePath}course/3/lecture_section_lesson`;
    return this._dataService.get(url);
  }


  addSubject(courseId: any, body: any){
    const url = `${environment.basePath}course/${courseId}/section/create`
    return this._dataService.post(url, body)
  }

}
