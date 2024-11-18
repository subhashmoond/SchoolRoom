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
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [ReactiveFormsModule, StepsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, CalendarModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, InputNumberModule, CheckboxModule, MessagesModule, AccordionModule,
    TranslateModule, BlockUIModule, ProgressSpinnerModule, CommonModule, InputSwitchModule, GeminiAiComponent],
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
  maxFileSizeLimit = 10 * 1024 * 1024;
  courseId: any
  selectedOption: boolean = false

  // loader boolean Var
  descriptionAIResp : boolean = false;
  stepOne : boolean = false;
  stepTwo : boolean = false;
  stepTree : boolean = false;
  stepFor : boolean = false;

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

  selectOption() {
    this.selectedOption != this.selectedOption
  }

  submit() {

    if (this.activeIndex === 0) {
      this.stepOne = true

      const body = {
        "name": this.coursesForm.get('name')?.value,
        "price": this.coursesForm.get('price')?.value,
        "describe": this.coursesForm.get('description')?.value,
        "language": 2,
        "isPaid": this.coursesForm.get('ispaid')?.value
      }
      this._courseService.addCourses(body).subscribe((res: any) => {
        if (res.status == "Success") {
          this.courseId = res.course.id
          this.stepOne = false
          // this._router.navigate(['/course/content', courseId]);
          this.next();
        }
      })
    }

    if(this.activeIndex === 1){
      this.stepTwo = true

      const formData = new FormData();
      formData.append('thumbnail', this.selectedFileObjectUrl);
      formData.append('course_id', this.courseId);

      this._courseService.addThumbnail(formData).subscribe(res => {
        console.log(res, "thamblanupdate")
        this.stepTwo = false
        this.next();
      })


    }

    if (this.activeIndex === 2) {

      const selectOptionValue = this.aiContentForm.get('isGenerate')?.value

      if(selectOptionValue == true){
        this.stepTree = true
        const body = {
          "template": "content",
          "courseName": this.coursesForm.get('name')?.value,
          "userPrompt": this.aiContentForm.get('descibeCourse')?.value
        }
  
        this._sharedService.getAIResponse(body).subscribe((res: any) => {
          this.stepTree = false
          const resData = res.data
          this.aiDescripationData = JSON.parse(resData)
          console.log(this.aiDescripationData, "Course AI response")
          this.addSubjectAndLessonInCourse(this.aiDescripationData)
        })
      }else{
        this._router.navigate(['/course/content', this.courseId]);
      }

    }


  }

  addSubjectAndLessonInCourse(data: any) {

    debugger

    type SectionLesson = {
      section: string;
      lessone: string[];
    };

    type Payload = {
      course: number;
      section_lesson: SectionLesson[];
    };

    const payload: Payload = {
      course: this.courseId,
      section_lesson: []
    };

    const mainKey = Object.keys(data)[0];

    // Merge data (assuming 'data' is similar to 'subjects')
    data[mainKey].forEach((item: any) => {
      const chapterKey = item.chapter_name ? 'chapter_name' : 'chapter';

      const newSection: SectionLesson = {
        section: item[chapterKey],
        lessone: item.target_words
      };
      payload.section_lesson.push(newSection);
    });

    this._courseService.addCoursesAIResponse(payload).subscribe(res => {
          this._router.navigate(['/course/content', this.courseId]);
    })
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
    this.descriptionAIResp = true
    const body = {
      "template": "description",
      "courseName": this.coursesForm.get('name')?.value
    }

    this._sharedService.getAIResponse(body).subscribe((res: any) => {
      this.descriptionAIResp = false
      const resData = res.data
      this.aiDescripationData = JSON.parse(resData)
      this.coursesForm.patchValue({
        description: this.aiDescripationData.description
      })

    })
  }




  closeSide() {

  }


}
