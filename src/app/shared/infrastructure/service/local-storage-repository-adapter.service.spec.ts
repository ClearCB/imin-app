import { TestBed } from '@angular/core/testing';

import { LocalStorageRepositoryAdapterService } from './local-storage-repository-adapter.service';

describe('LocalStorageRepositoryAdapterService', () => {
  let service: LocalStorageRepositoryAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageRepositoryAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
