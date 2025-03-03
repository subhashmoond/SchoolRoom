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
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-question-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ConfirmDialogModule, CreateQuestionsComponent, DialogModule, SidebarModule, ImportQuestionsComponent, ToastModule, PaginatorModule ],
  providers: [MessageService, ConfirmationService ],
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


  constructor(private route: ActivatedRoute, private _confirmationService: ConfirmationService, private _testService : TestService, private _messageService: MessageService){
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

    this._confirmationService.confirm({
      header: '',
      message: 'Are you sure. You want to delete section ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Yes",
      acceptIcon: "none",
      rejectLabel: "No",
      rejectIcon: "none",
      accept: () => {

        const payload = {
          "test_id": this.testId,
          "section_id": this.sectionId,
          "question_ids": [id]
      }
    
        this._testService.deleteTestQuestions(payload).subscribe((res : any) => {
          if(res.status){
            this._messageService.add({ severity: 'success', detail: res.message });
            this.getQuestionList();
          }
        })
        
      },
      reject: () => {

      }

    });
    
    

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
