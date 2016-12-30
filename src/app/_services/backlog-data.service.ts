import { Injectable } from '@angular/core';
import {Backlog} from '../backlog/backlog';

@Injectable()
export class BacklogDataService {

  lastId: number=0;

  backlogItems: Backlog[] = [];

  constructor() { }

  addBackLog(backlog: Backlog): BacklogDataService{
    if(!backlog.id){
      backlog.id=++this.lastId;
    }
    this.backlogItems.push(backlog);
    return this;
  }


  //


  // Simulate DELETE /todos/:id
  deleteBacklogById(id: number): BacklogDataService {
    this.backlogItems = this.backlogItems
      .filter(backlog => backlog.id !== id);
    return this;
  }

  // Simulate PUT /todos/:id
  updateBacklogById(id: number, values: Object = {}): Backlog {
    let backlog = this.getBacklogById(id);
    if (!backlog) {
      return null;
    }
    Object.assign(backlog, values);
    return backlog;
  }

  // Simulate GET /todos
  getAllUBacklogItems(): Backlog[] {
    return this.backlogItems;
  }

  // Simulate GET /todos/:id
  getBacklogById(id: number): Backlog {
    return this.backlogItems
      .filter(backlog => backlog.id === id)
      .pop();
  }

  // Toggle todo complete
  toggleBacklogComplete(backlog: Backlog) {
    let updatedBacklog = this.updateBacklogById(backlog.id, {
      complete: !backlog.complete
    });
    return updatedBacklog;
  }
}
