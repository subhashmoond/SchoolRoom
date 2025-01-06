import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ToastModule } from 'primeng/toast';
import { TestService } from '../../../core/services/test.service';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';

@Component({
  selector: 'app-create-questions',
  standalone: true,
  imports: [ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, ToastModule, CheckboxModule, KeyFilterModule, DropdownModule, EditorModule],
  providers: [MessageService],
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.css'
})
export class CreateQuestionsComponent {
  @Input() sectionIdForQuestion: any;
  @Input() questionId: any;
  @Output() closepopup = new EventEmitter<any>();

  addQuestionForm!: FormGroup;
  questionTypes: any

  constructor(private _fb: FormBuilder, private _testService: TestService, private _messageService: MessageService) { }

  ngOnInit() {

    if (this.questionId) {
      this.getQuestionDetais();
    }

    this.getQuestionTypes()

    this.addQuestionForm = this._fb.group({
      selecttitle: [],
      subject: [],
      chapter: [],
      text: [],
      options: this._fb.array([]),
      explanation: []
    })

    this.addOption();
    this.addOption();
    this.addOption();
    this.addOption();

  }


  getQuestionDetais() {
    this._testService.getQuestionDetail(this.questionId).subscribe((res: any) => {
      debugger
      this.populateForm(res);
    })
  }

  populateForm(data: any) {
    // Patch simple form controls
    this.addQuestionForm.patchValue({
      selecttitle: data.type,
      subject: data.subject,
      chapter: data.topic,
      text: data.question_text,
      explanation: data.explanation
    });

    // Get the FormArray for options
    const optionsFormArray = this.addQuestionForm.get('options') as FormArray;

    // Clear existing FormArray controls
    optionsFormArray.clear();

    // Add options to the FormArray
    data.options.forEach((option: { content: string; isCorrect: boolean }) => {
      optionsFormArray.push(this._fb.group({
        text: [option.content],
        isCorrect: [option.isCorrect]
      }));
    });
    
  }


  get options(): FormArray {
    return this.addQuestionForm.get('options') as FormArray;
  }

  addOption() {
    const optionGroup = this._fb.group({
      text: ['', Validators.required], // Option text input
      isCorrect: [false], // Checkbox for correct option
    });
    this.options.push(optionGroup);
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  getQuestionTypes() {
    this._testService.getQuestionType().subscribe(res => {
      this.questionTypes = res
    })
  }

  submit() {


    const formValue = this.addQuestionForm.value; // Get form values

    const payload = {
      section_id: this.sectionIdForQuestion,
      question_type: formValue.selecttitle,
      text: formValue.text,
      subject: formValue.subject,
      chapter: formValue.chapter,
      options: formValue.options.map((option: any, index: number) => ({
        id: index + 1,
        content: option.text,
      })),
      correct_option: formValue.options
        .map((option: any, index: number) => (option.isCorrect ? index + 1 : null))
        .filter((id: number | null) => id !== null),
      lang_text: formValue.explanation,
    };


    this._testService.addQuestions(payload).subscribe((res: any) => {

      if (res.stauts === true) {
        this.closepopup.emit(res.message)
      } else {
        this._messageService.add({ severity: 'error', detail: 'Error ' });
      }

    })

  }


}
