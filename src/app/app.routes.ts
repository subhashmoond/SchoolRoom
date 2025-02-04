import { Routes } from '@angular/router';
import { LoginMainComponent } from './view/login/login-main/login-main.component';
import { DashbordComponent } from './view/dashbord/dashbord.component';
import { authGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';
import { PreviewCoursesComponent } from './view/courses/preview-courses/preview-courses.component';
import { JoinYoutubeLiveClassComponent } from './view/courses/course-content/chapter-content/live-class/join-youtube-live-class/join-youtube-live-class.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginMainComponent},
    {path : 'course/preview/:id', component : PreviewCoursesComponent},

    {path : 'join/youtubelive', component : JoinYoutubeLiveClassComponent},

    

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
            },
            {
                path : 'marketing', loadChildren : () => import('./view/coupons/coupons.router').then((m) => m.routes )
            },
            {
                path: 'templatepreview', loadChildren: () => import('./view/webpage/webpage.router').then((m) => m.routes)
            },
            {
                path : 'templatepreview', loadChildren : () => import('./view/webpage/webpage.router').then((m) => m.routes )
            },
            {
                path : 'newsfeed', loadChildren : () => import('./view/newsfeed/newsfeed.router').then((m) => m.routes )
            },
            {
                path : 'community', loadChildren : () => import('./view/community/community.router').then((m) => m.routes )
            },
            {
                path : 'digital-product', loadChildren : () => import('./view/digital-product/digitalproduct.router').then((m) => m.routes)
            },
            {
                path : 'exam-category', loadChildren : () => import('./view/exam-category/exam.router').then((m) => m.routes)
            },
            {
                path : 'app', loadChildren : () => import('./view/your-app/you-app.router').then((m) => m.routes)
            },
            {
                path : 'setting', loadChildren : () => import('./view/setting/setting.router').then((m) => m.routes)
            }
        ],
        canActivate: [authGuard]
    }

    
];

