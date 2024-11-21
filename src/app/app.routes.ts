import { Routes } from '@angular/router';
import { LoginMainComponent } from './view/login/login-main/login-main.component';
import { DashbordComponent } from './view/dashbord/dashbord.component';
import { authGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginMainStudentComponent } from './view/student/login/login-main/login-main.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginMainComponent},
    {path : 'studentlogin', component : LoginMainStudentComponent},
    {
        path: '', component: LayoutComponent, children: [
            {
                path: 'dashborad', loadChildren: () => import('./view/dashbord/dashborad-router').then((m) => m.routes),
            },
            {
                path: 'user', loadChildren: () => import('./view/user/user.router').then((m) => m.routes),
            },
            {
                path: 'course', loadChildren: () => import('./view/courses/courses.router').then((m) => m.routes),
            },
            {
                path: 'test', loadChildren: () => import('./view/test/test.router').then((m) => m.routes),
            }
        ],
        canActivate: [authGuard]
    }

];

