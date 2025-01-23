import { TestBed } from '@angular/core/testing';

import { LiveWebsocketService } from './live-websocket.service';

describe('LiveWebsocketService', () => {
  let service: LiveWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
