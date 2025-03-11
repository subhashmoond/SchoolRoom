import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileUploadModule } from 'primeng/fileupload';
import { ToolbarModule } from 'primeng/toolbar';
import { SharedService } from '../../shared/services/shared.service';
import { SignupUserComponent } from './signup-user/signup-user.component';
import { ActiveUserComponent } from './active-user/active-user.component';
import { NewEnrollmentComponent } from './new-enrollment/new-enrollment.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RevenuComponent } from './revenu/revenu.component';
import { DigitalProductReportComponent } from './digital-product-report/digital-product-report.component';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [ FileUploadModule, CommonModule, ToolbarModule, SignupUserComponent, ActiveUserComponent, NewEnrollmentComponent, TransactionComponent, RevenuComponent, DigitalProductReportComponent ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent {

  currentActiveTab: any = 'signup-user';

  constructor(private _sharedService: SharedService) {}

  ngOnInit() {
    this._sharedService.settoggleButtonValue(false);
  }

  courseTabs(type: any) {
    this.currentActiveTab = type;
  }

}
