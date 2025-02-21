import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { QuestionBankService } from '../../../core/services/question-bank.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-question-bank',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule ],
  providers: [MessageService],

  templateUrl: './add-question-bank.component.html',
  styleUrl: './add-question-bank.component.css'
})
export class AddQuestionBankComponent {

  @Output() closeSideBars = new EventEmitter<any>();

  createQuestionBankForm!: FormGroup;

  constructor(private _fb: FormBuilder, private _questionBankService : QuestionBankService, private _messageService: MessageService ) { }

  ngOnInit() {

    this.createQuestionBankForm = this._fb.group({
      name: ['', Validators.required]
    })

  }


  submit() {
    const payload = {
      "name": this.createQuestionBankForm.get('name')?.value
    }

    this._questionBankService.addQuestionBank(payload).subscribe((res : any) => {
      if(res.status === "Success"){
        this.closeSideBars.emit(false)
      }
    })

  }

  closeSideBar() {

  }

}
