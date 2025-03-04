import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { QuestionBankService } from '../../core/services/question-bank.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddQuestionBankComponent } from './add-question-bank/add-question-bank.component';

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [TableModule, InputTextModule, ToastModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, TagModule, ConfirmDialogModule, AddQuestionBankComponent ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.css'
})
export class QuestionBankComponent {

  isAddQuestionBank: boolean = false;
  tableView: boolean = false;
  testListData: any;
  openDropdownId: number | null = null;
  bankList : any;
  isLoader : boolean = true;
  editQestionBank : any;

  constructor(private _router: Router, private _messageService: MessageService, private _confirmationService: ConfirmationService, private _questionBank : QuestionBankService) { }

  ngOnInit() {
    // this.getTestList()
    this.getQuestionBankList()
  }

  getQuestionBankList(){
    this._questionBank.getQuestionBankList().subscribe(res => {
      this.bankList = res.data;
      this.isLoader = false
    })
  }


  openSidebar() {
    this.isAddQuestionBank = true
  }

  closeSideBars(){
    this.isAddQuestionBank = false;
    this.getQuestionBankList();
    this._messageService.add({ severity: 'success', detail: 'Question bank create successfully' });
  }

  navigateDetailsPage(id : any) {
    this._router.navigate(['/test/test-detail', id]);
  }

  viewDetail(bankId : any){
    this._router.navigate(['/question-bank/question-bank-detail', bankId]);
  }

  editQuestionBank(bankData : any){
    this.isAddQuestionBank = true;
    this.editQestionBank = bankData;
  }

  deleteBank(bankId : any){

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
        this._questionBank.deleteQuestionBank(bankId).subscribe((res : any) => {
          this.getQuestionBankList();
          if(res.status == true){
            this._messageService.add({ severity: 'success', detail: res.message });
          }
        }, (error) => {
          this._messageService.add({ severity: 'error', detail: error.error.message });

        });
        
      },
      reject: () => {

      }

    });



  }


}
