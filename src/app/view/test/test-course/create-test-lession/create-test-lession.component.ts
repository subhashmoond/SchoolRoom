import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-test-lession',
  standalone: true,
  imports: [SidebarModule, ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, ToastModule],
  providers : [MessageService],
  templateUrl: './create-test-lession.component.html',
  styleUrl: './create-test-lession.component.css'
})
export class CreateTestLessionComponent {
  addSection! : FormGroup
  
  constructor(private _fb : FormBuilder){}

  ngOnInit(){

    this.addSection = this._fb.group({
      title : ['', Validators.required]
    })

  }

  submit(){
  }

  closeButton(){
  }

  
}
