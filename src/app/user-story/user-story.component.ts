import {Component} from '@angular/core';
import {UserStory} from './UserStory';
import {UserStoryDataServiceService} from '../_service/user-story-data-service.service';

@Component({
  selector: 'app-UserStory',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css'],
  providers: [UserStoryDataServiceService]
})
export class UserStoryComponent {

  newUserStory: UserStory = new UserStory();

  constructor(private userStoryDataServiceService: UserStoryDataServiceService) {
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
