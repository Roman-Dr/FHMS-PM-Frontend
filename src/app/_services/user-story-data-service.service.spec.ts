/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserStoryDataServiceService } from './user-story-data-service.service';

describe('UserStoryDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStoryDataServiceService]
    });
  });

  it('should ...', inject([UserStoryDataServiceService], (service: UserStoryDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
