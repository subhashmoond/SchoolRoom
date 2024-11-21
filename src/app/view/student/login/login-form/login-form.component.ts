import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import Gemini from 'gemini-ai';
import { AuthService } from '../../../../core/services/auth.service';
import { UrlHandlerService } from '../../../../shared/services/url-handler.service';


@Component({
  selector: 'app-login-forms',
  standalone: true,
  imports: [InputTextModule, ButtonModule, InputTextModule, PanelModule, FormsModule, ReactiveFormsModule, CardModule, ToastModule, TranslateModule, InputTextModule],
  providers: [MessageService],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormsComponent {
  loginForm!: FormGroup;
  otpFrom!: FormGroup;
  title = 'Log in'
  submitMsg!: string;
  showPassword: boolean = false;
  otpVerify: boolean = false;
  loginRes: any;



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

    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      instituteCode: ['', [Validators.required]],
      password: ['', Validators.required]
    })

    this.otpFrom = this.fb.group({
      otp: ['', Validators.required]
    })


  }

  async giminiAPI() {
    const gemini = new Gemini('AIzaSyAlaH60kwBTOjUYQcJcXeqfwbMEZ_zzPYA');
    console.log(await gemini.ask("Hi!"), "gemini response");
  }

  viewPassword() {
    this.showPassword = !this.showPassword
  }

  loginUser() {

    if (this.loginForm.valid) {

      const formData = new FormData();
      formData.append('username', this.loginForm.get('username')?.value);
      formData.append('institute_code', this.loginForm.get('instituteCode')?.value);
      formData.append('password', this.loginForm.get('password')?.value);

      this._authService.studentLogIn(formData).subscribe((res: any) => {

        if (res.status === true) {
          this.otpVerify = true;
          this.loginRes = res
          this._messageService.add({ severity: 'success', detail: res.message });
        } else {
          this._messageService.add({ severity: 'error', detail: res.message });
        }
      }, error => {
        console.log()
        // const errormsg = error.error.userMessageGlobalisationCode
        // this._messageService.add({ severity: 'error', summary: ' Error', detail: this.translate.instant(errormsg) });
      })
    }
  }

  otpVarify() {

    const formData = new FormData();
    formData.append('username', this.loginRes.username);
    formData.append('otp', this.otpFrom.get('otp')?.value);

    this._authService.otpVerify(formData).subscribe((res : any) => {
      if(res.status ===true){
        this._messageService.add({ severity: 'success', detail: res.message });

        const data = {
          "status": res.status,
          "key": res.token,
          "name": res.name,
          "username": res.username,
          "institute": res.institute,
      }

        localStorage.setItem('userData', JSON.stringify(data));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        this.router.navigate(['/studentapp/dashborad']);
        const storedUrl = this._urlHandlerService.getStoreUrl();
      }else{
        this._messageService.add({ severity: 'error', detail: res.message });
      }

    })

  }

  otpResend() {
    const payload = {
      "username": this.loginRes.username
    }

    this._authService.reSendOtp(payload).subscribe(res => {

    })

  }




}


