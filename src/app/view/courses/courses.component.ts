import { Component, EventEmitter, HostListener, Output, Renderer2 } from '@angular/core';
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
import { CoursesService } from '../../core/services/courses.service';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule,
    SkeletonModule, AddCoursesComponent, TagModule, SelectButtonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {

  @HostListener('document:click', ['$event'])

  offset = 0;
  totalRecorde = 100;
  limit = 15;
  addCourseSideBar: boolean = false;

  coursesList: any = [];
  openDropdownId: number | null = null;
  tableView: boolean = false

  mainLoader : boolean = true

  value: any;
  justifyOptions: any[] = [
    { icon: '../../../../assets/images/icon/mage-dashboard.svg', justify: 'Center' },
    { icon: '../../../../assets/images/icon/list-bold.svg', justify: 'Justify' }
  ];


  constructor(private renderer: Renderer2, private _router: Router, private _coursesService: CoursesService) {
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this._coursesService.getCoursesList().subscribe(res => {
      this.coursesList = res.courses
      this.mainLoader = false
    })
  }

  openSidebar() {
    this.addCourseSideBar = true;
    // this._router.navigate(['/course/add']);
  }

  onPageChange(event: any) {
  }


  closeSideBar() {
    this.addCourseSideBar = false;
    this.getCourses();
  }

  courseBullder(id: number) {
    this._router.navigate(['/course/content', id]);
  }

  deleteCourse(id: any) {

    const payload = {
      "course_id": id
    }

    this._coursesService.deleteCourse(payload).subscribe(res => {

    })

  }

  publishCourse(id : any){
    const payload = {
      "course_id": id,
      "publish":true
  }

  this._coursesService.coursePublish(payload).subscribe(res => {

  })

  }

 



  toggleDropdown(itemId: any) {
    this.openDropdownId = this.openDropdownId === itemId ? null : itemId;
  }


  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.action-menu')) {
      this.openDropdownId = null; 
    }
  }

  listViewChange(type: any) {

    if (type === 'card') {
      this.tableView = false
    } else {
      this.tableView = true
    }

  }

}
