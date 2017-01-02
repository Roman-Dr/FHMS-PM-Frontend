

import {Injectable} from '@angular/core';
import {UserStory} from '../user-story/UserStory';

@Injectable()
export class UserStoryDataService {

  // Placeholder for last id so we can simulate
  // automatic incrementing of id's
  lastId: number = 0;

  // Placeholder for todo's
  userStories: UserStory[] = [];

  constructor() {
  }

  // Simulate POST /todos
  addUserStory(userStory: UserStory): UserStoryDataService {
    if(userStory.author==''||userStory.title==''){

    }
    else {
      if (!userStory.id) {
        userStory.id = ++this.lastId;
      }
      this.userStories.push(userStory);
      return this;
    }
  }

  // Simulate DELETE /todos/:id
  deleteUserStoryById(id: number): UserStoryDataService {
    this.userStories = this.userStories
      .filter(userStory => userStory.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateUserStoryById(id: number, values: Object = {}): UserStory {
    let userStory = this.getUserStoryById(id);
    if (!userStory) {
      return null;
    }
    Object.assign(userStory, values);
    return userStory;
  }

  // Simulate GET /todos
  getAllUserStories(): UserStory[] {
    console.log("Service: getAllUserStories()");
    return this.userStories;
  }

  // Simulate GET /todos/:id
  getUserStoryById(id: number): UserStory {
    return this.userStories
      .filter(userStory => userStory.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleUserStoryComplete(userStory: UserStory) {
    let updatedTodo = this.updateUserStoryById(userStory.id, {
      complete: !userStory.complete
    });
    return updatedTodo;
  }

}

