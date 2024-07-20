import { Component } from '@angular/core';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { BingMapsService } from '../services/bing-maps.service';
import { RouterModule } from '@angular/router';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, FooterComponent, HeaderComponent, ImageModule, RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  togglesidebar: any;

  constructor(public _sharedService:SharedService){}

  ngOnInit() {
  this._sharedService.toggleButtonValue$.subscribe(value => {
    this.togglesidebar = value;
  });
  }

}
