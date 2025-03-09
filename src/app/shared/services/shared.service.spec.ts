import { TestBed } from '@angular/core/testing';

import { SharedService } from './shared.service';
import { Observable, of } from 'rxjs';
import { DataMethodService } from './data-method.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockDataService {
  get(url: string): Observable<any> {
    return of({ message: 'Success' });
  }
}

describe('SharedService', () => {
  let service: SharedService;
  let mockDataService: MockDataService;

  // beforeEach(() => {
  //   TestBed.configureTestingModule({});
  //   service = TestBed.inject(SharedService);
  // });

 

});
