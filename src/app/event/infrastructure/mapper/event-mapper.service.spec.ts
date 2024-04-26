import { TestBed } from '@angular/core/testing';

import { EventMapperService } from './event-mapper.service';

describe('EventMapperService', () => {
  let service: EventMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
