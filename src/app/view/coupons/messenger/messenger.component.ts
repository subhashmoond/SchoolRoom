import { Component, Renderer2 } from '@angular/core';
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
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { AddPushMessageComponent } from './add-push-message/add-push-message.component';
import { MarketingService } from '../../../core/services/marketing.service';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule,
    RippleModule, SkeletonModule, ToastModule, AddPushMessageComponent, DatePipe, FormsModule],
  providers: [MessageService],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.css'
})
export class MessengerComponent {

  limit = 10;
  offset: number = 0;
  totalRecorde!: number;
  currentPage: number = 1;

  addMessenger: boolean = false;
  // openDropdownId: number | null = null;
  // editItemData : any;
  isLoader: boolean = false;

  messengerList: any = [];
  typeFilter = "All";

  notificationType = [
    { name: "All" },
    { name: "Sent" },
    { name: "Secheduled" }
  ]


  constructor(private renderer: Renderer2, private _router: Router, private _messageService: MessageService, private _marketingService: MarketingService) {
  }

  ngOnInit() {


    this.getMessengerList();


  }

  getMessengerList() {

    const param = {
      "type": this.typeFilter,
      "page_size": this.limit,
      "current_page": this.currentPage,
    }

    console.log(param, " Get Messager Data Lists ")

    this._marketingService.getCampaignDataList(param).subscribe(res => {
      this.messengerList = res.data;

      this.totalRecorde = res.total_record;
      this.currentPage = res.current_page;
    })
  }

  onSelectNotificationType(event: any) {
    this.currentPage = 1
    this.getMessengerList();
    
  }

  onPageChange(event: any) {
    this.offset = event.first;
    this.limit = event.rows;
    this.currentPage = event.page + 1;
    this.getMessengerList();

    console.log(this.currentPage, "after page change data")
  }


  openSidebar() {
    this.addMessenger = true;
  }

  closeSideBar(event: any) {
    this.currentPage = 1
    this.addMessenger = false;
    if (event == "done") {
      this._messageService.add({ severity: 'success', detail: "Campaign created successfully!" });
    }
    this.getMessengerList();

  }



}
