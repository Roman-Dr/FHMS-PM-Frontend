/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserStoryDataService } from './user-story-data-service';

describe('UserStoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStoryDataService]
    });
  });

  it('should ...', inject([UserStoryDataService], (service: UserStoryDataService) => {
    expect(service).toBeTruthy();
  }));
});
