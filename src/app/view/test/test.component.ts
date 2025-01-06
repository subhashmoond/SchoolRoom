import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import { Router } from '@angular/router';
import { CreateMainTestComponent } from './main-test/create-main-test/create-main-test.component';
import { CreateTestCourseComponent } from './test-course/create-test-course/create-test-course.component';
import { CoursesService } from '../../core/services/courses.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [TableModule, InputTextModule, CreateTestCourseComponent, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, TagModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  addFormSideBar : boolean = false;
  tableView : boolean = false;
  testListData : any

  constructor(private _router: Router, private _courseService : CoursesService){ }

  ngOnInit(){
    this.getTestList()
  }

  getTestList(){
    this._courseService.getCourseListTypeWais('Test Series').subscribe(res => {
      this.testListData = res
    })
  }

  openSidebar(){
    this.addFormSideBar = true
  }

  closeSideBar(){
    this.addFormSideBar = true
  }


  listViewChange(type : any){
    if(type === 'card'){
      this.tableView = false
    }
    else{
      this.tableView = true
    }

  }


  navigateDetailsPage(){
    this._router.navigate(['/test/test-plan']);
  }
}
