import { TestBed } from '@angular/core/testing';

import { DataMethodService } from './data-method.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('DataMethodService', () => {
  let service: DataMethodService;
  let httpTestingController : HttpTestingController

  beforeEach(async() => {
   await TestBed.configureTestingModule({
    imports : [HttpClientTestingModule, HttpClientTestingModule],
    providers : [DataMethodService]
   });
  
    service = TestBed.inject(DataMethodService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should send a GET request', () => {
    const testData = { id: 1, name: 'Test Data' };
    const url = '/api/data';

    service.get(url).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('should send a POST request', () => {
    const url = '/api/data';
    const payload = 'Test Payload';

    service.post(url, payload).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({});
  });

  it('should send a PUT request', () => {
    const url = '/api/data/';
    const id = 1;
    const payload = 'Updated Payload';

    service.put(url, id, payload).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(url + id);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(payload);
    req.flush({});
  });

  it('should send a DELETE request', () => {
    const url = '/api/data/';
    const id = 1;

    service.delete(url, id).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(url + id);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
  
  

});
