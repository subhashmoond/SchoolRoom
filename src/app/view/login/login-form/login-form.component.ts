import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UrlHandlerService } from '../../../shared/services/url-handler.service';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [InputTextModule, ButtonModule, PanelModule, FormsModule, ReactiveFormsModule, CardModule, ToastModule, TranslateModule],
  providers: [MessageService],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  loginForm!: FormGroup;
  title = 'Log in'
  submitMsg!: string;
  showPassword: boolean = false;



  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router, private _messageService: MessageService, private translate: TranslateService, private _urlHandlerService: UrlHandlerService) {
    translate.setDefaultLang('en-US');
  }

  ngOnInit() {

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
      password: ['', Validators.required]
    })
  }

  viewPassword() {
    this.showPassword = !this.showPassword
  }

  loginUser() {

    if (this.loginForm.valid) {

      const formData = new FormData();
      formData.append('username', this.loginForm.get('username')?.value);
      formData.append('password', this.loginForm.get('password')?.value);

      this._authService.userLogin(formData).subscribe((res: any) => {
        localStorage.setItem('userData', JSON.stringify(res));
        localStorage.setItem('isLoggedIn', JSON.stringify(true));
        this.router.navigate(['/dashborad']);
        const storedUrl = this._urlHandlerService.getStoreUrl();
        // if (storedUrl) {
        //   this._urlHandlerService.clearStoreUrl();
        //   this.router.navigateByUrl(storedUrl);
        // } else {
        // }
        this._messageService.add({ severity: 'success', summary: 'Success', detail: 'User Login Successful' });
      }, error => {
        // const errormsg = error.error.userMessageGlobalisationCode
        // this._messageService.add({ severity: 'error', summary: ' Error', detail: this.translate.instant(errormsg) });
      })
    }
  }







}


