import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { TestService } from '../../../core/services/test.service';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-create-test',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule, CheckboxModule, CalendarModule, InputGroupModule, InputGroupAddonModule, KeyFilterModule, DropdownModule],
  providers: [MessageService],
  templateUrl: './create-test.component.html',
  styleUrl: './create-test.component.css'
})
export class CreateTestComponent {

  @Input() lessonId: any;
  @Input() contentTypes: any;
  @Input() contentId: any;
  @Input() moduleName: any;
  @Input() subSetId: any;

  @Output() closeSideBar = new EventEmitter<any>();

  addTestForm!: FormGroup;
  langList: any;
  filteredLangList: any; // Clone the list for filtering

  constructor(private fb: FormBuilder, private _testService: TestService, private _messageService: MessageService) {

  }

  ngOnInit() {

    this.addTestForm = this.fb.group({
      title: ['', Validators.required],
      totaltime: ['', Validators.required],
      maxmark: ['', Validators.required],
      defaultlang: ["English", Validators.required],
      supportanotherlang: [false],
      another_lang: ['']
    });

    this.getLang();
  }

  onLanguageChange(){
    this.updateAnotherLangOptions(this.addTestForm.get('defaultlang')?.value)
  }

  /** Filter Another Language Dropdown */
  updateAnotherLangOptions(selectedLang: string) {
    
    this.filteredLangList = this.langList.filter((lang: any) => lang.name !== selectedLang);

    // Reset another_lang if it was previously selected as defaultlang
    if (this.addTestForm.get('another_lang')?.value === selectedLang) {
      this.addTestForm.patchValue({ another_lang: '' });
    }
  }

  getLang() {
    this._testService.getLangList().subscribe(res => {
      this.langList = res.languages;
      this.filteredLangList = [...this.langList];
      this.updateAnotherLangOptions(this.addTestForm.get('defaultlang')?.value)
    })
  }

  submit() {



    if (this.moduleName === "testseries") {

      const payload = {
        // "set_id": this.subSetId,
        // "title": this.addTestForm.get('title')?.value,
        // "totalTime": totalMinutes,
        // "totalMarks": this.addTestForm.get('maxmark')?.value,
        // "support_another_lang": this.addTestForm.get('supportanotherlang')?.value,
        // "another_lang": this.addTestForm.get('another_lang')?.value,
        // "lang": "English",
        // "types": "Test"


        "set_id": this.subSetId,
        "title": this.addTestForm.get('title')?.value,
        "totalTime": this.addTestForm.get('totaltime')?.value,
        "totalMarks": this.addTestForm.get('maxmark')?.value,
        "support_another_lang": this.addTestForm.get('supportanotherlang')?.value,
        "another_lang": this.addTestForm.get('another_lang')?.value,
        "lang": this.addTestForm.get('defaultlang')?.value,
        "types": "Test"

      }

      this._testService.createTest(payload).subscribe((res: any) => {

        if (res.status === true) {
          this.closeSideBar.emit(false)
        } else {
          this._messageService.add({ severity: 'error', detail: 'Error ' });
        }

      })

    } else {

      const payload = {
        "lesson_id": this.lessonId,
        "title": this.addTestForm.get('title')?.value,
        "totalTime": this.addTestForm.get('totaltime')?.value,
        "totalMarks": this.addTestForm.get('maxmark')?.value,
        "support_another_lang": this.addTestForm.get('supportanotherlang')?.value,
        "another_lang": this.addTestForm.get('another_lang')?.value,
        "lang": this.addTestForm.get('defaultlang')?.value,
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

}
