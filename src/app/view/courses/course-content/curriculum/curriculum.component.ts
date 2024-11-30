import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { CoursesService } from '../../../../core/services/courses.service';
import { MenuModule } from 'primeng/menu';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-curriculum',
  standalone: true,
  imports: [CardModule, ButtonModule, MenuModule, ReactiveFormsModule, InputTextModule, SkeletonModule ],
  templateUrl: './curriculum.component.html',
  styleUrl: './curriculum.component.css'
})
export class CurriculumComponent {
  addForm!: FormGroup;
  isSavedCourses: boolean[] = [];
  isEditLesson: boolean[][] = [];
  courseId: any;
  dragData : any;
  actionMenu : any;
  isLoader : boolean = true;
  openDropdownId: number | null = null;
  openDropdownIdLession: number | null = null;

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

    this.actionMenu = [
      {
          items: [
              {
                  label: 'Edit',
                  icon: 'pi pi-pencil'
              },
              {
                  label: 'Delete',
                  icon: 'pi pi-trash'
              }
          ]
      }
  ];
  }

  selectedMenu(event : any, data ? : any){
    console.log(event, "this is call after select dot menu", data)
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

  preview(){
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

  // enableEditLesson(courseIndex: number, lessonIndex: number): void {
  //   this.isEditLesson[courseIndex].fill(false); // Disable all lessons for the course
  //   this.isEditLesson[courseIndex][lessonIndex] = true; // Enable only the clicked lesson
  // }

  enableEditLesson(courseIndex: number, lessonIndex: number): void {
    this.isEditLesson[courseIndex][lessonIndex] = true; // Enable editing
  }

  deleteLesson(courseIndex: number, lessonIndex: number, subjectId: any): void {
    const lessonId = this.lessons(courseIndex).at(lessonIndex).get('id')?.value;

    console.log(lessonId, "and", subjectId)
  
    // this._courseService.deleteChapter(subjectId, lessonId).subscribe(() => {
    //   console.log('Lesson deleted successfully');
    //   this.getSubjectAndChapter(); // Refresh the data
    // }, error => {
    //   console.error('Error deleting lesson', error);
    // });
  }
  

  saveCourse(index: number): void {
    this.isSavedCourses[index] = false;
    const course = this.courses.at(index);

    // This Payload For Edit Course
    // const updatedCourse = {
    //   id: course.get('id')?.value,
    //   name: course.get('items')?.value,
    // };

    const subjectPayload = {
      name: course.get('items')?.value,
      course_id: this.courseId
    };

    this._courseService.addSubject(this.courseId, subjectPayload).subscribe(res => {
      console.log('Course saved successfully', res);
      this.getSubjectAndChapter()
    }, error => {
      console.error('Error saving course', error);
    });
  }

  saveLesson(courseIndex: number, lessonIndex: number, subjectId: any): void {
    this.isEditLesson[courseIndex][lessonIndex] = false;  // Close the input after saving
    const lessonsControl = this.lessons(courseIndex);
    lessonsControl.at(lessonIndex).markAsDirty();
    lessonsControl.at(lessonIndex).updateValueAndValidity();
 
    // Payload For Edit Lesson 
    // const updatedLesson = {
    //   id: lessonsControl.at(lessonIndex).get('id')?.value,
    //   name: lessonsControl.at(lessonIndex).get('items')?.value,
    // };

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

  

// onTaskDragStart(event : any){
// this.dragData = event.target.innerText
// }

// onTaskDragOver(event : any){
// event.preventDefault();
// }

// onTaskDrop(event : any){
// event.preventDefault();
// const targetTask = event.target;
// const textOfTragetTask = targetTask.innerText;
// const textOfSourceTask = this.dragData.innterText;

// targetTask.innerText = textOfSourceTask
// this.dragData.innerText = textOfTragetTask
// }

toggleDropdown(itemId: any) {
  this.openDropdownId = this.openDropdownId === itemId ? null : itemId;
}

toggleDropdownLesson(itemId : any){
  this.openDropdownIdLession = this.openDropdownIdLession === itemId ? null : itemId;
}


// Drag and Drop Method 
onTaskDragStart(event: DragEvent, index: number, type: 'course' | 'lesson', parentIndex?: number): void {
  // Store dragged item's data
  const dragData = { index, type, parentIndex };
  event.dataTransfer?.setData('text', JSON.stringify(dragData));
}

onTaskDragOver(event: DragEvent): void {
  event.preventDefault(); // Allows dropping
}

onTaskDrop(event: DragEvent): void {
  event.preventDefault();

  // Retrieve the dragged item's data
  const dragData = JSON.parse(event.dataTransfer?.getData('text') || '{}');
  const dropIndex = this.calculateDropIndex(event);

  if (dragData.type === 'course') {
    this.reorderCourses(dragData.index, dropIndex);
  } else if (dragData.type === 'lesson' && dragData.parentIndex !== undefined) {
    this.reorderLessons(dragData.parentIndex, dragData.index, dropIndex);
  }
}

// Helper to calculate drop index from event
calculateDropIndex(event: DragEvent): number {
  // Example implementation: Calculate based on the target element
  const target = event.target as HTMLElement;
  return Number(target.getAttribute('data-index')) || 0;
}

reorderCourses(dragIndex: number, dropIndex: number): void {
  if (dragIndex !== dropIndex) {
    const courses = this.addForm.get('courses') as FormArray;
    const draggedCourse = courses.at(dragIndex);
    courses.removeAt(dragIndex);
    courses.insert(dropIndex, draggedCourse);
  }
}

reorderLessons(courseIndex: number, dragIndex: number, dropIndex: number): void {
  if (dragIndex !== dropIndex) {
    const lessons = (this.courses.at(courseIndex).get('lessons') as FormArray);
    const draggedLesson = lessons.at(dragIndex);
    lessons.removeAt(dragIndex);
    lessons.insert(dropIndex, draggedLesson);
  }
}


}
