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
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AccordionModule } from 'primeng/accordion';
import { BlockUIModule } from 'primeng/blockui';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MessagesModule } from 'primeng/messages';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StepsModule } from 'primeng/steps';
import { SharedService } from '../../../../shared/services/shared.service';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-create-test-course',
  standalone: true,
  imports: [ReactiveFormsModule, StepsModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, CalendarModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, InputNumberModule, CheckboxModule, MessagesModule, AccordionModule,
    TranslateModule, BlockUIModule, ProgressSpinnerModule, CommonModule, InputSwitchModule, EditorModule ],
  providers: [MessageService],
  templateUrl: './create-test-course.component.html',
  styleUrl: './create-test-course.component.css'
})
export class CreateTestCourseComponent {

  @Output() closeCreateTestForm = new EventEmitter<any>();

  coursesForm!: FormGroup;
  aiContentForm!: FormGroup;
  examCategoryForm!: FormGroup;
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
  examList: any;
  subCategoryExamList: any;
  courseType: any
  subCategoryShow: boolean = false;

  // loader boolean Var
  descriptionAIResp: boolean = false;
  stepOne: boolean = false;
  stepTwo: boolean = false;
  stepTree: boolean = false;

  isButtonLoader: boolean = false;

  constructor(private _courseService: CoursesService, private _router: Router, private _fb: FormBuilder, private messageService: MessageService, private translate: TranslateService, private _sharedService: SharedService) { }

  ngOnInit() {
    this.formGroup();
    this.items = [
      { label: 'Course Details' },
      { label: 'Thumbnail' },
      { label: 'Exam Category' }
    ];

    this.getExamCategory();

    this._courseService.getCourseType().subscribe((res: any) => {

      res.data.forEach((item: any) => {
        if (item.types === 'Test Series') {
          this.courseType = item.id
        }
      })

    })

  }

  formGroup() {
    this.coursesForm = this._fb.group({
      name: [''],
      description: [''],
      ispaid: [true],
      price: [''],
      mrp: ['']
    });

    this.aiContentForm = this._fb.group({
      isScratch: [''],
      isGenerate: true,
      descibeCourse: []
    })

    this.examCategoryForm = this._fb.group({
      category: '',
      subcategory: ''
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
    this.selectedOption = true;
    this.selectedFile = null
  }

  submit() {

    debugger

    if (this.activeIndex === 0) {
      this.stepOne = true;
      this.isButtonLoader = true

      const body = {
        "name": this.coursesForm.get('name')?.value,
        "mrp": this.coursesForm.get('mrp')?.value,
        "price": this.coursesForm.get('price')?.value,
        "describe": this.coursesForm.get('description')?.value,
        "language": 2,
        "isPaid": this.coursesForm.get('ispaid')?.value,
        "coursetype": this.courseType
      }
      this._courseService.addCourses(body).subscribe((res: any) => {
        this.isButtonLoader = false
        if (res.status == "Success") {
          this.courseId = res.course.id
          this.stepOne = false
          // this._router.navigate(['/course/content', courseId]);
          this.next();
        } else {
          this.messageService.add({ severity: 'error', detail: res.message });
        }
      })
    }

    if (this.activeIndex === 1) {


      this.stepTwo = true;
      this.isButtonLoader = true;

      if(!this.selectedOption){
        const formData = new FormData();
        formData.append('thumbnail', this.selectedFileObjectUrl);
        formData.append('course_id', this.courseId);
  
        this._courseService.addThumbnail(formData).subscribe(res => {
          this.isButtonLoader = false;
          console.log(res, "thamblanupdate")
          this.stepTwo = false
          this.next();
        })
      }else{
        this.isButtonLoader = false;
        this.stepTwo = false
        this.next();
      }

    }

    if (this.activeIndex === 2) {
      this.stepTree = true;
      this.isButtonLoader = true;

      const category = this.examCategoryForm.get('category')?.value;
      const subcategory = this.examCategoryForm.get('subcategory')?.value;

      const payload = {
        "category_id": category[0],
        "subcategory_id": subcategory[0]
      }

      this._courseService.addExamCategoryInCourse(payload, this.courseId).subscribe(res => {
        this.isButtonLoader = false;
        this.stepTree = false;
      })
      this.next();

      this.closeCreateTestForm.emit(false)
      this._router.navigate(['/test/test-detail', this.courseId]);

    }



  }

  getExamCategory() {
    this._sharedService.getExamCategory().subscribe(res => {
      if (res.status === true) {
        this.examList = res.data
      }
    })
  }


  backCategory() {
    this.subCategoryShow = false;

    this.examCategoryForm.setValue({
      subcategory: ''
    })

  }

  nextSubCategory() {
    this.subCategoryShow = true;

    const categoryId = this.examCategoryForm.get('category')?.value;

    const payload = {
      "category_id": categoryId[0]
    }

    this._sharedService.getExamSubCategory(payload).subscribe((res: any) => {
      if (res.status === true) {
        this.subCategoryExamList = res.data
      }
    })


  }


  addSubjectAndLessonInCourse(data: any) {
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
