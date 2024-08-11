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
  courseId: any;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _router : Router, private _courseService: CoursesService) {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id')!;
    });
  }

  ngOnInit() {
    this.addForm = this.fb.group({
      courses: this.fb.array([])
    });

    // Optionally add initial items for debugging
    this.addCourse();
    this.getCoursesList();
    this.getSubjectAndChapter();
  }

  getCoursesList() {
    this._courseService.getCourseDetailById(this.courseId).subscribe(res => {
    })
  }

  getSubjectAndChapter(){
    this._courseService.getCourseChapterAndSubject(this.courseId).subscribe(res => {
      console.log(res)
      this.setCourses(res)
    })
  }

  setCourses(data : any) {
    const courseArray = data.course.lectures_section.map((course:any) => this.fb.group({
      items: [course.name],
      lessons: this.fb.array(course.lectures_lession.map((lesson : any) => this.fb.group({
        items: [lesson.name, Validators.required],
        id: [lesson.id]
      })))
    }));
    
    this.addForm.setControl('courses', this.fb.array(courseArray));
  }

  lessonDetail(lessonId : any){
    this._courseService.setCourseID(this.courseId)
    this._router.navigate(['/course/lesson', lessonId]);

  }

 

  get courses(): FormArray {
    return this.addForm.get('courses') as FormArray;
  }

  lessons(index: number): FormArray {
    return this.courses.at(index).get('lessons') as FormArray;
  }

  addCourse(): void {
    this.courses.push(this.fb.group({
      items: ['', Validators.required],
      lessons: this.fb.array([])
    }));
    this.isSavedCourses.push(false);
  }

  addLesson(courseIndex: number): void {
    this.lessons(courseIndex).push(this.fb.group({
      items: ['', Validators.required]
    }));
  }

  saveCourse(index: number): void {
    this.isSavedCourses[index] = true;

    const course = this.courses.at(index);
    const subjectPayload = {
      name: course.get('items')?.value,
      course_id : this.courseId
    };

    this._courseService.addSubject(this.courseId, subjectPayload).subscribe(res => {
      console.log('Course saved successfully', res);
    }, error => {
      console.error('Error saving course', error);
    });
  }


  saveLesson(courseIndex: number, lessonIndex: number): void {
    const lessonsControl = this.lessons(courseIndex);
    lessonsControl.at(lessonIndex).markAsDirty();
    lessonsControl.at(lessonIndex).updateValueAndValidity();

    console.log(lessonsControl, "New Details Course Id")
  }
}
