import { CUSTOM_ELEMENTS_SCHEMA, Component, Renderer2 } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { BingMapsService } from '../../../../shared/services/bing-maps.service';
import { LoginFormComponent } from '../../../login/login-form/login-form.component';


export interface CarouselOptions {
  loop: boolean;
  mouseDrag: boolean;
  touchDrag: boolean;
  dots: boolean;
  navSpeed: number;
  navText: string[];
}


@Component({
  selector: 'app-login-main',
  standalone: true,
  imports: [TranslateModule, CardModule, LoginFormComponent, CarouselModule, CommonModule],
  templateUrl: './login-main.component.html',
  styleUrl: './login-main.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginMainStudentComponent {
  currentDate!: Date;
  latitude: number | null = null;
  longitude: number | null = null;
  errorMessage: string | null = null;
  locationName!: string;

  responsiveOptions: any[] | undefined;

  images = [
    { 'img': "../../../../../assets/images/slider1.jpg" },
    { 'img': "../../../../../assets/images/slider2.jpg" },
  ]


  constructor(private renderer: Renderer2, private _bingMapsService: BingMapsService, private translate: TranslateService) {
    translate.setDefaultLang('en-US');
    this.currentDate = new Date();
  }


  ngOnInit() {
    this.locationAllow();
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  locationAllow() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.bingMaps(this.latitude, this.longitude);
          const userCurrentLocation = { "lat": this.latitude, "lng": this.longitude };
          localStorage.setItem('currentCoord', JSON.stringify(userCurrentLocation));
        }
      );



    } else {
      this.errorMessage = 'Geolocation is not supported by this browser.';
    }
  }

  bingMaps(lat: any, long: any) {
    this._bingMapsService.getLocationName(lat, long).subscribe((res: any) => {
      this.locationName = res.addresses[0].address.localName;
    }, (error) => {
      console.error('Error fetching location name:', error);
    });
  }




}
