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
import { TestService } from '../../core/services/test.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [TableModule, InputTextModule, CreateTestCourseComponent, ToastModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, TagModule],
  providers: [MessageService],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {
  addFormSideBar: boolean = false;
  tableView: boolean = false;
  testListData: any;
  openDropdownId: number | null = null;


  constructor(private _router: Router, private _courseService: CoursesService, private _testService: TestService, private _messageService: MessageService) { }

  ngOnInit() {
    this.getTestList()
  }

  getTestList() {
    this._courseService.getCourseListTypeWais('Test Series').subscribe(res => {
      this.testListData = res.courses
    })
  }

  openSidebar() {
    this.addFormSideBar = true
  }

  closeSideBar() {
    this.addFormSideBar = false;
    this.getTestList();
    this._messageService.add({ severity: 'success', detail: "Test created successfully!" });
  }


  listViewChange(type: any) {
    if (type === 'card') {
      this.tableView = false
    }
    else {
      this.tableView = true
    }

  }


  navigateDetailsPage(id : any) {

    this._router.navigate(['/test/test-detail', id]);
  }

  toggleDropdown(itemId: any) {
    this.openDropdownId = this.openDropdownId === itemId ? null : itemId;
  }


  deleteCourse(id: any) {

    const payload = {
      "course_id": id
    }

    this._courseService.deleteCourse(payload).subscribe((res: any) => {
      if (res.status === "Success") {
        this.getTestList();
        this._messageService.add({ severity: 'success', detail: res.message });
      }
    })

  }


  publishCourse(id: any) {
    const payload = {
      "course_id": id,
      "publish": true
    }

    this._courseService.coursePublish(payload).subscribe((res: any) => {

      if (res.status === true) {
        this.getTestList()
        this._messageService.add({ severity: 'success', detail: res.message });
      }

    })

  }

}
