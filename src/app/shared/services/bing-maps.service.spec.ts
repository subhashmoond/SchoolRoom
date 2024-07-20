import { TestBed } from '@angular/core/testing';

import { BingMapsService } from './bing-maps.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BingMapsService', () => {
  let service: BingMapsService;

  beforeEach(async() => {
   await TestBed.configureTestingModule({
    imports : [HttpClientTestingModule]
   });
    service = TestBed.inject(BingMapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
