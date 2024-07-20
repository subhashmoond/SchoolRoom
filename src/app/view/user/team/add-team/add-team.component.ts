import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { SidebarModule } from 'primeng/sidebar';
import { UserService } from '../../../../core/services/user.service';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-team',
  standalone: true,
  imports: [SidebarModule, ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, MultiSelectModule, PasswordModule, InputSwitchModule, ToastModule],
  providers : [MessageService],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {
  @Output() sidebar = new EventEmitter<any>()

  sideBar : boolean = true;
  addTeacher!: FormGroup;

  groupedCities = [
    {
        label: 'Germany',
        value: 'de',
        items: [
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Frankfurt', value: 'Frankfurt' },
            { label: 'Hamburg', value: 'Hamburg' },
            { label: 'Munich', value: 'Munich' }
        ]
    },
    {
        label: 'USA',
        value: 'us',
        items: [
            { label: 'Chicago', value: 'Chicago' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'New York', value: 'New York' },
            { label: 'San Francisco', value: 'San Francisco' }
        ]
    },
    {
        label: 'Japan',
        value: 'jp',
        items: [
            { label: 'Kyoto', value: 'Kyoto' },
            { label: 'Osaka', value: 'Osaka' },
            { label: 'Tokyo', value: 'Tokyo' },
            { label: 'Yokohama', value: 'Yokohama' }
        ]
    }
];

constructor(private _fb : FormBuilder, private _userService : UserService, private messageService: MessageService){}

ngOnInit(){

  this.addTeacher = this._fb.group({
    name : ['', Validators.required],
    email : ['', Validators.required],
    mobile : ['', Validators.required],
    password : ['', Validators.required],
    permissions : ['']
  })

}

  submitStudent(){

    const formData = new FormData();
    formData.append('name', this.addTeacher.get('name')?.value )
    formData.append('username', this.addTeacher.get('mobile')?.value )
    formData.append('password', this.addTeacher.get('password')?.value )
    formData.append('email', this.addTeacher.get('email')?.value )

    this._userService.addTeacher(formData).subscribe(res => {
      console.log("teacher create successfuly")
      if(res){
        this.messageService.add({ severity: 'success', detail: 'Teacher Create Successfully' });
        this.sidebar.emit(false)
      }
    })


  }

  closeButton(){

  }

}
