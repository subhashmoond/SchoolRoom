import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CreateTestSectionComponent } from '../../../../../shared/components/create-test-section/create-test-section.component';
import { CreateTestComponent } from '../../../../../shared/components/create-test/create-test.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../../../../../core/services/test.service';
import { TestSettingComponent } from '../../../../../shared/components/test-setting/test-setting.component';
import { TestSericeReportComponent } from '../../test-serice-report/test-serice-report.component';

@Component({
  selector: 'app-test-list',
  standalone: true,
  imports: [CommonModule, AccordionModule, ButtonModule, ConfirmDialogModule, TableModule, CreateTestSectionComponent, SidebarModule, DialogModule, ToastModule, CreateTestComponent, TestSettingComponent, TestSericeReportComponent ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './test-list.component.html',
  styleUrl: './test-list.component.css'
})
export class TestListComponent {

  isCreateTest: boolean = false;
  isCreateSection: boolean = false;
  moduleName = 'testseries';
  subSetId: any;
  testListData: any
  testDataForSectionCreate: any;
  editSectionData : any;
  isTestSetting : boolean = false;
  isReportView : boolean = false
  testIdForSetting : any

  constructor(private route: ActivatedRoute, private _messageService: MessageService, private _testService: TestService, private _router: Router, private _confirmationService: ConfirmationService) {
    this.route.paramMap.subscribe(params => {
      this.subSetId = params.get('id');
    });
  }

  ngOnInit() {
    this.getTestList();
  }

  getTestList() {
    this._testService.getTestList(this.subSetId).subscribe(res => {
      this.testListData = res.data
    })
  }

  createTest() {
    this.isCreateTest = true
  }

  createSection(testData: any) {

    this.isCreateSection = true;

    this.testDataForSectionCreate = {
      "id": testData.id,
      "isDuration": testData.section_time_wise
    };

  }

  closeSideBar(event: any){
    this.isCreateTest = false;
    this._messageService.add({ severity: 'success', detail: 'Test created successfully!' });
    this.getTestList();
  }

  closepopupSection(event: any){
    this.isCreateSection = false;
    this._messageService.add({ severity: 'success', detail: event });
    this.getTestList();
    this.editSectionData = []
  }


  sectionListPage(sectionId: any, testId : any) {
    this._router.navigate(['/test/sectionDetail', sectionId], { queryParams: { testId: testId } })
  }


  editSection(sectionData: any) {
    this.isCreateSection = true;
    this.editSectionData = sectionData
  }

  deleteSection(sectionId: any) {

    this._confirmationService.confirm({
      header: '',
      message: 'Are you sure. You want to delete section ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Yes",
      acceptIcon: "none",
      rejectLabel: "No",
      rejectIcon: "none",
      accept: () => {

        this._testService.deleteTestSeriesSection(sectionId).subscribe((res : any) => {
          if(res.status === true){
            this._messageService.add({ severity: 'success', detail: 'Section deleted successfully!' });
            this.getTestList();
          }
        })
        
      },
      reject: () => {

      }

    });

    

  }


  deleteTest(testId : any){

    this._confirmationService.confirm({
      header: '',
      message: 'Are you sure. You want to delete test ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Yes",
      acceptIcon: "none",
      rejectLabel: "No",
      rejectIcon: "none",
      accept: () => {

        this._testService.deleteTestTestSeries(testId).subscribe((res : any) => {
          if(res.status === true){
            this._messageService.add({ severity: 'success', detail: 'Test deleted successfully!' });
            this.getTestList();
          }
        })
        
      },
      reject: () => {

      }

    });

    

  }

  testSeting(testId : any){
    this.isTestSetting = true;
    this.testIdForSetting = testId
  }

  closeSettingSideBar(){
    this.isTestSetting = false;
    this._messageService.add({ severity: 'success', detail: 'Setting saved successfully!' });
    this.getTestList();
  }


  reportView(testId : any){
    this.isReportView = true;
    // this._router.navigate([test-report/])
    this._router.navigate(['/test/test-report', testId])

  }

}
