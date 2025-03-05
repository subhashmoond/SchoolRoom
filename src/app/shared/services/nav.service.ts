import { Injectable } from '@angular/core';
import { Menus } from '../../core/interfaces/menu';

@Injectable({
  providedIn: 'root'
})

export class NavService {

  constructor() { }

  MENUITEMS: Menus[] = [
    { path: 'dashborad', title: 'Dashborad', icon: 'assets/images/home.png', type: 'link', active: true },
    { path: 'analytics', title: 'Analytics', icon: 'assets/images/report.png', type: 'link', active: true },

    {
      title: "Products", icon: 'assets/images/product.png', type: 'sub', active: true,
      children: [
        { path: 'course', title: 'Courses', type: 'link' },
        { path: 'test', title: 'Test Series', type: 'link' },
        { path: 'digital-product', title: 'Digi Product', type: 'link' },
        { path: 'exam-category', title: 'Category', type: 'link' },
        { path: 'question-bank', title: 'Question Bank', type: 'link' }
        // { path: '', title: 'Assignment', type: 'link' },
      ]
    },

    { path: 'templatepreview', title: 'Website', icon: 'assets/images/web.png', type: 'link', active: true },
    { path: 'app', title: 'Your App', icon: 'assets/images/app.png', type: 'link', active: true },

    {
      path: 'sales', title: "Marketing", icon: 'assets/images/discount.png', type: 'sub', active: true,
      children: [
        { path: 'marketing/messenger', title: 'Messenger', type: 'link' },
        { path: 'marketing/coupons', title: 'Coupons', type: 'link' },
        { path: 'marketing/referral', title: 'Referral Code', type: 'link' },
        { path: 'marketing/wallet', title: 'Wallet', type: 'link' }
      ]
    },

    {
      path: 'user', title: "User", icon: 'assets/images/icon/Clients.svg', type: 'sub', active: true,
      children: [
        { path: 'user/student', title: 'Students', type: 'link' },
        { path: 'user/team', title: 'Team', type: 'link' },
        { path: 'user/role', title: 'Roles', type: 'link' }
      ]
    },


    { path: 'integrations', title: 'Integrations', icon: 'assets/images/integration.png', type: 'link', active: true },

    { path: 'community', title: 'Community', icon: 'assets/images/community.png', type: 'link', active: true },
    { path: 'newsfeed', title: 'Newsfeed', icon: 'assets/images/news.png', type: 'link', active: true },
    { path: 'setting', title: 'Setting', icon: 'assets/images/settings.png', type: 'link', active: true }


  ];


  STUDENTMENU: Menus[] = [
    { path: 'studentapp/dashborad', title: 'Dashborad', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: true },
    { path: 'studentapp/course', title: 'Course', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: false },
    { path: 'studentapp/mycourse', title: 'My Course', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: false },

    { path: 'studentapp/community', title: 'Community', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: false },
    { path: 'studentapp/setting', title: 'Setting', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: false },

  ];


  // PROFILEMENUITEMS

  PROFILEMENUITEMS: ProfileMenu[] = [
    { path: 'logout', label: 'Log Out', icon: 'fa fa-sign-out', type: 'link', active: false },
    { path: 'setting', label: 'Setting', icon: 'fa fa-cog', type: 'link', active: false },
    { path: 'profile', label: 'Profile', icon: 'fa fa-user', type: 'link', active: false }
  ];

}

export interface ProfileMenu {
  path?: string;
  label?: string;
  icon?: string;
  type?: string;
  active?: boolean;
  children?: ProfileMenu[];
}