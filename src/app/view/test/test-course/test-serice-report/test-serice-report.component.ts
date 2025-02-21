import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { TestService } from '../../../../core/services/test.service';
import { RippleModule } from 'primeng/ripple';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-test-serice-report',
  standalone: true,
  imports: [TableModule, ToastModule, ButtonModule, CommonModule, RippleModule, SidebarModule, AvatarModule ],
  providers: [ MessageService ],
  templateUrl: './test-serice-report.component.html',
  styleUrl: './test-serice-report.component.css'
})
export class TestSericeReportComponent {

  
  testId: any;
  reportDetail: any;
  isStudentFullReport : boolean = false;
  studentFullReport : any

  

  constructor(private messageService: MessageService, private route: ActivatedRoute, private _testService: TestService) {
    this.route.paramMap.subscribe(params => {
      this.testId = params.get('id')!;
    });
  }

  ngOnInit() {

    this.getTestReport();

  

  }

  getTestReport() {
    this._testService.getTestReportData(this.testId).subscribe(res => {
      this.reportDetail = res.studentList
    })
  }


  studentSideBar(reportDetail : any){
    this.isStudentFullReport = true;
    this.studentFullReport = reportDetail

    console.log(this.studentFullReport, "student report")
  }

}
