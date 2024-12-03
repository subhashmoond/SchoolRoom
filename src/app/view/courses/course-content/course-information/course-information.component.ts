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

@Component({
  selector: 'app-course-information',
  standalone: true,
  imports: [ReactiveFormsModule, StepsModule, TableModule, InputGroupModule, InputGroupAddonModule, DropdownModule, CardModule, CalendarModule, KeyFilterModule,
    ButtonModule, InputTextModule, FileUploadModule, ToastModule, InputNumberModule, CheckboxModule,],
    providers : [MessageService],
  templateUrl: './course-information.component.html',
  styleUrl: './course-information.component.css'
})
export class CourseInformationComponent {
  courseInformation!: FormGroup;
  courseId: any;
  aiDescripationData: any;
  courseDetails: any;

  constructor(private _fb: FormBuilder, private _messageService : MessageService, private _coursesService: CoursesService, private route: ActivatedRoute, private _sharedService: SharedService) {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }

  ngOnInit() {
    this.getCourseDetails();
    this.courseInformation = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tagline: ['', Validators.required],
      highlights: this._fb.array([]),
      whatlearn: this._fb.array([]),
      faq: this._fb.array([])
    })
  }

  get highlights(): FormArray {
    return this.courseInformation.get('highlights') as FormArray;
  }

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
      icon: ['pi pi-megaphone'],  // Default icon (can be dynamic)
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.whatlearn.push(rowGroup);
  }

  // Method to remove a row
  removeRow(index: number) {
    this.whatlearn.removeAt(index);
  }

  addFaq() {
    const rowGroup = this._fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });

    this.faq.push(rowGroup);
  }

  // Method to remove a row
  removeFaq(index: number) {
    this.faq.removeAt(index);
  }


  getCourseDetails() {
    this._coursesService.getCourseById(this.courseId).subscribe(res => {
      this.courseDetails = res.course;
      this.dataSetOnFromArray();
    })
  }

  dataSetOnFromArray() {

    this.courseInformation.patchValue({
      title: this.courseDetails.course.name,
      description: this.courseDetails.course.details,
      tagline: this.courseDetails.course.tagline,
    })


    // Populate Highlights FormArray
    this.courseDetails.course.keyHighlights.forEach((highlight: any) => {
      this.highlights.push(this._fb.control(highlight, Validators.required));
    });

    // Populate WhatLearn FormArray (features)
    if (this.courseDetails.course.features && Array.isArray(this.courseDetails.course.features)) {
      debugger
      this.courseDetails.course.features.forEach((feature: any) => {
        this.whatlearn.push(this._fb.group({
          icon: [feature.icon, Validators.required],
          title: [feature.title, Validators.required],
          description: [feature.description, Validators.required]
        }));
      });
    }

    // Populate FAQ FormArray
    if (this.courseDetails.course.faq && Array.isArray(this.courseDetails.course.faq)) {
      this.courseDetails.course.faq.forEach((faqItem: any) => {
        debugger
        this.faq.push(this._fb.group({
          question: [faqItem.question, Validators.required],
          answer: [faqItem.answer, Validators.required]
        }));
      });
    }


    console.log(this.highlights.value, 'Highlights FormArray Data');
  console.log(this.whatlearn.value, 'WhatLearn FormArray Data');
  console.log(this.faq.value, 'FAQ FormArray Data');


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

    console.log(this.courseInformation.value, "course information data")

    const faqData = this.faq.controls.map((group) => group.value);
    const featuresData = this.whatlearn.controls.map((group) => group.value);

    console.log(faqData, "faq data ")

    const payload = {
      "name": this.courseInformation.get('title')?.value,
      "course_type": 2,
      "describe": this.courseInformation.get('description')?.value,
      "teacher_list": [2],
      "highlights": this.courseInformation.get('highlights')?.value,
      "short_describe": this.courseInformation.get('tagline')?.value,
      "faq": faqData,
      "features": featuresData
    }

    this._coursesService.editCourseById(this.courseId, payload).subscribe(res => {
      this._messageService.add({ severity: 'success', detail: 'Information Saved Successfull.' });
      this.getCourseDetails()
    }, error => {
      this._messageService.add({ severity: 'error', detail: error });

    })

  }

}
