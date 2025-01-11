import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { TestService } from '../../../core/services/test.service';
import { KeyFilterModule } from 'primeng/keyfilter';

@Component({
  selector: 'app-create-test-section',
  standalone: true,
  imports: [SidebarModule, ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, ToastModule, CheckboxModule, KeyFilterModule],
  providers: [MessageService],
  templateUrl: './create-test-section.component.html',
  styleUrl: './create-test-section.component.css'
})
export class CreateTestSectionComponent {

  @Input() testDetailId: any;
  @Output() closepopup = new EventEmitter<any>();

  @Input() testDataForSectionCreate: any;
  @Input() moduleName: any;

  @Input() editSectionData: any;

  addSection!: FormGroup;
  isDurations : boolean = false;

  constructor(private _fb: FormBuilder, private _testService: TestService, private _messageService: MessageService) { }

  ngOnInit() {

    if(this.testDataForSectionCreate?.isDuration){
      this.isDurations = true
    }

    console.log(this.testDataForSectionCreate, "test detail")

    this.addSection = this._fb.group({
      title: ['', Validators.required],
      maxmark: [],
      sectionwise: [],
      duration: []
    });

    if (this.editSectionData) {

      this.addSection.patchValue({
        title: this.editSectionData.name,
        maxmark: this.editSectionData.max_marks
      })

      // if (this.editSectionData.duration !== null) {
      //   this.isDurations = true
      //   this.addSection.patchValue({
      //     duration: this.editSectionData.duration
      //   })
      // }

    }

  }


  submit() {

    const time = this.addSection.get('duration')?.value;



    if (this.editSectionData) {

      if (this.moduleName === "testseries") {

        const payload: any = {
          "name": this.addSection.get('title')?.value,
          "max_marks": this.addSection.get('maxmark')?.value,
          // "allowed_section_wise_time": this.addSection.get('sectionwise')?.value,
          // "duration": totalMinutes
        }

        if (this.testDataForSectionCreate.isDuration) {
          let timeParts = time.split(":");
          let thours = parseInt(timeParts[0]);
          let tminutes = parseInt(timeParts[1]);
          let ttotalMinutes = thours * 60 + tminutes;

          payload.duration = ttotalMinutes
        }

        this._testService.editTestSeriesSection(this.editSectionData.id, payload).subscribe((res : any) => {

          if (res.status === true) {
            this.closepopup.emit(res.message);
            this.isDurations = false
          } else {
            this._messageService.add({ severity: 'error', detail: 'Error ' });
          }

        })

      }
     } 
     else{


        if (this.moduleName === "testseries") {
          const payload: any = {
            "name": this.addSection.get('title')?.value,
            "max_marks": this.addSection.get('maxmark')?.value,
            // "allowed_section_wise_time": this.addSection.get('sectionwise')?.value,
            // "duration": totalMinutes
          }

          if (this.testDataForSectionCreate.isDuration) {
            let timeParts = time.split(":");
            let thours = parseInt(timeParts[0]);
            let tminutes = parseInt(timeParts[1]);
            let ttotalMinutes = thours * 60 + tminutes;

            payload.duration = ttotalMinutes
          }

          this._testService.createSection(this.testDataForSectionCreate?.id, payload).subscribe((res: any) => {

            if (res.status === true) {
              this.closepopup.emit(res.message)
              this.isDurations = false
            } else {
              this._messageService.add({ severity: 'error', detail: 'Error ' });
            }

          })

        } else {

          let timeParts = time.split(":");
          let hours = parseInt(timeParts[0]);
          let minutes = parseInt(timeParts[1]);
          let totalMinutes = hours * 60 + minutes;

          const payload = {
            "name": this.addSection.get('title')?.value,
            "max_marks": this.addSection.get('maxmark')?.value,
            "allowed_section_wise_time": this.addSection.get('sectionwise')?.value,
            "duration": totalMinutes
          }

          this._testService.addTestSection(this.testDetailId, payload).subscribe((res: any) => {

            if (res.status === true) {
              this.closepopup.emit(res.message)
              this.isDurations = false
            } else {
              this._messageService.add({ severity: 'error', detail: 'Error ' });
            }

          })

        }

      }


    }

    closeButton() {
    }


  }
