import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-add-push-message',
  standalone: true,
  imports: [TableModule, ToastModule, InputTextModule, ToolbarModule, KeyFilterModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule,
      CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule, CheckboxModule,
  ],
  providers: [MessageService],
  templateUrl: './add-push-message.component.html',
  styleUrl: './add-push-message.component.css'
})
export class AddPushMessageComponent {
  campaignFrom! : FormGroup;

  constructor(){}

  ngOnInit(){

  }




  closeSideBar(){
    
  }


}
