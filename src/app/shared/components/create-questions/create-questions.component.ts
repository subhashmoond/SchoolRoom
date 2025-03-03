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
import { FieldsetModule } from 'primeng/fieldset';

@Component({
  selector: 'app-create-questions',
  standalone: true,
  imports: [ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, ToastModule, CheckboxModule, KeyFilterModule, DropdownModule, EditorModule, FieldsetModule],
  providers: [MessageService],
  templateUrl: './create-questions.component.html',
  styleUrl: './create-questions.component.css'
})
export class CreateQuestionsComponent {
  @Input() sectionIdForQuestion: any;
  @Input() questionId: any;
  @Input() questionIdForEdit: any;
  @Input() questionModuleType: any;
  @Input() questionBankId: any;
  @Input() testId: any;
  @Output() closepopup = new EventEmitter<any>();

  @Input() moduleName: any;

  addQuestionForm!: FormGroup;
  questionTypes: any;
  isOtherLang: boolean = true;
  testDetails : any;

  difficultyLavel = [
    { name: 'Esay' },
    { name: 'Medium' },
    { name: 'Hard' },
  ]

  constructor(private _fb: FormBuilder, private _testService: TestService, private _messageService: MessageService) {

  }

  ngOnInit() {

    if (this.questionId) {
      this.getQuestionDetais(this.questionId);
    }
    if (this.questionIdForEdit) {
      this.getQuestionDetais(this.questionIdForEdit);
    }

    this.getQuestionTypes()

    this.addQuestionForm = this._fb.group({
      selecttitle: [],
      subject: [],
      chapter: [],
      text: [],
      options: this._fb.array([]),
      explanation: [],
      otherlangexplanation: [],
      answer: [],
      difficulty: [],
      otherlangtext: [],
      marks: [2],
      nagativemarks: [1]
    })

    this.addOption();
    this.addOption();
    this.addOption();
    this.addOption();

    console.log(this.questionModuleType, "Question Type Module");
    this.getTestDetail();

  }

  getTestDetail(){

    if(this.questionModuleType === "course"){

      this._testService.getCourseTestDetail(this.testId).subscribe(res => {
        this.testDetails = res;
  
        if(this.testDetails.support_lang){
          this.isOtherLang = true
        }
      })

    }else{

      this._testService.testDetailTestSeries(this.testId).subscribe((res : any) => {
        this.testDetails = res;
  
        if(this.testDetails.support_lang){
          this.isOtherLang = true
        }
  
      })

    }


  }


  getQuestionDetais(questionId: any) {
    this._testService.getQuestionDetail(questionId).subscribe((res: any) => {
      this.populateForm(res);
    })
  }


  stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  populateForm(data: any) {

    console.log(data, "Edit Form Data's")

    // Patch simple form controls
    this.addQuestionForm.patchValue({
      selecttitle: data.type,
      difficulty: [],
      text: data.translations?.English?.text || '',
      explanation: data.explanation || '',
      otherlangexplanation: [],
      marks: data.posMarks,
      nagativemarks: data.negMarks,
      otherlangtext: data.translations?.Hindi?.text || '',
    });


    // Get the FormArray for options
    this.options.clear(); // Clear existing FormArray controls before populating new ones

    if (data.translations?.English?.options) {
      data.translations.English.options.forEach((option: any, index: number) => {

        this.options.push(this._fb.group({
          text: [this.stripHtml(option.value) || '', Validators.required],  // English Option Text (Stripped)
          otherLang: [this.stripHtml(data.translations?.Hindi?.options?.[index]?.value) || ''],  // Hindi Option Text (Matching Index)
          isCorrect: [data.ans === option.option_id] // Mark correct option
          // text: [option.value || '', Validators.required],  // English Option Text
          // otherLang: [data.translations?.Hindi?.options?.[index]?.value || ''],  // Hindi Option Text (Matching Index)
          // isCorrect: [data.ans === option.option_id] // Mark correct option
        }));
      });
    }


    console.log(this.addQuestionForm.value, "form value ser")

  }




  get options(): FormArray {
    return this.addQuestionForm.get('options') as FormArray;
  }

  addOption() {
    const optionGroup = this._fb.group({
      text: ['', Validators.required], // Option text input
      isCorrect: [false], // Checkbox for correct option
      otherLang: []
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
    console.log(formValue, "form data ")

    let payload: any = {
      
      "question_type": formValue.selecttitle,
      "text": formValue.text,
      "difficulty": formValue.difficulty,
      // "options" :[{"id":1,"content":"first option here"},{"id":2,"content":"second option"},{"id":3,"content":"thired option"},{"id":4,"content":"forth  option"}],
      // "correct_option":[2],
      // "ans":"here ssc gd here  code example ",
      "one_word_ans": "boss",
      "solution_text": formValue.explanation,

      "support_another_lang": true,
      "default_lang": "English",
      "another_lang": "Hindi",

      // "subject":"maths",
      // "topic":"jjjj",
      "marks": formValue.marks,
      "negativeMarks": formValue.nagativemarks,
      // "langData" :[{"id":1,"content":"alng_option first"},{"id":2,"content":"second option like lung here"},{"id":3,"content":"third option like lung here"},{"id":4,"content":"forth option like lung here"}],
      "lang_solution_text": formValue.otherlangexplanation,
      "lang_text": formValue.otherlangtext
    }

    
    if(this.questionModuleType === 'bank'){
      payload.questionBank = this.questionBankId
    }else{
      payload.section_id = this.sectionIdForQuestion
    }

    if (formValue.selecttitle === "scq" || formValue.selecttitle === "mcq") {

      payload.options = formValue.options.map((option: any, index: number) => ({
        id: index + 1,
        content: option.text,
      })),

        payload.langData = formValue.options.map((option: any, index: number) => ({
          id: index + 1,
          content: option.otherLang
        }))

      payload.langData = formValue.options.map((option: any, index: number) => ({
        id: index + 1,
        content: option.otherLang,
      })),

        payload.correct_option = formValue.options
          .map((option: any, index: number) => (option.isCorrect ? index + 1 : null))
          .filter((id: number | null) => id !== null),

        payload.lang_text = formValue.explanation

    }

    if (formValue.selecttitle === "fillblank" || formValue.selecttitle === "num") {
      payload.ans = formValue.answer
    }


    this._testService.createQestionTestSerice(payload).subscribe((res: any) => {
      debugger
      if (res.status) {
        this.closepopup.emit(res.message)
      } else {
        this._messageService.add({ severity: 'error', detail: 'Error ' });
      }

    })

  }


}
