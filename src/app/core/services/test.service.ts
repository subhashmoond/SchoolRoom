import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http : HttpClient, private _dataService : DataMethodService) { }

  getLangList(){
    const url = `${environment.basePath}ts/languages/`;
    return this._dataService.get(url);
  }
  getQuestionType(){
    const url = `${environment.basePath}content/question-type/list/`;
    return this._dataService.get(url);
  }

  addTest(payload: any){
    const url = `${environment.basePath}content/test/create/`;
    return this._dataService.post(url, payload);
  }

  addTestSection(id : any, payload : any){
    const url = `${environment.basePath}content/${id}/section/create`;
    return this._dataService.post(url, payload);
  }

  getTestDetails(id : any){
    const url = `${environment.basePath}content/test/${id}/`;
    return this._dataService.get(url)
  }

  addQuestions(payload : any){
    const url = `${environment.basePath}content/question/create/`;
    return this._dataService.post(url, payload)
  }

  getTestSectionCOntent(id : any){
    const url = `${environment.basePath}content/test/${id}/section-question/`;
    return this._dataService.get(url)
  }

  getQuestionDetail(id : any){
    const url = `${environment.basePath}ts/questions/${id}/`;
    return this._dataService.get(url);
  }

  deleteQuestionDetail(payload : any){
    const url = `${environment.basePath}content/question-delete/`;
    return this._dataService.post(url, payload);
  }

  deleteTestSeries(id : any){
    const url = `${environment.basePath}content/test/${id}`;
    return this._dataService.delete(url);
  }

  addSuperSet(id : any, payload : any){
    const url = `${environment.basePath}ts/${id}/set-create/`;
    return this._dataService.post(url, payload);
  }

  getSuperSetAndSubSetData(id : any){
    const url = `${environment.basePath}ts/${id}/super-sub/list`;
    return this._dataService.get(url);
  }

  addSubSet(id : any, payload : any){
    const url = `${environment.basePath}ts/${id}/subset-create/`;
    return this._dataService.post(url, payload)
  }

  editSubSet(testId : any, id : any, payload : any){
    const url = `${environment.basePath}ts/${testId}/sub-set/${id}/details`;
    return this._dataService.post(url, payload)
  }

  editSuperSet(testId : any, id : any, payload : any){
    const url = `${environment.basePath}ts/${testId}/set/${id}/details`;
    return this._dataService.post(url, payload);
  }

  deleteSubSet(testId : any, subsetId : any){
    const url = `${environment.basePath}ts/${testId}/sub-set/${subsetId}/details`;
    return this._dataService.delete(url)
  }

  deleteSuperSet(testId : any, superSet : any){
    const url = `${environment.basePath}ts/${testId}/set/${superSet}/details`;
    return this._dataService.delete(url)
  }

  createTest(payload : any){
    const url = `${environment.basePath}ts/test/create/`;
    return this._dataService.post(url, payload);
  }

  getTestList(subsetId : any){
    const url = `${environment.basePath}ts/sub-set/${subsetId}/test-list/`;
    return this._dataService.get(url);
  }

  createSection(id : any, payload : any){
    const url = `${environment.basePath}ts/${id}/section/create`;
    return this._dataService.post(url, payload);
  }

  createQestionTestSerice(payload : any){
    const url = `${environment.basePath}ts/question/create/`;
    return this._dataService.post(url, payload)
  }

  deleteTestSeriesSection(sectionId : any){
    const url = `${environment.basePath}ts/section/${sectionId}/`;
    return this._dataService.delete(url)
  }

  editTestSeriesSection(sectionId : any, payload : any){
    const url = `${environment.basePath}ts/section/${sectionId}/`
    return this._dataService.post(url, payload)
  }

  getQuestionList(sectionId : any, testId : any){
    const url = `${environment.basePath}ts/test/${testId}/section/${sectionId}/`;
    return this._dataService.get(url);
  }

  deleteQuestionTestSeries(payload : any){
    const url = `${environment.basePath}ts/question-delete/`;
    return this._dataService.post(url, payload)
  }

  deleteTestQuestions(payload : any){
    const url = `${environment.basePath}ts/remove-questions/`;
    return this._dataService.post(url, payload);
  }

  testDetailTestSeries(testId : any){
    const url = `${environment.basePath}ts/test/${testId}/`;
    return this._dataService.get(url);
  }

  getCourseTestDetail(testId : any){
    const url = `${environment.basePath}content/test/${testId}/`;
    return this._dataService.get(url);
  }

  testSettingTestSeries(testId: any, payload : any){
    const url = `${environment.basePath}ts/test/${testId}/`;
    return this._dataService.post(url, payload);
  }

  deleteTestTestSeries(testId : any){
    const url = `${environment.basePath}ts/test/${testId}/`;
    return this._dataService.delete(url);
  }

  // Test Reports 
  getTestReportData(testId : any){
    const url = `${environment.basePath}ts/test/${testId}/reports?page=1&page_size=15`;
    return this._dataService.get(url)
  }

  // Bulk Upload Questions
  bulkQuestionUpload(payload : any){
    const url = `${environment.basePath}ts/questions-bulk/add/`;
    return this._dataService.post(url, payload)
  }

}
