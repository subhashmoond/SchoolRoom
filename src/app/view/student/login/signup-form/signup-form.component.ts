import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Gemini from 'gemini-ai';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../core/services/auth.service';
import { UrlHandlerService } from '../../../../shared/services/url-handler.service';

@Component({
  selector: 'app-signup-form',
  standalone: true,
  imports: [InputTextModule, ButtonModule, PanelModule, FormsModule, ReactiveFormsModule, CardModule, ToastModule, TranslateModule],
  providers: [MessageService],
  templateUrl: './signup-form.component.html',
  styleUrl: './signup-form.component.css'
})
export class SignupFormComponent {

  signUpFrom!: FormGroup;
  title = 'Log in'
  submitMsg!: string;
  showPassword: boolean = false;



  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _messageService: MessageService, private translate: TranslateService, private _urlHandlerService: UrlHandlerService) {
    translate.setDefaultLang('en-US');
  }

  ngOnInit() {

    this.giminiAPI()

    const deviceId = this._authService.getDeviceId();

    console.log(deviceId, "device id")

    // Get user isLoggedIn status 
    const loginStatus = JSON.parse(localStorage.getItem('isLoggedIn')!)

    if (loginStatus) {
      this.router.navigate(['/dashborad']);
    }

    console.log(loginStatus, "Login Status ")

    this.signUpFrom = this.fb.group({
      name : ['', [Validators.required]],
      username: ['', [Validators.required]],
      instituteCode : ['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  async giminiAPI(){
    const gemini = new Gemini('AIzaSyAlaH60kwBTOjUYQcJcXeqfwbMEZ_zzPYA');
    console.log(await gemini.ask("Hi!"), "gemini response");
  }

  viewPassword() {
    this.showPassword = !this.showPassword
  }

  signUpUser() {

    if (this.signUpFrom.valid) {

      const formData = new FormData();
      formData.append('name', this.signUpFrom.get('name')?.value);
      formData.append('username', this.signUpFrom.get('username')?.value);
      formData.append('instituteCode', this.signUpFrom.get('instituteCode')?.value);
      formData.append('password', this.signUpFrom.get('password')?.value);

      this._authService.signUpStudent(formData).subscribe((res: any) => {
        console.log(res)
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'User Sign Up Successful' });
      }, error => {
        // const errormsg = error.error.userMessageGlobalisationCode
        // this._messageService.add({ severity: 'error', summary: ' Error', detail: this.translate.instant(errormsg) });
      })
    }
  }





}
