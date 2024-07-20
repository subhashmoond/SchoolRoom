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
        { path: 'user/student', title: 'Students', icon: 'assets/images/icon/Clients.svg', type: 'link' },
        { path: 'user/team', title: 'Team', icon: 'assets/images/icon/Groups.svg', type: 'link' },
      ]
    },

    { path: 'course', title: 'Courses', icon: 'assets/images/icon/dashboard.svg', type: 'link', active: true },

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