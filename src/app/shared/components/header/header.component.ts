import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { InputTextModule } from 'primeng/inputtext';
import { BingMapsService } from '../../services/bing-maps.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { NavService } from '../../services/nav.service';
import { Menus } from '../../../core/interfaces/menu';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AutoCompleteModule, ReactiveFormsModule, InputTextModule,CommonModule, AvatarModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  items: any[] | undefined;
  value!: string;

  selectedItem: any;

  suggestions : any[] | undefined;
  togglesidebar : any
  profileToggle : boolean = false;
  profileMenuItems! : Menus[];
  userData : any;
  userName : any

constructor(public _sharedService:SharedService, private router : Router, private _nav: NavService){
  this.userData = localStorage.getItem('userData')
  this.userName = JSON.parse(this.userData)
}

ngOnInit(): void {
  this._sharedService.toggleButtonValue$.subscribe(value => {
    this.togglesidebar = value;
  });

  this.profileMenuItems = this._nav.PROFILEMENUITEMS

}


  search(event: AutoCompleteCompleteEvent) {
  }
  openMenu(){
    this.togglesidebar = !this.togglesidebar
    this._sharedService.settoggleButtonValue(this.togglesidebar);
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
