import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { CoursesService } from '../../../../core/services/courses.service';
import { TestService } from '../../../../core/services/test.service';

@Component({
  selector: 'app-test-curriculum',
  standalone: true,
  imports: [CardModule, ButtonModule, MenuModule, ReactiveFormsModule, InputTextModule, SkeletonModule, ToastModule],
  providers: [MessageService],
  templateUrl: './test-curriculum.component.html',
  styleUrl: './test-curriculum.component.css'
})
export class TestCurriculumComponent {

  addForm!: FormGroup;
  isSavedCourses: boolean[] = [];
  isEditLesson: boolean[][] = [];
  courseId: any; // remove this after code done
  testId: any
  dragData: any;
  isLoader: boolean = true;
  openDropdownId: number | null = null;
  openDropdownIdLession: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _messageService: MessageService, private _router: Router, private _courseService: CoursesService, private _testService: TestService) {
    this.route.paramMap.subscribe(params => {
      this.testId = params.get('id')
      this.courseId = params.get('id')!;
    });
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      courses: this.fb.array([])
    });

    this.getCoursesList();
    this.getSubjectAndChapter();

  }


  getCoursesList() {
    this._courseService.getCourseDetailById(this.courseId).subscribe(res => {
      // Handle the response
    });
  }

  getSubjectAndChapter() {
    this._testService.getSuperSetAndSubSetData(this.testId).subscribe(res => {
      this.isLoader = false
      this.setCourses(res);
    });
  }

  setCourses(data: any) {

    const courseArray = data.data.map((course: any, index: number) => {
      console.log('Processing super set:', course);

      this.isSavedCourses[index] = false;  // Initialize the isSavedCourses array
      this.isEditLesson[index] = [];       // Initialize the isEditLesson array

      return this.fb.group({
        id: [course.id],
        items: [course.name],
        lessons: this.fb.array(course.subsets.map((lesson: any, lessonIndex: number) => {
          this.isEditLesson[index][lessonIndex] = false;  // Initialize each lesson's edit state
          return this.fb.group({
            id: [lesson.id],
            items: [lesson.name, Validators.required],
            isPublished: [lesson.isPublished]
          });
        }))
      });
    });

    this.addForm.setControl('courses', this.fb.array(courseArray));
  }

  get courses(): FormArray {
    return this.addForm.get('courses') as FormArray;
  }

  lessons(index: number): FormArray {
    return this.courses.at(index).get('lessons') as FormArray;
  }

  lessonDetail(lessonId: any) {
    this._router.navigate(['/test/test-list', lessonId], { queryParams: { courseId: this.testId } });
  }

  preview() {
    this._router.navigate(['/course/preview', this.courseId])
  }

  addCourse(): void {
    this.courses.push(this.fb.group({
      items: ['', Validators.required],
      lessons: this.fb.array([])
    }));
    this.isSavedCourses.push(true);
    this.isEditLesson.push([]);
  }

  addLesson(courseIndex: number): void {
    this.lessons(courseIndex).push(this.fb.group({
      items: ['', Validators.required]
    }));
    this.isEditLesson[courseIndex].push(true); // Set the new lesson to edit mode
  }

  enableEditCourse(index: number): void {
    this.isSavedCourses[index] = true;
  }

  deleteCourse(index: number): void {
    const course = this.courses.at(index);
    const courseId = course.get('id')?.value;

    console.log(courseId, "and old", this.courseId)

    this._testService.deleteSuperSet(this.testId, courseId).subscribe((res : any) => {

      if(res.status === true){
        this._messageService.add({ severity: 'success', detail: 'Super Set deleted Successfully!' });
        this.getSubjectAndChapter(); 
      }else{
        this._messageService.add({ severity: 'error', detail: res.message });
      }

    })

  }

  // enableEditLesson(courseIndex: number, lessonIndex: number): void {
  //   this.isEditLesson[courseIndex].fill(false); // Disable all lessons for the course
  //   this.isEditLesson[courseIndex][lessonIndex] = true; // Enable only the clicked lesson
  // }

  enableEditLesson(courseIndex: number, lessonIndex: number): void {
    this.isEditLesson[courseIndex][lessonIndex] = true; // Enable editing
  }

  deleteLesson(courseIndex: number, lessonIndex: number, subjectId: any): void {
    const lessonId = this.lessons(courseIndex).at(lessonIndex).get('id')?.value;

    this._testService.deleteSubSet( this.testId, lessonId).subscribe((res : any) => {

      if(res.status === true){
        this._messageService.add({ severity: 'success', detail: res.message });
        this.getSubjectAndChapter(); 
      }else{
        this._messageService.add({ severity: 'error', detail: res.message });
      }

    }, error => {
      console.error('Error deleting lesson', error);
    });
  }

  setPreview(courseIndex: number, lessonIndex: number, subjectId: any) {

    const lessonId = this.lessons(courseIndex).at(lessonIndex).get('id')?.value;

    console.log(lessonId, "and", subjectId)


    const payload = {
      "ids": [lessonId]
    }

    this._courseService.setLessionPreview(this.courseId, payload).subscribe(res => {

    })



  }


  saveCourse(index: number): void {

    this.isSavedCourses[index] = false;
    const course = this.courses.at(index);

    console.log(this.isEditLesson, "is Edit Lesson mehtod")

    const editSubjectId = course.get('id')?.value;

    if (editSubjectId) {

      const editCoursePayload = {
        name: course.get('items')?.value,
      };

      this._testService.editSuperSet(this.testId, editSubjectId, editCoursePayload).subscribe(res => {
        this._messageService.add({ severity: 'success', detail: 'Super Set Saved Successfully!' });
        this.getSubjectAndChapter()
      })


    } else {

      const superSetPayload = {
        name: course.get('items')?.value,
      };

      this._testService.addSuperSet(this.testId, superSetPayload).subscribe(res => {
        console.log('Set saved successfully', res);
        this.getSubjectAndChapter()
        this._messageService.add({ severity: 'success', detail: 'Set Saved Successfully! ' });

      }, error => {
        console.error('Error saving course', error);
        this._messageService.add({ severity: 'error', detail: 'Error ' });

      });

    }


  }

  saveLesson(courseIndex: number, lessonIndex: number, subjectId: any): void {
    this.isEditLesson[courseIndex][lessonIndex] = false;  // Close the input after saving
    const lessonsControl = this.lessons(courseIndex);
    lessonsControl.at(lessonIndex).markAsDirty();
    lessonsControl.at(lessonIndex).updateValueAndValidity();

    const lessonId = lessonsControl.at(lessonIndex).get('id')?.value;

    if (lessonId) {

      const updatedLessonPayload = {
        name: lessonsControl.at(lessonIndex).get('items')?.value,
      };

      this._testService.editSubSet(this.testId, lessonId, updatedLessonPayload).subscribe((res : any) => {
        if(res.status == true){
          this._messageService.add({ severity: 'success', detail: 'Sub Set Saved Successfully! ' });
          this.getSubjectAndChapter();
        }
      })

    } else {

      const body = {
        "superset_id": subjectId,
        "name": lessonsControl.value[lessonIndex].items
      }

      this._testService.addSubSet(this.testId, body).subscribe((res: any) => {
        if (res.status === "Success") {

          this.getSubjectAndChapter();
          this._messageService.add({ severity: 'success', detail: res.message });
        }else{
        this._messageService.add({ severity: 'error', detail: res.message });
        }
      });
    }

  }

  publishLesson(data: any) {
    const lessionId = data.value.id
    const payload = {
      "id": lessionId,
      "is_published": true
    }

    this._courseService.publishLesson(this.courseId, payload).subscribe((res: any) => {
      if (res.status === true) {
        this.getSubjectAndChapter();
        this._messageService.add({ severity: 'success', detail: 'Lesson Published Successfully!' });
      }
    })
  }
  unpublishLesson(data: any) {

    const lessionId = data.value.id
    const payload = {
      "id": lessionId,
      "is_published": false
    }

    this._courseService.publishLesson(this.courseId, payload).subscribe((res: any) => {
      if (res.status === true) {
        this.getSubjectAndChapter();
        this._messageService.add({ severity: 'success', detail: 'Lesson Published Successfully!' });
      }
    })

  }



  toggleDropdown(itemId: any) {
    this.openDropdownId = this.openDropdownId === itemId ? null : itemId;
  }

  toggleDropdownLesson(itemId: any) {
    this.openDropdownIdLession = this.openDropdownIdLession === itemId ? null : itemId;
  }


}
