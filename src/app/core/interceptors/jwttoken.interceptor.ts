import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JWTtokenInterceptor implements HttpInterceptor {
  authenticationKey: any;
  
  constructor() { }
 
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn')!);

    this.authenticationKey = userData?.key;

    const isLoginAPI = request.url.includes('api/educator/login/') || request.url.includes('api/learner/register/') || request.url.includes('api/learner/login/') || request.url.includes('api/learner/otp_verify/') || request.url.includes('api/learner/resend-otp/');
    
    // Clone the request and set the authorization header if the user is logged in and it is not the login API.
    let modifiedRequest = request;
    if (!isLoginAPI ) {
      modifiedRequest = request.clone({
        setHeaders: {
          'Authorization': `token ${this.authenticationKey}`,
        }
      });
    }

    return next.handle(modifiedRequest);
  }
}
