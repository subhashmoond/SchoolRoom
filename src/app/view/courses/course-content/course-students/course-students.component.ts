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
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-course-students',
  standalone: true,
  imports: [TableModule, InputTextModule, ToastModule, ToolbarModule, KeyFilterModule, ButtonModule, SidebarModule, TranslateModule, PaginatorModule, CardModule, RippleModule, SkeletonModule, ReactiveFormsModule, CheckboxModule, CalendarModule],
  providers: [MessageService],
  templateUrl: './course-students.component.html',
  styleUrl: './course-students.component.css'
})
export class CourseStudentsComponent {

  priceTableDesign: any;
  isAddStudent: boolean = false;
  createCouponsForm!: FormGroup;
  courseId: any;
  buyStudentList: any[] = [];
  allStudentList : any[] = [];

  constructor( private _messageService: MessageService, private _fb: FormBuilder, private _courseService: CoursesService, private route: ActivatedRoute, private _userService : UserService) {

    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }

  ngOnInit() {
    // this.priceTableDesign = [
    //   { type: 'One time paymet', price: 20000 }
    // ]
    this.getBuyStudentList()

    this.createCouponsForm = this._fb.group({
      selectstudent: ['', Validators.required],
      todate: [],
      amount: ['', Validators.required]
    })
  }

  getBuyStudentList() {
    this._courseService.getStudentList(this.courseId).subscribe(res => {
      this.buyStudentList = res.data
    })
  }

 

  openSidebar() {
    this.isAddStudent = true;
    this.getAllStudentList();
  }

  getAllStudentList(){
    this._courseService.getStudentsList().subscribe(res => {
      this.allStudentList = res.data
    })
  }

  createStudent(){

    const dateObj = new Date(this.createCouponsForm.get('todate')?.value);
    const formattedDate = dateObj.toLocaleDateString("en-CA");

    const payload = {
      "course_id": this.courseId,
      "students": this.createCouponsForm.get('selectstudent')?.value,
      "endDate": new Date(this.createCouponsForm.get('todate')?.value),
      "amout": this.createCouponsForm.get('amount')?.value
    }

    this._courseService.addStudentCourse(payload).subscribe((res : any) => {

      if(res.status === true){
        this.getBuyStudentList();
        this.isAddStudent = false;
        this._messageService.add({ severity: 'success', summary: 'Plan Created Successfully' });
        this.createCouponsForm.reset();
      }else{
        this._messageService.add({ severity: 'error', summary: res.message });
      }

    })

  }

  removeStudent(studentId : any){

    const payload = {
      "student_id": studentId
    }

    this._courseService.removeStudentInCourse(this.courseId, payload).subscribe(res => {
      
      this.getBuyStudentList();

    })

  }


  closeSideBar(){
    this.createCouponsForm.reset();
    this.isAddStudent = false;
  }


}
