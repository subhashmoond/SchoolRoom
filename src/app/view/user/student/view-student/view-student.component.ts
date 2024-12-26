import { CommonModule, DatePipe, ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { DateFormatPipe } from '../../../../date-format.pipe';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-view-student',
  standalone: true,
  imports: [ButtonModule, TagModule, TabViewModule, SidebarModule, TranslateModule, DatePipe, ConfirmDialogModule,
    CommonModule, SkeletonModule, DateFormatPipe, TableModule, AvatarModule ],
  providers: [DatePipe, ConfirmationService],
  templateUrl: './view-student.component.html',
  styleUrl: './view-student.component.css'
})
export class ViewStudentComponent {

  isLoader : boolean = false;
  constructor(private viewScroller: ViewportScroller, private router: Router, private route: ActivatedRoute, private _confirmationService: ConfirmationService) {
    
  }


  deleteStudent(){}
  blockStudent(){}

}
