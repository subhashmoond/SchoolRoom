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

  @Input() moduleName : any;


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
      explanation: [],
      answer : []
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

    let payload : any = {
      section_id: this.sectionIdForQuestion,
      question_type: formValue.selecttitle,
      text: formValue.text,
      subject: formValue.subject,
      chapter: formValue.chapter,
      
    };

    if(formValue.selecttitle === "da3c7e928ea749dfa675a6c8dccb62ab" || formValue.selecttitle === "7d192728b70a45d4917bfcf135054fb3"){

      payload.options = formValue.options.map((option: any, index: number) => ({
        id: index + 1,
        content: option.text,
      })),
      payload.correct_option = formValue.options
        .map((option: any, index: number) => (option.isCorrect ? index + 1 : null))
        .filter((id: number | null) => id !== null),

        payload.lang_text = formValue.explanation

    }

    if(formValue.selecttitle === "5e21c4de68e441af9ba9fe447838d3d0" || formValue.selecttitle === "be73610bb75047a4b56dcb062b7a5a7a"){
      payload.ans = formValue.answer
    }


    if(this.moduleName === 'testseries'){

      this._testService.createQestionTestSerice(payload).subscribe((res: any) => {

        if (res.stauts === true) {
          this.closepopup.emit(res.message)
        } else {
          this._messageService.add({ severity: 'error', detail: 'Error ' });
        }
  
      })

    }else{

      this._testService.addQuestions(payload).subscribe((res: any) => {

        if (res.stauts === true) {
          this.closepopup.emit(res.message)
        } else {
          this._messageService.add({ severity: 'error', detail: 'Error ' });
        }
  
      })

    }

  }


}
