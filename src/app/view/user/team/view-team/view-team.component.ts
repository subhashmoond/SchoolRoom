import { DatePipe, CommonModule, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { DateFormatPipe } from '../../../../date-format.pipe';

@Component({
  selector: 'app-view-team',
  standalone: true,
   imports: [ButtonModule, TagModule, TabViewModule, SidebarModule, TranslateModule, DatePipe, ConfirmDialogModule,
      CommonModule, SkeletonModule, DateFormatPipe, TableModule, AvatarModule ],
    providers: [DatePipe, ConfirmationService],
  templateUrl: './view-team.component.html',
  styleUrl: './view-team.component.css'
})
export class ViewTeamComponent {

  isLoader : boolean = false;
  constructor(private viewScroller: ViewportScroller, private router: Router, private route: ActivatedRoute, private _confirmationService: ConfirmationService) {
    
  }


  deleteStudent(){}
  blockStudent(){}

}
