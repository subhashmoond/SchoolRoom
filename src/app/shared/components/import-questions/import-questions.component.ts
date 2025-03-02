import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { QuestionBankService } from '../../../core/services/question-bank.service';

@Component({
  selector: 'app-import-questions',
  standalone: true,
  imports: [ CommonModule, FormsModule, TableModule ],
  templateUrl: './import-questions.component.html',
  styleUrl: './import-questions.component.css'
})
export class ImportQuestionsComponent {

  products: any;
  selectedProducts: any;

  constructor( private _questionBankService : QuestionBankService ){
  }

  ngOnInit(){
    this.getAllQuestion();
  }

  getAllQuestion(){
    this._questionBankService.getAllQuestionListForImport().subscribe(res => {
      this.products = res.data
    })
  }

}
