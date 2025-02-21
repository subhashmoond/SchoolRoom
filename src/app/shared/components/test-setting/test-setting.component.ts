import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TestService } from '../../../core/services/test.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-test-setting',
  standalone: true,
 imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CheckboxModule, CalendarModule, InputSwitchModule, InputGroupModule, InputGroupAddonModule, KeyFilterModule ],
   providers: [MessageService],
  templateUrl: './test-setting.component.html',
  styleUrl: './test-setting.component.css'
})
export class TestSettingComponent {

  @Input() testIdForSetting : any;
  @Output() closeSideBar = new EventEmitter<any>();

  testSettingForm! : FormGroup;
  testDetails : any

  constructor(private fb: FormBuilder, private _testService: TestService, private _messageService: MessageService) {
  }

  ngOnInit(){

    this.getTestDetail();

    this.testSettingForm = this.fb.group({
      title : [],
      reattempt : [],
      passsingmark : [],
      minsubmittime : [],
      publish : [],
      rankshow : [],
      leaderborad : [],
      sectionwisetime : [],
      instruction : [],
      totalTime : [],
      totalmarks : []
    })

  }

  getTestDetail(){

    this._testService.testDetailTestSeries(this.testIdForSetting).subscribe(res => {
      this.testDetails = res;


      this.testSettingForm.patchValue({
        title : this.testDetails.title,
        reattempt : this.testDetails.test_retake,
        passsingmark : this.testDetails.pass_marks,
        minsubmittime : this.testDetails.min_time,
        publish : this.testDetails.is_published,
        rankshow : this.testDetails.show_rank,
        sectionwisetime : this.testDetails.question_section_wise,
        instruction : this.testDetails.show_instructions,
        answershow : this.testDetails.ans_show,
        totalTime : this.testDetails.total_time,
        totalmarks : this.testDetails.totalMarks
      })
      // leaderborad : this.testDetails.,
    })
    
  }


  saveSetting(){

    const payload = {
      "title": this.testSettingForm.get('title')?.value,
      "totalTime": this.testSettingForm.get('totalTime')?.value, // in minutes
      "total_marks": this.testSettingForm.get('totalmarks')?.value,
    //   "test_start_time": "2024-08-15T10:00:00Z",
    //   "end_time": "2024-08-15T12:00:00Z",
      // "is_drip": this.testSettingForm.get('')?.value,
      "is_published": this.testSettingForm.get('publish')?.value,
      "passing_marks": this.testSettingForm.get('passsingmark')?.value,
      "show_instructions": this.testSettingForm.get('instruction')?.value,
      "show_rank": this.testSettingForm.get('rankshow')?.value,
      "min_time_for_submit": this.testSettingForm.get('minsubmittime')?.value, // in minutes
      "ans_show": this.testSettingForm.get('answershow')?.value,
      "testRepert": this.testSettingForm.get('reattempt')?.value,
      // "show_leaderboard": this.testSettingForm.get('')?.value,
      "section_time_wise": this.testSettingForm.get('sectionwisetime')?.value
    }

    console.log(payload, "seting payload log")

    this._testService.testSettingTestSeries(this.testIdForSetting, payload).subscribe((res : any) => {

      if(res.status === true){
        this.closeSideBar.emit(false)
      }

    })

  }

}
