import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

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
    const url = `${environment.basePath}course/getList/`;
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

  addChapter(body:any, courseId: any){
    const url = `${environment.basePath}course/${courseId}/lectures/create/`;
    return this._dataService.post(url, body)
  }


  getChapterContentList(coursesId : any, lessonId : any){
    const url = `${environment.basePath}course/${coursesId}/lectures/${lessonId}/contents/`;
    return this._dataService.get(url);
  }


  // Add Content APIs 

  // Start PDF 
  addPDFFile(body: any){
    const url = `${environment.basePath}content/pdfs/upload/`;
    return this._dataService.post(url, body)
  }

  editPDFFie(id:any, payload: any){
    const url = `${environment.basePath}content/pdfs/${id}/`;
    return this._dataService.post(url, payload);
  }

  getPDFSettng(id:any){
    const url = `${environment.basePath}content/pdfs/${id}/`;
    return this._dataService.get(url)
  }

  deletePDF(id:any){
    const url = `${environment.basePath}content/pdfs/${id}/`;
    return this._dataService.delete(url);
  }

  // Start Image 
  addImageFile(body : any){
    const url = `${environment.basePath}content/image/upload/`;
    return this._dataService.post(url, body)
  }

  editImageSetting(id:any, payload : any){
    const url = `${environment.basePath}content/image/${id}/`;
    return this._dataService.post(url, payload);
  }

  getImageSetting(id : any){
    const url = `${environment.basePath}content/image/${id}/`;
    return this._dataService.get(url);
  }

// Start Video 
  addVideoFile(body:any){
    const url = `${environment.basePath}content/videos/upload/`;
    return this._dataService.post(url, body)
  }

  editVideoSetting(id : any, payload : any){
    const url = `${environment.basePath}content/videos/${id}/`;
    return this._dataService.post(url, payload);
  }

  getVideoSetting(id : any){
    const url = `${environment.basePath}content/videos/${id}/`;
    return this._dataService.get(url);
  }


  // Start Audio 
  addAudioFile(body : any){
    const url = `${environment.basePath}content/audio/upload/`;
    return this._dataService.post(url, body)
  }

  // Start Resource 
  addResource(body : any){
    const url = `${environment.basePath}content/resource/upload/`;
    return this._dataService.post(url, body)
  }

  editResourceSetting(id : any, payload : any){
    const url = `${environment.basePath}content/resource/${id}/`;
    return this._dataService.post(url, payload);
  }

  getResourceSetting(id:any){
    const url = `${environment.basePath}content/resource/${id}/`;
    return this._dataService.get(url);
  }

  // Start Youtube Video 
  addYoutubeVideoFile(body : any){
    const url = `${environment.basePath}content/youtube_video/upload/`;
    return this._dataService.post(url, body)
  }

  editYoutubeVideoSetting(id : any, body : any){
    const url = `${environment.basePath}content/youtbe_videos/${id}/`
    return this._dataService.post(url, body);
  }

  getYoutubeVideoSetting(id:any){
    const url = `${environment.basePath}content/youtbe_videos/${id}/`;
    return this._dataService.get(url);
  }


  // Start Text 
  addText(body : any){
    const url = `${environment.basePath}content/article/create/`;
    return this._dataService.post(url, body)
  }


}
