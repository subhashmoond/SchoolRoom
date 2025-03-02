import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CreateQuestionsComponent } from '../../../../../shared/components/create-questions/create-questions.component';
import { DialogModule } from 'primeng/dialog';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '../../../../../core/services/test.service';
import { SidebarModule } from 'primeng/sidebar';
import { ImportQuestionsComponent } from '../../../../../shared/components/import-questions/import-questions.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CreateQuestionsComponent, DialogModule, SidebarModule, ImportQuestionsComponent, ToastModule, PaginatorModule ],
  providers: [MessageService],
  templateUrl: './question-list.component.html',
  styleUrl: './question-list.component.css'
})

export class QuestionListComponent {
  questionData : any;
  isQestion : boolean = false;
  isBulkUpload : boolean = false;
  sectionId : any;
  moduleName = 'testseries';
  testId : any;
  questionIdForEdit : any;
  isImportQuestion : boolean = false;

  offset = 0;
  totalRecorde = 100;
  limit = 15;


  constructor(private route: ActivatedRoute, private _testService : TestService, private _messageService: MessageService){
    this.route.paramMap.subscribe(params => {
      this.sectionId = params.get('id');
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.testId = queryParams.get('testId');
    });

  }

  ngOnInit(){
    this.getQuestionList();
  }

  getQuestionList(){
    
    this._testService.getQuestionList(this.sectionId, this.testId).subscribe((res : any) => {
      this.questionData = res.data
    })

  }

  createQuestion(){
    this.isQestion = true
  }

  closepopup(event : any){
    this.isQestion = false;
    this.isBulkUpload = false;
    this.getQuestionList()
  }

  editQuestion(id : any){
    this.isQestion = true;
    this.questionIdForEdit = id
  }

  deleteQuestion(id : any){
    
    const payload = {
      "question_id" : id
    }

    this._testService.deleteQuestionTestSeries(payload).subscribe(res => {

    })

  }


  questionBulkUpload(){
    this.isBulkUpload = true
  }

  importQuestion(){
    this.isImportQuestion = true;
  }

  closeImportSideBar(event : any){
    this.isImportQuestion = false;
    this._messageService.add({ severity: 'success', detail: event.message });
  }

  onPageChange(event: any) {
    console.log(event, "page change ")
  }

}
