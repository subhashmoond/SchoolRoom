import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { AddStudentComponent } from './add-student/add-student.component';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, AddStudentComponent],

  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {
  offset = 0;
  totalRecorde = 100;
  limit = 15;
  addStudentSideBar: boolean = false;

  studentList: any = [];

  constructor(private renderer: Renderer2, private _router: Router, private _userService: UserService) {
  }

  ngOnInit() {
    this.getStudentData();
  }


  getStudentData() {
    this._userService.getStudentData().subscribe(res => {
      this.studentList = res.studentList
    })
  }

  openSidebar() {
    this.addStudentSideBar = true;
  }

  onPageChange(event: any) {
  }

  viewDetails() {
    this._router.navigate(['/user/student-view']);
  }

  closeSideBar(){
    this.addStudentSideBar = false;
    this.getStudentData();
  }




}
