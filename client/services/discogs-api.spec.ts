/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DiscogsApiService } from './discogs-api.service';

describe('DiscogsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscogsApiService]
    });
  });

  it('should ...', inject([DiscogsApiService], (service: DiscogsApiService) => {
    expect(service).toBeTruthy();
  }));
});
