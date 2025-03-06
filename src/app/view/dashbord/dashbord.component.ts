import { Component } from '@angular/core';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { AnalyticsService } from '../../core/services/analytics.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [LayoutComponent, CommonModule, ButtonModule ],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {

  reportData: any
  constructor(private _analyticsService: AnalyticsService, private _router: Router) { }

  ngOnInit() {

    this._analyticsService.getDashboradAnalyticsData().subscribe(res => {
      this.reportData = res
    })

  }

  navigatePage(pageName: string) {
    switch (pageName) {
      case 'course':
        this._router.navigate(['/course']);
        break;
      case 'test':
        this._router.navigate(['/test']);
        break;
      case 'campaign':
        this._router.navigate(['/marketing/messenger']);
        break;
      case 'digital-product':
        this._router.navigate(['/digital-product']);
        break;


      case 'coupons':
        this._router.navigate(['/marketing/coupons']);
        break;

      case 'newsfeed':
        this._router.navigate(['/newsfeed']);
        break;


      case 'web-page':
        this._router.navigate(['/templatepreview']);
        break;


      case 'community':
        this._router.navigate(['/community']);
        break;

    }
  }


  liveOpen(data : any){
    
  }

}
