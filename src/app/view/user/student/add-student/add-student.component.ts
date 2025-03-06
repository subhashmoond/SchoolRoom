import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { ToastModule } from 'primeng/toast';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [SidebarModule, ButtonModule, TranslateModule, ReactiveFormsModule, CalendarModule, InputTextModule, ToastModule],
  providers : [MessageService],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css'
})
export class AddStudentComponent {
  @Output() sideBars = new EventEmitter<any>();

  sideBar : boolean = true;
  addStudent!: FormGroup;

constructor(private _fb : FormBuilder, private messageService: MessageService, private _userService : UserService){}

ngOnInit(){

  this.addStudent = this._fb.group({
    name : ['', Validators.required],
    password : ['', Validators.required],
    email : ['', Validators.required],
    username : ['', Validators.required],
    mobile : ['']
  })

}

  submitStudent(){

    const formData = new FormData();

    formData.append('username', this.addStudent.get('username')?.value);
    formData.append('name', this.addStudent.get('name')?.value);
    formData.append('email', this.addStudent.get('email')?.value);
    formData.append('password', this.addStudent.get('password')?.value);

    this._userService.addStudent(formData).subscribe(res => {
      this.messageService.add({ severity: 'success', detail: 'Student Create Successfully' });
      this.sideBars.emit(false)
    })

  }

  closeButton(){
    this.sideBars.emit(false)
  }

}
