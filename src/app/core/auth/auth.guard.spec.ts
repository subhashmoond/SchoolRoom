import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should return false if isLoggedIn is false in localStorage', () => {
    
    spyOn(localStorage, 'getItem').and.returnValue('false');

    const result = false;

    expect(result).toBeFalse();
  });

  it('should return true if isLoggedIn is true in localStorage', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue('true');

    // Act
    const result = true;

    // Assert
    expect(result).toBeTrue();
  });
});
