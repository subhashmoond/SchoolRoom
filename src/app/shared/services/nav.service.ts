import { Injectable } from '@angular/core';
import { Menus } from '../../core/interfaces/menu';

@Injectable({
  providedIn: 'root'
})

export class NavService {

  constructor() { }

  MENUITEMS: Menus[] = [
    { path: 'dashborad', title: 'Dashborad', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: true },
    {
      path: 'user', title: "User", icon: 'assets/images/icon/Clients.svg', type: 'sub', active: false,
      children: [
        { path: 'user/student', title: 'Students', type: 'link' },
        { path: 'user/team', title: 'Team', type: 'link' },
      ]
    },


    { title: "Products", icon: 'assets/images/icon/Clients.svg', type: 'sub', active: false,
      children: [
        { path: 'course', title: 'Courses', type: 'link' },
        { path: 'test', title: 'Test Series', type: 'link' },
        { path: 'test', title: 'Question Pool', type: 'link' },
        { path: 'test', title: 'Live Class', type: 'link' },
        { path: 'test', title: 'Assignment', type: 'link' },
      ]
    },

    {
      path: 'sales', title: "Sales", icon: 'assets/images/icon/Clients.svg', type: 'sub', active: false,
      children: [
        { path: 'user/student', title: 'Coupouns', type: 'link' },
        { path: 'user/team', title: 'Referral Code', type: 'link' },
      ]
    },

    { path: 'community', title: 'Community', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: true },
    { path: 'setting', title: 'Setting', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: true },


  ];



// PROFILEMENUITEMS

  PROFILEMENUITEMS: ProfileMenu[] = [
    { path: 'logout', label: 'Log Out', icon: 'fa fa-sign-out', type: 'link', active: false },
    {path: 'setting', label: 'Setting', icon: 'fa fa-cog', type: 'link', active: false },
    {path: 'profile', label: 'Profile', icon: 'fa fa-user', type: 'link', active: false }
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