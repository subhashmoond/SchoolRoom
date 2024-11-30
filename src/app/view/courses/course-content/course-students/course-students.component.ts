import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { CouponsService } from '../../../../core/services/coupons.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-course-students',
  standalone: true,
  imports: [TableModule, InputTextModule, ToolbarModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule],
  templateUrl: './course-students.component.html',
  styleUrl: './course-students.component.css'
})
export class CourseStudentsComponent {

  priceTableDesign: any;
  isAddStudent: boolean = false;
  createCouponsForm!: FormGroup;
  courseId: any;
  studentList: any[] = [];
  allStudentList : any[] = [];

  constructor(private _fb: FormBuilder, private _courseService: CoursesService, private route: ActivatedRoute, private _userService : UserService) {

    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }

  ngOnInit() {
    // this.priceTableDesign = [
    //   { type: 'One time paymet', price: 20000 }
    // ]
    this.getStudentList()

    this.createCouponsForm = this._fb.group({
      selectstudent: ['', Validators.required],
      todate: [],
      amount: ['', Validators.required]
    })
  }

  getStudentList() {
    this._courseService.getStudentList().subscribe(res => {
      this.studentList = res.response
    })
  }

  openSidebar() {
    this.isAddStudent = true;
    this.getAllStudentList();
  }

  getAllStudentList(){
    this._userService.getStudentData().subscribe(res => {
      this.allStudentList = res.studentList
    })
  }

  createStudent(){

    const payload = {
      "course_id": this.courseId,
      "students": this.createCouponsForm.get('selectstudent')?.value,
      "endDate": this.createCouponsForm.get('todate')?.value,
      "amout": this.createCouponsForm.get('amount')?.value
    }

    this._courseService.addStudentCourse(payload).subscribe(res => {
      this.getStudentList();
      this.isAddStudent = false
    })

  }


}
