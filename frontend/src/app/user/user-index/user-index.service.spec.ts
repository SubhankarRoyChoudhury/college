import { TestBed } from '@angular/core/testing';

import { UserIndexService } from './user-index.service';

describe('UserIndexService', () => {
  let service: UserIndexService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserIndexService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
