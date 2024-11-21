import { Routes } from '@angular/router';
import { LoginMainStudentComponent } from './login/login-main/login-main.component';
import { StudentDashboradComponent } from './student-dashborad/student-dashborad.component';
import { MyCourseComponent } from './my-course/my-course.component';
import { CourseComponent } from './course/course.component';
import { CommunityComponent } from './community/community.component';
import { SettingComponent } from './setting/setting.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashborad', pathMatch: 'full' },
    { path: 'dashborad', component: StudentDashboradComponent },
    { path: 'course', component: CourseComponent },
    { path: 'mycourse', component: MyCourseComponent },
    {path : 'community', component : CommunityComponent},
    {path : 'setting', component : SettingComponent},

];

