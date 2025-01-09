import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TestService } from '../../../core/services/test.service';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CheckboxModule, CalendarModule],
  providers: [MessageService],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css'
})
export class CreateTestComponent {

  @Input() lessonId: any;
  @Input() contentTypes: any;
  @Input() contentId: any;

  @Output() closeSideBar = new EventEmitter<any>();

  addTestForm!: FormGroup

  constructor(private fb: FormBuilder, private _testService: TestService, private _messageService: MessageService) {

  }

  ngOnInit() {

    this.addTestForm = this.fb.group({
      title: [''],
      totaltime: [''],
      maxmark: [''],
      supportanotherlang: [false],
      another_lang: ['']
    });

  }

  submit() {

    const totalTime = this.addTestForm.get('totaltime')?.value;

    let timeParts = totalTime.split(":");  // Split into hours and minutes
    let hours = parseInt(timeParts[0]);  // Convert the hours part to number
    let minutes = parseInt(timeParts[1]);  // Convert the minutes part to number

    let totalMinutes = hours * 60 + minutes;

    const payload = {
      "lesson_id": this.lessonId,
      "title": this.addTestForm.get('title')?.value,
      "totalTime": totalMinutes,
      "totalMarks": this.addTestForm.get('maxmark')?.value,
      "support_another_lang": this.addTestForm.get('supportanotherlang')?.value,
      "another_lang": this.addTestForm.get('another_lang')?.value,
      "lang": "Hindi",
      "type": "Quiz"
    }

    this._testService.addTest(payload).subscribe((res: any) => {

      if (res.status === true) {
        this.closeSideBar.emit(false)
      } else {
        this._messageService.add({ severity: 'error', detail: 'Error ' });
      }

    })


  }

}
