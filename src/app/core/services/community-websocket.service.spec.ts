import { TestBed } from '@angular/core/testing';

import { CommunityWebsocketService } from './community-websocket.service';

describe('CommunityWebsocketService', () => {
  let service: CommunityWebsocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunityWebsocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
