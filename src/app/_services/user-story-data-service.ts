

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
  addTodo(userStory: UserStory): UserStoryDataService {
    if(userStory.author==''){

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
  deleteTodoById(id: number): UserStoryDataService {
    this.userStories = this.userStories
      .filter(userStory => userStory.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateTodoById(id: number, values: Object = {}): UserStory {
    let userStory = this.getTodoById(id);
    if (!userStory) {
      return null;
    }
    Object.assign(userStory, values);
    return userStory;
  }

  // Simulate GET /todos
  getAllTodos(): UserStory[] {
    return this.userStories;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): UserStory {
    return this.userStories
      .filter(userStory => userStory.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleTodoComplete(userStory: UserStory) {
    let updatedTodo = this.updateTodoById(userStory.id, {
      complete: !userStory.complete
    });
    return updatedTodo;
  }

}

