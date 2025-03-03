import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { QuestionBankService } from '../../../core/services/question-bank.service';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-import-questions',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, CheckboxModule, ButtonModule],
  templateUrl: './import-questions.component.html',
  styleUrl: './import-questions.component.css'
})
export class ImportQuestionsComponent {

  @Input() testType : any;
  @Input() sectionId : any;
  @Input() testId : any;
  @Output() closepopup = new EventEmitter<any>();

  questionBankData: any;
  selectedQuestions: number[] = []; // Store selected question IDs
  isQuestionList: boolean = false;
  questionList: any;

  constructor(private _questionBankService: QuestionBankService) {
  }

  ngOnInit(){
    this.getAllQuestionBank();
  }

  getAllQuestionBank() {
    this._questionBankService.getAllQuestionBank().subscribe(res => {
      this.questionBankData = res.data
    })
  }

  questionBankList(bankId: any) {
    this.isQuestionList = true;

    this._questionBankService.getQuestionByBankID(bankId).subscribe(res => {
      this.questionList = res.questions
    })

  }


  toggleSelection(id: number, event: any) {
    if (event.checked) {
      this.selectedQuestions.push(id);
    } else {
      this.selectedQuestions = this.selectedQuestions.filter((qid: any) => qid !== id);
    }
  }

  importQuestion() {

    console.log(this.selectedQuestions, "New Desings In sad asdasd")

    const payload = {
      "test_id": this.testId,
      "section_id": this.sectionId,
      "question_ids": this.selectedQuestions
    }

    if(this.testType === "courseTest"){

      const payload = {
        "test_id": this.testId,
        "section_id": this.sectionId,
        "question_ids": this.selectedQuestions
    }

      this._questionBankService.importQuestionCourseTest(payload).subscribe(res => {
        this.closepopup.emit(res)
      })

    }else{

      const payload = {
        "test_id": this.testId,
        "section_id": this.sectionId,
        "question_ids": this.selectedQuestions
      }


      this._questionBankService.importQuestions(payload).subscribe(res => {
        this.closepopup.emit(res)
      })
    }
    

  }

}
