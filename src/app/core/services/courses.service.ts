import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private courseId = new BehaviorSubject<string>('');
  currentCourseId$ = this.courseId.asObservable();

  constructor(private http: HttpClient, private _dataService: DataMethodService) { }

  setCourseID(courseId: string) {
    this.courseId.next(courseId);
  }


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
    const url = `${environment.basePath}course/${id}/lecture_section_lesson`;
    return this._dataService.get(url);
  }


  addSubject(courseId: any, body: any){
    const url = `${environment.basePath}course/${courseId}/section/create`
    return this._dataService.post(url, body)
  }


  getChapterContentList(coursesId : any, lessonId : any){
    const url = `${environment.basePath}course/${coursesId}/lectures/${lessonId}/contents/`;
    return this._dataService.get(url);
  }


  // Add Content APIs 
  addPDFFile(body: any){
    const url = `${environment.basePath}content/pdfs/upload/`;
    return this._dataService.post(url, body)
  }

  addImageFile(body : any){
    const url = `${environment.basePath}content/image/upload/`;
    return this._dataService.post(url, body)
  }


  addVideoFile(body:any){
    const url = `${environment.basePath}content/videos/upload/`;
    return this._dataService.post(url, body)
  }

  addAudioFile(body : any){
    const url = `${environment.basePath}content/audio/upload/`;
    return this._dataService.post(url, body)
  }

  addResource(body : any){
    const url = `${environment.basePath}content/resource/upload/`;
    return this._dataService.post(url, body)
  }

  addYoutubeVideoFile(body : any){
    const url = `${environment.basePath}content/youtube_video/upload/`;
    return this._dataService.post(url, body)
  }

  addText(body : any){
    const url = `${environment.basePath}content/article/create/`;
    return this._dataService.post(url, body)
  }


}
