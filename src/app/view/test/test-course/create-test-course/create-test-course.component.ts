import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { CoursesService } from '../../../../core/services/courses.service';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-test-course',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CheckboxModule, KeyFilterModule, ToastModule ],
  providers : [MessageService],
  templateUrl: './create-test-course.component.html',
  styleUrl: './create-test-course.component.css'
})
export class CreateTestCourseComponent {
  @Output() closeSideBar = new EventEmitter<any>()

  coursesForm!: FormGroup;
  courseTypeId : any

  constructor(private _fb: FormBuilder, private _courseService : CoursesService, private messageService: MessageService) {

  }

  ngOnInit() {

    this.getCurseTypeList()

    this.coursesForm = this._fb.group({
      name: [''],
      description: [''],
      ispaid: [true],
      price: ['']
    });

  }

  getCurseTypeList(){

    this._courseService.getCourseType().subscribe(res => {
      const data = res.data

      data.forEach((item : any) => {
        if(item.types === "Test Series"){
          this.courseTypeId = item.id
          console.log(this.courseTypeId, "course type")
        }
      })

    })

  }

  submit() {

    console.log(this.coursesForm, "create test")

    const payload = {
      "name": this.coursesForm.get('name')?.value,
      "price": this.coursesForm.get('price')?.value,
      "describe": this.coursesForm.get('description')?.value,
      "language": 2,
      "isPaid": this.coursesForm.get('ispaid')?.value,
      "coursetype": this.courseTypeId,
    }

    this._courseService.addCourses(payload).subscribe((res : any) => {

      if(res.status === 'Success'){
        this.closeSideBar.emit(false)
      }else{
      }
      this.messageService.add({ severity: 'error', detail: res.message});

    })

  }


}
