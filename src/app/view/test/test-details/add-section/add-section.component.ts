import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-add-section',
  standalone: true,
  imports: [SidebarModule, ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, ToastModule],
  providers : [MessageService],
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.css'
})
export class AddSectionComponent {

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
