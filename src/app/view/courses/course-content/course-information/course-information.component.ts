import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { StepsModule } from 'primeng/steps';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SharedService } from '../../../../shared/services/shared.service';
import { MessageService } from 'primeng/api';
import { EditorModule } from 'primeng/editor';
import { SidebarModule } from 'primeng/sidebar';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-course-information',
  standalone: true,
  imports: [ReactiveFormsModule, StepsModule, TableModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, CalendarModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, InputNumberModule, CheckboxModule, EditorModule, SidebarModule],
  providers: [MessageService],
  templateUrl: './course-information.component.html',
  styleUrl: './course-information.component.css'
})
export class CourseInformationComponent {
  courseInformation!: FormGroup;
  addTeacherForm!: FormGroup;
  courseId: any;
  aiDescripationData: any;
  courseDetails: any;
  courseTypeId: any;
  isTeacher: boolean = false;
  allTeacherList : any;
  langListData : any


  constructor(private _fb: FormBuilder, private _messageService: MessageService, private _coursesService: CoursesService, private route: ActivatedRoute, private _sharedService: SharedService, private _userService: UserService) {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }

  ngOnInit() {
    this.getCourseDetails();
    this.getCourseType();
    this.getTeacherList();
    this.getLang();

    this.addTeacherForm = this._fb.group({
      selectTeacher: ['']
    })

    this.courseInformation = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tagline: ['', Validators.required],
      lang : [''],
      highlights: this._fb.array([]),
      whatlearn: this._fb.array([]),
      faq: this._fb.array([])
    })

  }

  getLang(){
    this._coursesService.getLangList().subscribe(res => {
      this.langListData = res.languages
    })
  }

  getTeacherList() {

    this._userService.getTeacherList().subscribe(res => {
      this.allTeacherList = res.teacher
    })

  }

  dataSetOnFromArray() {


    // Populate simple form controls
    this.courseInformation.patchValue({
      title: this.courseDetails.name || '', // Course name
      description: this.courseDetails.details || '', // Course details
      tagline: this.courseDetails.tagline || '', // Course tagline
      lang : this.courseDetails.language || ''
    });

    // Clear existing FormArray controls before repopulating
    this.highlights.clear();
    this.whatlearn.clear();
    this.faq.clear();

    // Populate Highlights FormArray
    if (this.courseDetails.keyHighlights && Array.isArray(this.courseDetails.keyHighlights)) {
      this.courseDetails.keyHighlights.forEach((highlight: string) => {
        this.highlights.push(this._fb.control(highlight, Validators.required));
      });
    }

    // Populate WhatLearn (Features) FormArray
    if (this.courseDetails.features && Array.isArray(this.courseDetails.features)) {
      this.courseDetails.features.forEach((feature: any) => {
        this.whatlearn.push(
          this._fb.group({
            icon: [feature.icon || 'pi pi-megaphone', Validators.required],
            title: [feature.title || '', Validators.required],
            description: [feature.description || '', Validators.required]
          })
        );
      });
    }

    // Populate FAQ FormArray
    if (this.courseDetails.faq && Array.isArray(this.courseDetails.faq)) {
      this.courseDetails.faq.forEach((faqItem: any) => {
        this.faq.push(
          this._fb.group({
            question: [faqItem.question || '', Validators.required],
            answer: [faqItem.answer || '', Validators.required]
          })
        );
      });
    }

    console.log('Form populated:', this.courseInformation.value);
  }


  getCourseType() {
    this._coursesService.getCourseType().subscribe(res => {
      res.data.forEach((item: any) => {
        if (item === "Live") {
          this.courseTypeId = item.id
        }
      })
      console.log(res, "course response ")
    })
  }

  get highlights(): FormArray {
    return this.courseInformation.get('highlights') as FormArray;
  }

  // get whatlearn(): FormArray {
  //   return this.courseInformation.get('whatlearn') as FormArray;
  // }

  // get faq(): FormArray {
  //   return this.courseInformation.get('faq') as FormArray;
  // }

  get whatlearn(): FormArray {
    return this.courseInformation.get('whatlearn') as FormArray;
  }

  get faq(): FormArray {
    return this.courseInformation.get('faq') as FormArray;
  }

  addHighlights() {
    this.highlights.push(new FormControl(''));
  }

  removeItem(index: number) {
    this.highlights.removeAt(index);
  }

  addWhatlearn() {
    const rowGroup = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.whatlearn.push(rowGroup);
  }

  removeWhatlearn(index: number) {
    this.whatlearn.removeAt(index);
  }

  addFaq() {
    const rowGroup = this._fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
    this.faq.push(rowGroup);
  }

  removeFaq(index: number) {
    this.faq.removeAt(index);
  }

  // addWhatlearn() {
  //   const rowGroup = this._fb.group({
  //     icon: ['pi pi-megaphone'],  
  //     title: ['', Validators.required],
  //     description: ['', Validators.required]
  //   });

  //   this.whatlearn.push(rowGroup);
  // }

  // removeRow(index: number) {
  //   this.whatlearn.removeAt(index);
  // }

  // addFaq() {
  //   const rowGroup = this._fb.group({
  //     question: ['', Validators.required],
  //     answer: ['', Validators.required]
  //   });

  //   this.faq.push(rowGroup);
  // }

  // removeFaq(index: number) {
  //   this.faq.removeAt(index);
  // }


  getCourseDetails() {
    this._coursesService.getCourseById(this.courseId).subscribe(res => {
      this.courseDetails = res.course;
      this.dataSetOnFromArray();
    })
  }




  // AI Response 
  aiHighlights() {
    const body = {
      "template": "highlight",
      "courseName": "Front End Development"
    }

    this._sharedService.getAIResponse(body).subscribe((res: any) => {
      const resData = res.data
      this.aiDescripationData = JSON.parse(resData)
      console.log(this.aiDescripationData, "Course AI response")


    })
  }




  saveDetails() {

    debugger

    console.log(this.courseInformation.value, "course information data")

    const faqData = this.faq.controls.map((control) => control.value); // Extract values
    const featuresData = this.whatlearn.controls.map((control) => control.value);

    console.log(faqData, "faq data ")

    const payload = {
      "name": this.courseInformation.get('title')?.value,
      "course_type": this.courseTypeId,
      "describe": this.courseInformation.get('description')?.value,
      "teacher_list": [],
      "highlights": this.courseInformation.get('highlights')?.value,
      "short_describe": this.courseInformation.get('tagline')?.value,
      "faq": faqData,
      "features": featuresData,
      "language" : this.courseInformation.get('lang')?.value,
    }

    this._coursesService.editCourseById(this.courseId, payload).subscribe(res => {
      this._messageService.add({ severity: 'success', detail: 'Information Saved Successfull.' });
      this.getCourseDetails()
    }, error => {
      this._messageService.add({ severity: 'error', detail: error });

    })

  }



  addTeachers() {
    this.isTeacher = true
  }

  closeTeacherFor(){
    this.isTeacher = false;
  }

  createTeachert(){

    const payload = {
    "teacher_list":[this.addTeacherForm.get('selectTeacher')?.value],
    }

    this._coursesService.editCourseById(this.courseId, payload).subscribe(res => {
      this.getCourseDetails()
    })

  }

}
