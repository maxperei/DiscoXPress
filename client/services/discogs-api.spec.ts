/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscogsApi } from './discogs-api';

describe('DiscogsApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscogsApi]
    });
  });

  it('should ...', inject([DiscogsApi], (service: DiscogsApi) => {
    expect(service).toBeTruthy();
  }));
});
