import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-question-bank-detail',
  standalone: true,
  imports: [TableModule, InputTextModule, ToastModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, TagModule, ConfirmDialogModule, AddQuestionBankComponent ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './question-bank-detail.component.html',
  styleUrl: './question-bank-detail.component.css'
})
export class QuestionBankDetailComponent {

  questionList : any;
  isAddQuestion : boolean = false

    constructor(private _router: Router, private _messageService: MessageService, private _confirmationService: ConfirmationService, private _questionBank : QuestionBankService) { }
  
    ngOnInit(){

    }

    openSidebar(){
      this.isAddQuestion = true;
    }

    deleteQuestion(questionId : any){

    }

    back(){
    this._router.navigate(['/question-bank']);
    }

}
