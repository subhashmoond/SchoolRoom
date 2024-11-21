import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import for HttpClient

import { LoginFormComponent } from './login-form.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>
  let mockAuthService: any;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['userLogin']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const translateSpy = jasmine.createSpyObj('AuthService', ['userLogin']);


    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        LoginFormComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: TranslateService, useValue: translateSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService);
    fixture.detectChanges();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the login form', () => {
    expect(component.loginForm).toBeTruthy();
  });

  it('should validate username and password', () => {
    const usernameInput = fixture.debugElement.query(By.css('#username'));
    const passwordInput = fixture.debugElement.query(By.css('#password'));

    usernameInput.nativeElement.value = 'testuser';
    passwordInput.nativeElement.value = 'password123';

    usernameInput.triggerEventHandler('input', { target: usernameInput.nativeElement });
    passwordInput.triggerEventHandler('input', { target: passwordInput.nativeElement });
    fixture.detectChanges();
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should toggle showPassword property', () => {
    expect(component.showPassword).toBeFalse();
    component.viewPassword();
    expect(component.showPassword).toBeTrue();

    component.viewPassword();
    expect(component.showPassword).toBeFalse();
  });

  it('should call userLogin and navigate when loginForm is valid', () => {
    const mockResponse = { username: 'testuser', token: 'mock-token' };
    const loginForm = component.loginForm;
    loginForm.setValue({ username: 'testuser', password: 'password' });

    authService.userLogin.and.returnValue(of(mockResponse));

    component.loginUser();

    expect(authService.userLogin).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'password'
    });
    expect(localStorage.getItem('userData')).toEqual(JSON.stringify(mockResponse));
    expect(localStorage.getItem('isLoggedIn')).toEqual(JSON.stringify(true));
    // expect(router.navigate).toHaveBeenCalledWith(['/dashboard/default']);
  });
  


});
