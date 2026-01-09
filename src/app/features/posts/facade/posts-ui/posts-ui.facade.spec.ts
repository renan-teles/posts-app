import { TestBed } from '@angular/core/testing';

import { PostsUiFacade } from './posts-ui.facade';

describe('PostsUiFacade', () => {
  let service: PostsUiFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsUiFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
