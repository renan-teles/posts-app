import { TestBed } from '@angular/core/testing';

import { JsonPlaceholderApiService } from '../json-placeholder-api.service';

describe('JsonPlaceholderApiService', () => {
  let service: JsonPlaceholderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonPlaceholderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
