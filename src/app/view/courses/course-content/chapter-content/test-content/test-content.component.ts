import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TestService } from '../../../../../core/services/test.service';
import { CreateTestSectionComponent } from '../../../../../shared/components/create-test-section/create-test-section.component';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { CreateQuestionsComponent } from '../../../../../shared/components/create-questions/create-questions.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../../../../environments/environment';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ImportQuestionsComponent } from '../../../../../shared/components/import-questions/import-questions.component';

@Component({
  selector: 'app-test-content',
  standalone: true,
  imports: [CommonModule, AccordionModule, ButtonModule, ConfirmDialogModule, TableModule, CreateTestSectionComponent, SidebarModule, DialogModule, CreateQuestionsComponent, ToastModule, ImportQuestionsComponent ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './test-content.component.html',
  styleUrl: './test-content.component.css'
})
export class TestContentComponent {
  testId: any;
  questionsList: any;
  isCreateSection: boolean = false;
  isAddQuestion: boolean = false;
  isImportQuestion : boolean = false;
  testDetailsData: any;
  testDetailId: any
  sectionData: any
  sectionIdForQuestion: any;
  questionId: any;
  lessionId : any;
  courseId : any;
  testDataForSectionCreate : any;

  constructor( private _router : Router, private route : ActivatedRoute, private _testService: TestService, private _messageService: MessageService, private _confirmationService: ConfirmationService) { 
    this.route.paramMap.subscribe(params => {
      this.testId = params.get('id')!;
    });

    this.route.queryParams.subscribe(params => {
      this.lessionId = params['lessionId'];
      this.courseId = params['courseId'];
    });

  }

  ngOnInit() {
    this.getTestDetailPage();
    // this.getSectionContent();
  }

  backContentListPage(){
    this._router.navigate(['/course/lesson', this.lessionId], { queryParams: { courseId: this.courseId } });
  }

  getTestDetailPage() {
    this._testService.getTestDetails(this.testId).subscribe(res => {
      this.testDetailsData = res
      this.getSectionContent()
    })
  }

  getSectionContent() {
    this._testService.getTestSectionCOntent(this.testDetailsData.id).subscribe(res => {
      this.sectionData = res.data
    })
  }

  createSection(testData: any) {
    debugger
    this.testDetailId = testData.id
    this.isCreateSection = true
    this.testDataForSectionCreate = {
      "id": testData.id,
      "isDuration": testData.section_time_wise
    };
  }

  addQuestion(id: any) {
    this.sectionIdForQuestion = id
    this.isAddQuestion = true
  }

  importQuestions(data : any){
    this.isImportQuestion = true;
    this.sectionIdForQuestion = data.id
  }

  editQuestion(id: any) {
    this.isAddQuestion = true;
    this.questionId = id
  }

  closepopup(event: any) {
    this._messageService.add({ severity: 'success', detail: event });
    this.isCreateSection = false;
    this.isAddQuestion = false;
    this.getTestDetailPage();
  }

  deleteQuestion(id: any) {

    this._confirmationService.confirm({
      header: 'Delete Question ?',
      message: 'Are you sure you want to Delete this Question ?',
      icon: 'null',
      acceptButtonStyleClass: "danger-button text-base font-semibold",
      rejectButtonStyleClass: "danger-border text-base button-text-danger bg-white font-semibold",
      acceptLabel: "Delete",
      acceptIcon: "none",
      rejectLabel: "Cancel",
      rejectIcon: "none",
      accept: () => {

        const payload = {
          "question_id": id
        }

        this._testService.deleteQuestionDetail(payload).subscribe((res : any) => {

          if(res.status === true){
            this._messageService.add({ severity: 'success', detail: res.message });
            this.getTestDetailPage();

          }else{
            this._messageService.add({ severity: 'error', detail: res.message });
          }

        })
        // this._clientService.deleteClientDocuemnt(documentId, this.clientID).subscribe(res => {
        //       this.getDocuemntList();
        //     },error => {
        //       const errorMsg = error.error.errors[0].developerMessage
        //       this._messageService.add({ severity: 'error', detail: errorMsg });
        // })
      },
      reject: () => {

      }

    });

  }

  closeImportSideBar(event : any){
    this._messageService.add({ severity: 'success', detail: event.message });
    this.isImportQuestion = false;
    this.getTestDetailPage();
  }


}
