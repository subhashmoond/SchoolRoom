import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CoursesService } from '../../../../core/services/courses.service';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [CardModule, ButtonModule, MenuModule, ReactiveFormsModule, InputTextModule, SkeletonModule, ToastModule, DragDropModule],
  providers: [MessageService],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {
  addForm!: FormGroup;
  isSavedCourses: boolean[] = [];
  isEditLesson: boolean[][] = [];
  courseId: any;
  dragData: any;
  isLoader: boolean = true;
  openDropdownId: number | null = null;
  openDropdownIdLession: { [key: number]: number | null } = {};
  // openDropdownIdLession: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private _messageService: MessageService, private _router: Router, private _courseService: CoursesService) {
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



  drop(event: CdkDragDrop<FormArray>, courseIndex?: number) {
    if (courseIndex === undefined) {
      // Handling Course Drag & Drop
      const coursesFormArray = this.addForm.get('courses') as FormArray;

      if (coursesFormArray) {
        const course = coursesFormArray.at(event.previousIndex);
        coursesFormArray.removeAt(event.previousIndex);
        coursesFormArray.insert(event.currentIndex, course);

        // Get Course ID
        const courseId = course.get('id')?.value;

        // Call API to update course order
        this.updateCoursePosition(courseId, event.currentIndex);
      }
    } else {
      // Handling Lesson Drag & Drop inside a specific Course
      const courseFormArray = this.addForm.get('courses') as FormArray;
      const lessonsFormArray = courseFormArray.at(courseIndex).get('lessons') as FormArray;

      if (lessonsFormArray) {
        const lesson = lessonsFormArray.at(event.previousIndex);
        lessonsFormArray.removeAt(event.previousIndex);
        lessonsFormArray.insert(event.currentIndex, lesson);

        // Get Lesson ID
        const lessonId = lesson.get('id')?.value;

        // Call API to update lesson order
        this.updateLessonPosition(lessonId, event.currentIndex);
      }
    }
  }

  updateCoursePosition(courseId: string, newPosition: number) {
    const payload = {
      "course_id": this.courseId,
      "new_position": newPosition + 1,
      "subject_id": courseId
    };

    this._courseService.subjectPositionChange(payload).subscribe(res => {

    })

  }


  updateLessonPosition(chapterId: string, newPosition: number) {
    const payload = {
      "new_position": newPosition + 1,
      "chapter_id": chapterId,
    };

    this._courseService.lessionPositionChange(payload).subscribe(res => {
      this.getSubjectAndChapter();
    })


  }


  getCoursesList() {
    this._courseService.getCourseDetailById(this.courseId).subscribe(res => {
      // Handle the response
    });
  }

  getSubjectAndChapter() {
    this._courseService.getCourseChapterAndSubject(this.courseId).subscribe(res => {
      this.isLoader = false
      this.setCourses(res);
    });
  }

  setCourses(data: any) {
    // debugger;
    const courseArray = data.data.map((course: any, index: number) => {
      this.isSavedCourses[index] = false; // Initialize the isSavedCourses array
      this.isEditLesson[index] = []; // Initialize the isEditLesson array
  
      return this.fb.group({
        id: [course.subject_id], // Changed from course.id to subject_id
        items: [course.subject_name], // Changed from course.name to subject_name
        lessons: this.fb.array(course.lectures_lession.map((lesson: any, lessonIndex: number) => {
          this.isEditLesson[index][lessonIndex] = false; // Initialize each lesson's edit state
  
          return this.fb.group({
            id: [lesson.chapter_id], // Changed from lesson.id to chapter_id
            items: [lesson.chapter_name, Validators.required], // Changed from lesson.name to chapter_name
            isPublished: [lesson.isPublished] // Correctly map isPublished
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

    // this._courseService.deleteSubject(this.courseId, courseId).subscribe(() => {
    //   console.log('Course deleted successfully');
    //   this.getSubjectAndChapter(); // Refresh the data
    // }, error => {
    //   console.error('Error deleting course', error);
    // });
  }

  enableEditLesson(courseIndex: number, lessonIndex: number): void {
    this.isEditLesson[courseIndex][lessonIndex] = true; // Enable editing
  }

  deleteLesson(courseIndex: number, lessonIndex: number, subjectId: any): void {
    const lessonId = this.lessons(courseIndex).at(lessonIndex).get('id')?.value;

    console.log(lessonId, "and", subjectId)

    const payload = {
      "chapter_id": lessonId
    }

    this._courseService.deleteChapter(this.courseId, payload).subscribe((res) => {
      console.log(res, 'Lesson deleted Successfully!');
      this.getSubjectAndChapter(); // Refresh the data
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
        subject_id: course.get('id')?.value,
        name: course.get('items')?.value,
      };

      this._courseService.editSubject(editSubjectId, editCoursePayload).subscribe(res => {
        this._messageService.add({ severity: 'success', detail: 'Subject Edited.' });
        this.getSubjectAndChapter()
      })


    } else {

      const subjectPayload = {
        name: course.get('items')?.value,
        course_id: this.courseId
      };

      this._courseService.addSubject(this.courseId, subjectPayload).subscribe(res => {
        console.log('Course saved successfully', res);
        this.getSubjectAndChapter()
        this._messageService.add({ severity: 'success', detail: 'Subject Saved Successfully! ' });

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
        chapter_id: lessonsControl.at(lessonIndex).get('id')?.value,
        name: lessonsControl.at(lessonIndex).get('items')?.value,
      };

      this._courseService.editChapter(lessonId, updatedLessonPayload).subscribe(res => {
        this._messageService.add({ severity: 'success', detail: 'Edit Lesson Saved Successfully! ' });
        this.getSubjectAndChapter();
      })

    } else {

      const body = {
        "subject_id": subjectId,
        "name": lessonsControl.value[lessonIndex].items  // Update to use the correct lesson index
      }

      this._courseService.addChapter(body, this.courseId).subscribe(res => {
        this.getSubjectAndChapter();
        this._messageService.add({ severity: 'success', detail: 'Lesson Saved Successfully!' });
      }, error => {
        console.error('Error saving lesson', error);
        this._messageService.add({ severity: 'error', detail: error });

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

  toggleDropdownLesson(i: any, itemId: any) {
    this.openDropdownIdLession[i] = this.openDropdownIdLession[i] === itemId ? null : itemId;
  }


  // Drag and Drop Method 



}
