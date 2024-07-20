import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { DataMethodService } from '../../shared/services/data-method.service';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

describe('AuthService', () => {

  const mockResponse = {
    "username": "subhash",
    "userId": 590,
    "base64EncodedAuthenticationKey": "c3ViaGFzaDoxMjM0NTY=",
    "authenticated": true,
    "officeId": 1,
    "officeName": "Head Office",
    "roles": [
      {
        "id": 1,
        "name": "Super user",
        "description": "This role provides all application permissions.",
        "disabled": false
      }
    ],
    "permissions": [
      "CREATE_EARNING_CHECKER",
    ],
    "shouldRenewPassword": false,
    "isTwoFactorAuthenticationRequired": false,
    "channelType": ""
  }

  let mockDataService: any;

  beforeEach(async () => {
    mockDataService = jasmine.createSpyObj('DataService', ['post']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: DataMethodService, useValue: mockDataService }
      ]
    })
      .compileComponents();
  });


  it('should call DataService.post and return login response on successful login', fakeAsync(async () => {
    const credentials = { username: 'testuser', password: 'password123' };
    const authService: AuthService = TestBed.inject(AuthService);

    mockDataService.post.and.returnValue(of(mockResponse));

    const loginObservable = authService.userLogin(credentials);
    loginObservable.subscribe(response => expect(response).toEqual(mockResponse));

    tick(500);

    expect(mockDataService.post).toHaveBeenCalledWith(
      environment.basePath + 'fineract-provider/api/v1/authentication',
      credentials
    );
  }));



})
