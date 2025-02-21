import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
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

@Component({
  selector: 'app-question-bank',
  standalone: true,
  imports: [TableModule, InputTextModule, ToastModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, TagModule],
    providers: [MessageService],
  templateUrl: './question-bank.component.html',
  styleUrl: './question-bank.component.css'
})
export class QuestionBankComponent {

  addFormSideBar: boolean = false;
  tableView: boolean = false;
  testListData: any;
  openDropdownId: number | null = null;


  constructor(private _router: Router, private _messageService: MessageService, private _questionBank : QuestionBankService) { }

  ngOnInit() {
    // this.getTestList()
    this.getQuestionBankList()
  }

  getQuestionBankList(){
    this._questionBank.getQuestionBankList().subscribe(res => {
      
    })
  }


  openSidebar() {
    this.addFormSideBar = true
  }


  navigateDetailsPage(id : any) {
    this._router.navigate(['/test/test-detail', id]);
  }

  


}
