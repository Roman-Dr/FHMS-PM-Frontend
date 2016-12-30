import { Component, OnInit } from '@angular/core';
import { Backlog} from './backlog';
import {BacklogDataService} from '../_services/backlog-data.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  providers: [BacklogDataService]
})
export class BacklogComponent {

  newBacklog: Backlog = new Backlog();

  constructor(private backlogDataService: BacklogDataService) {
  }

  addBacklog() {
    this.backlogDataService.addBackLog(this.newBacklog);
    this.newBacklog = new Backlog();

  }

  toggleBacklogComplete(backlog) {
    this.backlogDataService.toggleBacklogComplete(backlog);
  }

  removeBacklog(backlog) {
    this.backlogDataService.deleteBacklogById(backlog.id);
  }

  get backlogItems() {
    return this.backlogDataService.getAllUBacklogItems();
  }
}
