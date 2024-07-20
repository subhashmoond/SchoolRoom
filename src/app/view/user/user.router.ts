import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { ViewStudentComponent } from './student/view-student/view-student.component';
import { TeamComponent } from './team/team.component';

export const routes: Routes = [
    { path: '', redirectTo: 'student', pathMatch: 'full' },
    { path: 'student', component: StudentComponent },
    { path: 'student-view', component: ViewStudentComponent },
    { path: 'team', component: TeamComponent }
];

