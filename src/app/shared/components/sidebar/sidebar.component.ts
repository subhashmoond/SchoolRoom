import { Component, Renderer2 } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { Menus } from '../../../core/interfaces/menu';
import { Router, RouterLink } from '@angular/router';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BingMapsService } from '../../services/bing-maps.service';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, PanelMenuModule, AvatarModule, ButtonModule,CommonModule,MenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  menuItems!: Menus[];
  profileMenuItems!:Menus[];
  isOpenSubmenus: { [key: string]: boolean } = {};
  userData: any;
  userName: any;
  isHoverRemoved: boolean = false;
  togglesidebar: any;
  profileToggle:boolean = false;
  activeMenuItem: any;
  activeSubMenu :any;

  constructor(private _nav: NavService,public _sharedService:SharedService, private renderer : Renderer2, private router : Router) {
    this.renderer.setStyle(document.body, 'overflow', 'unset');
  }

  ngOnInit() {
    this.menuItems = this._nav.MENUITEMS
    this.profileMenuItems = this._nav.PROFILEMENUITEMS
    this.userData = localStorage.getItem('userData')
    this.userName = JSON.parse(this.userData)
    this._sharedService.toggleButtonValue$.subscribe(value => {
      this.togglesidebar = value;
    });
  }

  toggleNavActive(item:any) {
    this.activeMenuItem = item;
    this.activeSubMenu = item;
  }

  toggleSubMenu(menuItem: any) {
    this.isOpenSubmenus[menuItem.title] = !this.isOpenSubmenus[menuItem.title];
    this.isHoverRemoved = !this.isHoverRemoved;
  }

  onMouseLeave(menuItem: any){
    this.isOpenSubmenus[menuItem.title] = false;
    if (this.activeSubMenu === menuItem) {
      this.activeSubMenu = null;
    }
  }

  onMouseEnter(menuItem: any){
    this.isOpenSubmenus[menuItem.title] = true
  }

  isSubMenuOpen(menuItem: any): boolean {
    return this.isOpenSubmenus[menuItem.title] || false;
  }

  onProfileMouseLeave(){
    this.profileToggle = false;
  }
  onProfileMouseEnter(){
    this.profileToggle = true;
  }

  profileAction(data : any){
    if(data.label === "Log Out"){
      localStorage.removeItem('userData');
      localStorage.setItem('isLoggedIn', JSON.stringify(false));
      this.router.navigate(['/login']);
    }
    
  }



}
