import { Component } from '@angular/core';
import { CoursesComponent } from '../courses.component';
import { CoursesService } from '../../../core/services/courses.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { MessagesModule } from 'primeng/messages';
import { AccordionModule } from 'primeng/accordion';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BlockUIModule } from 'primeng/blockui';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared/services/shared.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { GeminiAiComponent } from '../../../shared/components/gemini-ai/gemini-ai.component';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [ReactiveFormsModule, StepsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, CalendarModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, InputNumberModule, CheckboxModule, MessagesModule, AccordionModule,
    TranslateModule, BlockUIModule, CommonModule, InputSwitchModule, GeminiAiComponent],
  providers: [MessageService],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.css'
})
export class AddCoursesComponent {

  coursesForm!: FormGroup;
  aiContentForm!: FormGroup;
  selectedFileObjectUrl: any;
  fileUpload: any;
  selectedFile: any;
  isThumbnail: boolean = false;
  aiDescripationData: any = [];
  items: any;
  activeIndex: number = 0;

  constructor(private _courseService: CoursesService, private _router: Router, private _fb: FormBuilder, private _messageService: MessageService, private translate: TranslateService, private _sharedService: SharedService) { }

  ngOnInit() {
    this.formGroup();
    this.items = [
      { label: 'Course Details' },
      { label: 'Thumbnail' },
      { label: 'Confirmation' }
    ];

  }

  formGroup() {
    this.coursesForm = this._fb.group({
      name: [''],
      description: [''],
      ispaid: [true],
      price: ['']
    });

    this.aiContentForm = this._fb.group({
      isScratch: [''],
      isGenerate: true,
      descibeCourse: []
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

  submit() {

    if (this.activeIndex === 0) {
      this.next();

      // const body = {
      //   "name": this.coursesForm.get('name')?.value,
      //   "price": this.coursesForm.get('price')?.value,
      //   "describe": this.coursesForm.get('description')?.value,
      //   "language": 2,
      //   "is_paid": this.coursesForm.get('ispaid')?.value
      // }
      // this._courseService.addCourses(body).subscribe((res:any) => {
      //   if(res.status == "Success"){
      //     const courseId = res.course.id
      //     // this._router.navigate(['/course/content', courseId]);
      //     this.next();
      //   }
      // })
    }

    if (this.activeIndex === 1) {
      const body = {
        "template": "content",
        "courseName": this.coursesForm.get('name')?.value,
        "userPrompt" : this.aiContentForm.get('descibeCourse')?.value
      }

      this._sharedService.getAIResponse(body).subscribe((res: any) => {
        const resData = res.data
        this.aiDescripationData = JSON.parse(resData)
        console.log(this.aiDescripationData, "Course AI response")

      })
    }


  }



  onFileSelect(event: any) {
    if (event.files.length > 0) {
      this.selectedFile = event.files[0];
      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedFileObjectUrl = e.target?.result as string;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  profileImageRemove() {
    this.selectedFileObjectUrl = null;
    this.fileUpload.clear();
  }

  aiSubmit() {
    const body = {
      "template": "description",
      "courseName": this.coursesForm.get('name')?.value
    }

    this._sharedService.getAIResponse(body).subscribe((res: any) => {
      const resData = res.data
      this.aiDescripationData = JSON.parse(resData)
      console.log(this.aiDescripationData, "Course AI response")

      this.coursesForm.patchValue({
        description: this.aiDescripationData.description
      })

    })
  }




  closeSide() {

  }


}
