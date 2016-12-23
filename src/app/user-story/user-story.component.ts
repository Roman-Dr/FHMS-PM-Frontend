import {Component} from '@angular/core';
import {UserStory} from './UserStory';
import {UserStoryDataService} from '../_services/user-story-data-service';



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
    this.userStoryDataServiceService.addTodo(this.newUserStory);
    this.newUserStory = new UserStory();
  }

  toggleUserStoryComplete(userStory) {
    this.userStoryDataServiceService.toggleTodoComplete(userStory);
  }

  removeUserStory(userStory) {
    this.userStoryDataServiceService.deleteTodoById(userStory.id);
  }

  get userStories() {
    return this.userStoryDataServiceService.getAllTodos();
  }

}
