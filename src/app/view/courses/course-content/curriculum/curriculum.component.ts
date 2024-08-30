import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CoursesService } from '../../../../core/services/courses.service';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [CardModule, ButtonModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {
  addForm!: FormGroup;
  isSavedCourses: boolean[] = [];
  isEditLesson: boolean[][] = [];
  courseId: any;
  dragData : any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _router: Router, private _courseService: CoursesService) {
    this.route.paramMap.subscribe(params => {
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
    this._courseService.getCourseChapterAndSubject(this.courseId).subscribe(res => {
      this.setCourses(res);
    });
  }

  setCourses(data: any) {
    const courseArray = data.course.lectures_section.map((course: any, index: number) => {
      this.isSavedCourses[index] = false;  // Initialize the isSavedCourses array
      this.isEditLesson[index] = [];       // Initialize the isEditLesson array

      return this.fb.group({
        id: [course.id],
        items: [course.name],
        lessons: this.fb.array(course.lectures_lession.map((lesson: any, lessonIndex: number) => {
          this.isEditLesson[index][lessonIndex] = false;  // Initialize each lesson's edit state
          return this.fb.group({
            id: [lesson.id],
            items: [lesson.name, Validators.required]
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
    this._router.navigate(['/course/lesson', lessonId], { queryParams: { courseId: this.courseId } });
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

  enableEditLesson(courseIndex: number, lessonIndex: number): void {
    this.isEditLesson[courseIndex].fill(false); // Disable all lessons for the course
    this.isEditLesson[courseIndex][lessonIndex] = true; // Enable only the clicked lesson
  }

  saveCourse(index: number): void {
    this.isSavedCourses[index] = false;
    const course = this.courses.at(index);
    const subjectPayload = {
      name: course.get('items')?.value,
      course_id: this.courseId
    };

    this._courseService.addSubject(this.courseId, subjectPayload).subscribe(res => {
      console.log('Course saved successfully', res);
    }, error => {
      console.error('Error saving course', error);
    });
  }

  saveLesson(courseIndex: number, lessonIndex: number, subjectId: any): void {
    this.isEditLesson[courseIndex][lessonIndex] = false;  // Close the input after saving
    const lessonsControl = this.lessons(courseIndex);
    lessonsControl.at(lessonIndex).markAsDirty();
    lessonsControl.at(lessonIndex).updateValueAndValidity();

    const body = {
      "subject_id": subjectId,
      "name": lessonsControl.value[lessonIndex].items  // Update to use the correct lesson index
    }

    this._courseService.addChapter(body, this.courseId).subscribe(res => {
      this.getSubjectAndChapter();
    }, error => {
      console.error('Error saving lesson', error);
    });
  }

  publishLesson(data: any) {
    const lessionId = data.value.id
    const payload = {
      "id": lessionId,
      "is_published": true
    }

    this._courseService.publishLesson(this.courseId, payload).subscribe(res => {
      console.log(res)
    })
  }

  

onTaskDragStart(event : any){
this.dragData = event.target.innerText
}

onTaskDragOver(event : any){
event.preventDefault();
}

onTaskDrop(event : any){
event.preventDefault();
const targetTask = event.target;
const textOfTragetTask = targetTask.innerText;
const textOfSourceTask = this.dragData.innterText;

targetTask.innerText = textOfSourceTask
this.dragData.innerText = textOfTragetTask


// const targetTask  = event.target
// targetTask.innerText = this.dragData
}

}
