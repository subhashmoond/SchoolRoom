import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-add-batche',
  standalone: true,
  imports: [SidebarModule, ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, MultiSelectModule, PasswordModule, InputSwitchModule],
  templateUrl: './add-batche.component.html',
  styleUrl: './add-batche.component.css'
})
export class AddBatcheComponent {

  sideBar : boolean = true;
  addBatche!: FormGroup;

constructor(private _fb : FormBuilder, private _userService : UserService){}

ngOnInit(){

  this.addBatche = this._fb.group({
    name : ['', Validators.required],
    code : ['', Validators.required],
    startDate : ['', Validators.required],
  })

}

  submitStudent(){

    const formData = new FormData();
    formData.append('name', this.addBatche.get('name')?.value )
    formData.append('username', this.addBatche.get('mobile')?.value )
    formData.append('password', this.addBatche.get('password')?.value )
    formData.append('email', this.addBatche.get('email')?.value )

    // this._userService.addBatche(formData).subscribe(res => {
    //   console.log("teacher create successfuly")
    // })


  }

  closeButton(){

  }

}
