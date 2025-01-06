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
  imports: [SidebarModule, ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, ToastModule, CheckboxModule, KeyFilterModule ],
  providers: [MessageService],
  templateUrl: './create-test-section.component.html',
  styleUrl: './create-test-section.component.css'
})
export class CreateTestSectionComponent {

  @Input() testDetailId: any;
  @Output() closepopup = new EventEmitter<any>();

  addSection!: FormGroup

  constructor(private _fb: FormBuilder, private _testService: TestService, private _messageService: MessageService) { }

  ngOnInit() {

    this.addSection = this._fb.group({
      title: ['', Validators.required],
      maxmark: [],
      sectionwise: [],
      duration: []
    })

  }


  submit() {
    const payload = {
      "name": this.addSection.get('title')?.value,
      "max_marks": this.addSection.get('maxmark')?.value,
      "allowed_section_wise_time": this.addSection.get('sectionwise')?.value,
      "duration": this.addSection.get('duration')?.value
    }

    this._testService.addTestSection(this.testDetailId, payload).subscribe((res: any) => {

      if (res.status === true) {
      this.closepopup.emit(res.message)
      }else{
        this._messageService.add({ severity: 'error', detail: 'Error ' });
      }

    })

  }

  closeButton() {
  }


}
