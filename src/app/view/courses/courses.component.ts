import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TranslateModule } from '@ngx-translate/core';
import { PaginatorModule } from 'primeng/paginator';
import { CardModule } from 'primeng/card';
import { RippleModule } from 'primeng/ripple';
import { SkeletonModule } from 'primeng/skeleton';
import { AddCoursesComponent } from './add-courses/add-courses.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, AddCoursesComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  offset = 0;
  totalRecorde = 100;
  limit = 15;
  addCourseSideBar: boolean = false;

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
    // this.addCourseSideBar = true;
    this._router.navigate(['/course/add']);
    
  }

  onPageChange(event: any) {
  }


  closeSideBar(){
    this.addCourseSideBar = false;
    this.getStudentData();
  }

  courseBullder(){
    this._router.navigate(['/course/content']);
  }


}
