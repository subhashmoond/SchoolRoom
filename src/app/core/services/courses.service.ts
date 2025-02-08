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

  getCourseType(){
    const url = `${environment.basePath}course/types/list/`;
    return this._dataService.get(url);
  }

  getCourseListTypeWais(courseType : any){
    const url = `${environment.basePath}course/list/type-wise/?type=${courseType}`;
    return this._dataService.get(url)
  }


  addCourses(body: any) {
    const url = `${environment.basePath}course/create/`;
    return this._dataService.post(url, body);
  }

  coursePublish(payload : any){
    const url = `${environment.basePath}course/publish/`;
    return this._dataService.post(url, payload)
  }

  deleteCourse(payload : any){
    const url = `${environment.basePath}course/delete/`;
    return this._dataService.post(url, payload)
  }

  addThumbnail(body : any){
    const url = `${environment.basePath}course/thumbnail/add/`;
    return this._dataService.post(url, body);
  }

  addExamCategoryInCourse(body : any, courseId : any){
    const url = `${environment.basePath}course/${courseId}/select-exam-category`;
    return this._dataService.post(url, body)
  }

  addCoursesAIResponse(payload : any){
    const url = `${environment.basePath}course/subject_chapter/add/`;
    return this._dataService.post(url, payload)
  }

  getCoursesList() {
    const url = `${environment.basePath}course/getList/`;
    return this._dataService.get(url)
  }

  getCourseDetailById(id: number) {
    const url = `${environment.basePath}course/${id}/content`;
    return this._dataService.get(url);
  }

  getCourseChapterAndSubject(id: number) {
    const url = `${environment.basePath}course/${id}/lecture_section_lesson`;
    return this._dataService.get(url);
  }


  addSubject(courseId: any, body: any) {
    const url = `${environment.basePath}course/${courseId}/section/create`
    return this._dataService.post(url, body)
  }

  editSubject(subjectId : number, payload : any){
    const url = `${environment.basePath}course/${subjectId}/section/edit`;
    return this._dataService.post(url, payload)
  }

  addChapter(body: any, courseId: any) {
    const url = `${environment.basePath}course/${courseId}/lectures/create/`;
    return this._dataService.post(url, body)
  }

  editChapter(lesionId : number, payload: any){
    const url = `${environment.basePath}course/${lesionId}/lectures/edit`;
    return this._dataService.post(url, payload)

  }

  publishLesson(courseId: any, payload: any) {
    const url = `${environment.basePath}course/${courseId}/lecture/publish`;
    return this._dataService.post(url, payload);
  }

  deleteChapter(id:number, payload : any){
    const url = `${environment.basePath}course/${id}/lectures/remove`;
    return this._dataService.post(url, payload);
  }

  getChapterContentList(coursesId: any, lessonId: any) {
    const url = `${environment.basePath}course/${coursesId}/lectures/${lessonId}/contents/`;
    return this._dataService.get(url);
  }


  // Add Content APIs 

  // Start PDF 
  addPDFFile(body: any) {
    const url = `${environment.basePath}content/pdfs/upload/`;
    return this._dataService.post(url, body)
  }

  editPDFFie(id: any, payload: any) {
    const url = `${environment.basePath}content/pdfs/${id}/`;
    return this._dataService.post(url, payload);
  }

  getPDFSettng(id: any) {
    const url = `${environment.basePath}content/pdfs/${id}/`;
    return this._dataService.get(url)
  }

  deletePDF(id: any) {
    const url = `${environment.basePath}content/pdfs/${id}/`;
    return this._dataService.delete(url);
  }

  // Start Image 
  addImageFile(body: any) {
    const url = `${environment.basePath}content/image/upload/`;
    return this._dataService.post(url, body)
  }

  editImageSetting(id: any, payload: any) {
    const url = `${environment.basePath}content/image/${id}/`;
    return this._dataService.post(url, payload);
  }

  getImageSetting(id: any) {
    const url = `${environment.basePath}content/image/${id}/`;
    return this._dataService.get(url);
  }

  // Start Video 
  addVideoFile(body: any) {
    const url = `${environment.basePath}content/videos/upload/`;
    return this._dataService.post(url, body)
  }

  editVideoSetting(id: any, payload: any) {
    const url = `${environment.basePath}content/videos/${id}/`;
    return this._dataService.post(url, payload);
  }

  getVideoSetting(id: any) {
    const url = `${environment.basePath}content/videos/${id}/`;
    return this._dataService.get(url);
  }


  // Start Audio 
  addAudioFile(body: any) {
    const url = `${environment.basePath}content/audio/upload/`;
    return this._dataService.post(url, body)
  }

  editAudioSetting(id: any, payload: any) {
    const url = `${environment.basePath}content/audio/${id}/`;
    return this._dataService.post(url, payload);
  }

  getAudioSetting(id: any) {
    const url = `${environment.basePath}content/audio/${id}/`;
    return this._dataService.get(url);
  }

  // Start Resource 
  addResource(body: any) {
    const url = `${environment.basePath}content/resource/upload/`;
    return this._dataService.post(url, body)
  }

  editResourceSetting(id: any, payload: any) {
    const url = `${environment.basePath}content/resource/${id}/`;
    return this._dataService.post(url, payload);
  }

  getResourceSetting(id: any) {
    const url = `${environment.basePath}content/resource/${id}/`;
    return this._dataService.get(url);
  }

  // Start Youtube Video 
  addYoutubeVideoFile(body: any) {
    const url = `${environment.basePath}content/youtube_video/upload/`;
    return this._dataService.post(url, body)
  }

  editYoutubeVideoSetting(id: any, body: any) {
    const url = `${environment.basePath}content/youtbe_videos/${id}/`
    return this._dataService.post(url, body);
  }

  getYoutubeVideoSetting(id: any) {
    const url = `${environment.basePath}content/youtbe_videos/${id}/`;
    return this._dataService.get(url);
  }


  // Start Text 
  addText(body: any) {
    const url = `${environment.basePath}content/article/create/`;
    return this._dataService.post(url, body)
  }

  editTextContent(id: any, payload: any) {
    const url = `${environment.basePath}content/articles/${id}/`;
    return this._dataService.post(url, payload);
  }

  getTextContent(id: any) {
    const url = `${environment.basePath}content/articles/${id}/`;
    return this._dataService.get(url);
  }


  // Course Price 
  getCoursePriceList(courseId: any) {
    const url = `${environment.basePath}course/${courseId}/plans`;
    return this._dataService.get(url);
  }

  createPlan(courseId: number, payload: any) {
    const url = `${environment.basePath}course/${courseId}/plan/create`;
    return this._dataService.post(url, payload)
  }

  getPlanById(courseId: number, planId: number) {
    const url = `${environment.basePath}course/${courseId}/plan/${planId}/`;
    return this._dataService.get(url)
  }

  updatePlanById(courseId: number, planId: number, payload: any) {
    const url = `${environment.basePath}course/${courseId}/plan/${planId}/`;
    return this._dataService.post(url, payload);
  }

  deletePlanById(courseId: number, planId: any) {
    const url = `${environment.basePath}course/${courseId}/plan/${planId}/`;
    return this._dataService.delete(url)
  }

  // Get Course details 
  getCourseById(courseId: any) {
    const url = `${environment.basePath}course/${courseId}`;
    return this._dataService.get(url);
  }

  editCourseById(courseId: any, payload: any) {
    const url = `${environment.basePath}course/${courseId}/information`;
    return this._dataService.post(url, payload);
  }

  // Get Student lists
  getStudentList(courseId : any) {
    const url = `${environment.basePath}course/buy_course/details/${courseId}/`;
    return this._dataService.get(url);
  }

  addStudentCourse(payload: any) {
    const url = `${environment.basePath}course/add/student/`;
    return this._dataService.post(url, payload)
  }

  removeStudentInCourse(courseId : any, payload : any){
    const url = `${environment.basePath}course/course-student/${courseId}/remove`;
    return this._dataService.post( url, payload );
  }

  // Get Course List Review 
  getCourseReviewList(courseId: any) {
    const url = `${environment.basePath}course/${courseId}/reviews?limit=10&skip=0&status=all`;
    return this._dataService.get(url);
  }

  blockStudentReview(reviewId : any, payload : any){
    const url = `${environment.basePath}course/review/${reviewId}/featured-status/`;
    return this._dataService.post(url, payload);
  }

  setLessionPreview(id : any, payload : any){
    const url = `${environment.basePath}course/${id}/sample/create`;
    return this._dataService.post(url, payload)
  }

  courseThumbnailUpdate(payload : any){
    const url = `${environment.basePath}course/thumbnail/add/`;
    return this._dataService.post(url, payload);
  }

  allowReviews(courseId : any, payload : any){
    const url = `${environment.basePath}course/${courseId}/review-status/update`;
    return this._dataService.post(url, payload)
  }

  approveAndRejectReview(courseId : any, reviewId : any, payload : any){
    const url = `${environment.basePath}course/${courseId}/review/${reviewId}/update`;
    return this._dataService.post(url, payload);
  }

 getStudentsList(){
  const url = `${environment.basePath}educator/student-list/?page=1&page_size=100`;
  return this._dataService.get(url)
 }


//  Add-On Product in COurse 

postAddOnProdcut(courseId : any, payload : any){
  const url = `${environment.basePath}course/${courseId}/add-on/product/`;
  return this._dataService.post( url, payload );
}

getAddOnProductList(courseId : any){
  const url = `${environment.basePath}course/${courseId}/add-on/product-list/`;
  return this._dataService.get(url);
}

deleteAddedProduct(productId : any, payload : any){
  const url = `${environment.basePath}course/${productId}/add-on/product-remove/`;
  return this._dataService.post(url, payload);
}


// Position Change Using Drag and Drop 

subjectPositionChange(payload : any){
  const url = `${environment.basePath}course/subject/move-position/`;
  return this._dataService.post(url, payload)
}

lessionPositionChange(payload : any){
  const url = `${environment.basePath}course/chapter/move-position/`;
  return this._dataService.post(url, payload)
}

}
