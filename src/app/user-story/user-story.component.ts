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
  userstories: UserStory[];

  constructor(private userStoryDataService: UserStoryDataService) {
  }

  ngOnInit() {
    this.getUserStories();
  }

  addUserStory() {
      this.userStoryDataService.addUserStory(this.newUserStory);
      this.newUserStory = new UserStory();

  }

  toggleUserStoryComplete(userStory) {
    this.userStoryDataService.toggleUserStoryComplete(userStory);
  }

  removeUserStory(userStory) {
    this.userStoryDataService.deleteUserStoryById(userStory.id);
  }

  get userStories() {
    return this.userStoryDataService.getAllUserStories();
  }

  getUserStories() {
    this.userStoryDataService.getUserStories()
      .subscribe(
        userstories => this.userstories = userstories
      )
  }


}
