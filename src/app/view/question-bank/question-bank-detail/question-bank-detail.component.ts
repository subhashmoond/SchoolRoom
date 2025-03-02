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

@Component({
  selector: 'app-question-bank-detail',
  standalone: true,
  imports: [TableModule, InputTextModule, ToastModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, 
    CardModule, RippleModule, SkeletonModule, TagModule, ConfirmDialogModule, CreateQuestionsComponent, DialogModule, BulkUploadDataComponent ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './question-bank-detail.component.html',
  styleUrl: './question-bank-detail.component.css'
})
export class QuestionBankDetailComponent {

  questionList : any;
  isAddQuestion : boolean = false;
  questionBankId : any;
  bankQuestionListData : any;
  questionModuleType = 'bank'
  isLoader : boolean = true;
  isBlukUpload : boolean = false;

    constructor(private route : ActivatedRoute, private _router: Router, private _messageService: MessageService, private _confirmationService: ConfirmationService, private _questionBank : QuestionBankService) {
      this.route.paramMap.subscribe(params => {
        this.questionBankId = params.get('id');
      });
     }
  
    ngOnInit(){
      this.getBankQuestionList()
    }

    getBankQuestionList(){
      this._questionBank.getBankQuestionList(this.questionBankId).subscribe(res => {
        this.bankQuestionListData = res.questions;
        this.isLoader = false;
      })
    }

    openSidebar(){
      this.isAddQuestion = true;
    }

    stripHtml(html: string): string {
      const doc = new DOMParser().parseFromString(html, "text/html");
      return doc.body.textContent || "";
    }

    deleteQuestion(questionId : any){

    }

    back(){
    this._router.navigate(['/question-bank']);
    }

    closeSideBars(){
      this.isAddQuestion = false;
      this._messageService.add({ severity: 'success', detail: 'Added Successfully' });
    }

    blukUpload(){
      this.isBlukUpload = true;
    }

    closeBlukPopup(){
      this.isBlukUpload = false;
    }

}
