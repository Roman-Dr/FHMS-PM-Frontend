import {Component} from '@angular/core';
import {UserStory} from './UserStory';
import {UserStoryDataService} from '../_services/user-story-data.service';



@Component({
  selector: 'app-UserStory',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css'],
  providers: [UserStoryDataService]
})
export class UserStoryComponent {

  newUserStory: UserStory = new UserStory();

  constructor(private userStoryDataServiceService: UserStoryDataService) {
  }

  addUserStory() {
      this.userStoryDataServiceService.addUserStory(this.newUserStory);
      this.newUserStory = new UserStory();
    
  }

  toggleUserStoryComplete(userStory) {
    this.userStoryDataServiceService.toggleUserStoryComplete(userStory);
  }

  removeUserStory(userStory) {
    this.userStoryDataServiceService.deleteUserStoryById(userStory.id);
  }

  get userStories() {
    return this.userStoryDataServiceService.getAllUserStories();
  }

}
