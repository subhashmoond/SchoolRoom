import { Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { CourseContentComponent } from './course-content/course-content.component';
import { ChapterContentComponent } from './course-content/chapter-content/chapter-content.component';

export const routes: Routes = [
    // { path: '', redirectTo: 'batche', pathMatch: 'full' },
    { path: '', component: CoursesComponent },
    {path : 'add', component : AddCoursesComponent},
    {path : 'content/:id', component : CourseContentComponent},
    {path : 'lesson/:id', component : ChapterContentComponent}
];

