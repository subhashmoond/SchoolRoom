import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { QuestionBankService } from '../../../core/services/question-bank.service';
import { AddQuestionBankComponent } from '../add-question-bank/add-question-bank.component';
import { CreateQuestionsComponent } from '../../../shared/components/create-questions/create-questions.component';
import { DialogModule } from 'primeng/dialog';
import { BulkUploadDataComponent } from '../../../shared/components/bulk-upload-data/bulk-upload-data.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-question-bank-detail',
  standalone: true,
  imports: [TableModule, InputTextModule, ToastModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule,
    CardModule, RippleModule, SkeletonModule, TagModule, ConfirmDialogModule, CreateQuestionsComponent, DialogModule, BulkUploadDataComponent, DatePipe],
  providers: [ConfirmationService, MessageService],
  templateUrl: './question-bank-detail.component.html',
  styleUrl: './question-bank-detail.component.css'
})
export class QuestionBankDetailComponent {

  questionList: any;
  isAddQuestion: boolean = false;
  questionBankId: any;
  bankQuestionListData: any;
  questionModuleType = 'bank'
  isLoader: boolean = true;
  isBlukUpload: boolean = false;

  limit = 15;
  totalRecorde!: number;
  currentPage = 1

  constructor(private route: ActivatedRoute, private _router: Router, private _messageService: MessageService, private _confirmationService: ConfirmationService, private _questionBank: QuestionBankService) {
    this.route.paramMap.subscribe(params => {
      this.questionBankId = params.get('id');
    });
  }

  ngOnInit(){
    this.getBankQuestionList();
  }

  

  openSidebar() {
    this.isAddQuestion = true;
  }

  stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  deleteQuestion(questionId: any) {

    this._confirmationService.confirm({
      header: '',
      message: 'Are you sure. You want to delete Question Bank ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Yes",
      acceptIcon: "none",
      rejectLabel: "No",
      rejectIcon: "none",
      accept: () => {

        const payload = {
          "question_id": questionId
        }

        this._questionBank.deleteQuestionInBank(payload).subscribe((res: any) => {
          if(res.status){
            this._messageService.add({ severity: 'success', detail: res.message });
            this.getBankQuestionList();
          }
        }, (error) => {
          this._messageService.add({ severity: 'error', detail: error.error.message });
        })

      },
      reject: () => {

      }

    });



  }

  back() {
    this._router.navigate(['/question-bank']);
  }

  closeSideBars() {
    this.isAddQuestion = false;
    this.getBankQuestionList();
    this._messageService.add({ severity: 'success', detail: 'Added Successfully' });
  }
  

  blukUpload() {
    this.isBlukUpload = true;
  }

  closeBlukPopup(event: any) {
    this.isBlukUpload = false;
    this.getBankQuestionList();
    this._messageService.add({ severity: 'success', detail: event.message });
  }


  onPageChange(event: any) {
debugger
    console.log(event,"page change")

    this.isLoader = false
    this.limit = event.rows;
    this.currentPage = event.page + 1;

    this.getBankQuestionList();

    
    
  }

  getBankQuestionList() {

    const filterData = {
      bankId : this.questionBankId,
      page :  this.currentPage,
      page_size :  this.limit,
    }

    this._questionBank.getBankQuestionList(filterData).subscribe(res => {
      this.bankQuestionListData = res.questions;
      this.isLoader = false;
      this.totalRecorde = res.total_record
    })
  }

}
