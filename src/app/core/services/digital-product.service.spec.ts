import { TestBed } from '@angular/core/testing';

import { DigitalProductService } from './digital-product.service';

describe('DigitalProductService', () => {
  let service: DigitalProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DigitalProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
