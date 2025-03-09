import { Injectable } from '@angular/core';
import { Menus } from '../../core/interfaces/menu';

@Injectable({
  providedIn: 'root'
})

export class NavService {

  constructor() { }

  MENUITEMS: Menus[] = [
    { path: 'dashborad', title: 'Dashborad', icon: 'assets/images/home.png', type: 'link', active: true, permission: 'courseModule' },
    { path: 'analytics', title: 'Analytics', icon: 'assets/images/report.png', type: 'link', active: true, permission: 'analyticsModule' },

    {
      title: "Products", icon: 'assets/images/product.png', type: 'sub', active: true, permission : 'productModule',
      children: [
        { path: 'course', title: 'Courses', type: 'link', permission: 'courseModule' },
        { path: 'test', title: 'Test Series', type: 'link', permission: 'testPortalModule' },
        { path: 'digital-product', title: 'Digital Product', type: 'link', permission: 'digitalProductModule' },  // Fixed
        { path: 'exam-category', title: 'Category', type: 'link', permission: 'productModule' },
        { path: 'question-bank', title: 'Question Bank', type: 'link', permission: 'testPortalModule' }
      ]
    },

    { path: 'templatepreview', title: 'Website', icon: 'assets/images/web.png', type: 'link', active: true, permission: 'websiteModule' },
    { path: 'app', title: 'Your App', icon: 'assets/images/app.png', type: 'link', active: true, permission: 'appModule' },

    {
      path: 'sales', title: "Marketing", icon: 'assets/images/discount.png', type: 'sub', active: true, permission : 'marketingSuiteModule',
      children: [
        { path: 'marketing/messenger', title: 'Messenger', type: 'link', permission: 'marketingSuiteModule' },
        { path: 'marketing/coupons', title: 'Coupons', type: 'link', permission: 'couponModule' },
        { path: 'marketing/referral', title: 'Referral Code', type: 'link', permission: 'marketingSuiteModule' }, // Fixed
        { path: 'marketing/wallet', title: 'Wallet', type: 'link', permission: 'marketingSuiteModule' }
      ]
    },

    {
      path: 'user', title: "User", icon: 'assets/images/icon/Clients.svg', type: 'sub', active: true, permission : 'peopleModule',
      children: [
        { path: 'user/student', title: 'Students', type: 'link', permission: 'peopleModule' },
        { path: 'user/team', title: 'Team', type: 'link', permission: 'peopleModule' }
      ]
    },

    { path: 'integrations', title: 'Integrations', icon: 'assets/images/integration.png', type: 'link', active: true, permission: 'integrationsModule' },
    { path: 'community', title: 'Community', icon: 'assets/images/community.png', type: 'link', active: true, permission: 'communityModule' },
    { path: 'newsfeed', title: 'Newsfeed', icon: 'assets/images/news.png', type: 'link', active: true, permission: 'newsfeedModule' },
    { path: 'setting', title: 'Setting', icon: 'assets/images/settings.png', type: 'link', active: true, permission: 'settingModule' }
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