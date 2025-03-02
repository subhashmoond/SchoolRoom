import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { QuestionBankService } from '../../../core/services/question-bank.service';
import { MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-add-question-bank',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule],
  providers: [MessageService],

  templateUrl: './add-question-bank.component.html',
  styleUrl: './add-question-bank.component.css'
})
export class AddQuestionBankComponent {

  @Output() closeSideBars = new EventEmitter<any>();
  @Input() editQestionBank: any;
  createQuestionBankForm!: FormGroup;
  isLoader: boolean = true;

  constructor(private _fb: FormBuilder, private _questionBankService: QuestionBankService, private _messageService: MessageService) { }

  ngOnInit() {

    this.createQuestionBankForm = this._fb.group({
      name: ['', Validators.required]
    })

    if (this.editQestionBank) {

      this.createQuestionBankForm.patchValue({
        name: this.editQestionBank.name
      })

    }

  }


  submit() {
    
    this.isLoader = true

    if (this.editQestionBank) {

      const payload = {
        "name": this.createQuestionBankForm.get('name')?.value
      }

      this._questionBankService.editQuestionBank(this.editQestionBank.id, payload).subscribe((res: any) => {
        if (res.status === true) {
          this.closeSideBars.emit(false)
        }
        this.isLoader = false
      })

    } else {

      const payload = {
        "name": this.createQuestionBankForm.get('name')?.value
      }

      this._questionBankService.addQuestionBank(payload).subscribe((res: any) => {
        if (res.status === "Success") {
          this.closeSideBars.emit(false)
        }

        this.isLoader = false;

      })
    }

  }


  closeSideBar() {

  }


}
