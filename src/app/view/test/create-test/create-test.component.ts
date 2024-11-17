import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessagesModule } from 'primeng/messages';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { TestService } from '../../../core/services/test.service';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [ReactiveFormsModule, StepsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, CalendarModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, InputNumberModule, CheckboxModule, MessagesModule, AccordionModule,
    TranslateModule, BlockUIModule, CommonModule, InputSwitchModule],
  providers: [MessageService, TestService],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css'
})
export class CreateTestComponent {

  addTestForm!: FormGroup;
  activeIndex: number = 0;
  items: any;
  courseList : any;

  constructor(private _messageService: MessageService, private _fb: FormBuilder, private _testService: TestService, private _courseService : CoursesService) { }

  ngOnInit() {
    this.formControl();
    this.getCourseList();
  }

  getCourseList(){
    this._courseService.getCoursesList().subscribe(res => {
      this.courseList = res.courses
    })
  }

  formControl() {
    this.addTestForm = this._fb.group({
      name: ['', Validators.required],
      totalTime: [''],
      startTime: [''],
      endTime: [''],
      lesson : ['']
    })
  }

  next() {
    if (this.activeIndex < this.items.length - 1) {
      this.activeIndex++;
    }
  }

  back() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  formatDateWithoutPipe(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  submit() {

    const startTime = this.addTestForm.get('startTime')?.value
    const startDate = this.formatDateWithoutPipe(startTime)

    const endTime = this.addTestForm.get('startTime')?.value
    const enddate = this.formatDateWithoutPipe(endTime)

    const payload = {
      "title" : this.addTestForm.get('name')?.value,
      "totalTime" : this.addTestForm.get('totalTime')?.value,
      "support_another_lang" : true,
      "another_lang":1,
      "test_start_time" : startDate,
      "end_time" : enddate,
      "lesson_id" : this.addTestForm.get('lesson')?.value,
    }

    this._testService.addTest(payload).subscribe((res:any) => {

      if(res.status == true){
      }
    })


  }

}

