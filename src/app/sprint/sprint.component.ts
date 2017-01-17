import { Component, OnInit } from '@angular/core';
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  providers: [SprintService, UserService]
})
export class SprintComponent implements OnInit {

  sprints: Sprint[];
  sprint: Sprint;
  users: User[];
  errorMessage: string;


  constructor(private sprintService: SprintService, private userService: UserService) {
  }

  ngOnInit() {
    this.getSprints();
    this.getUsers();
  }

  getSprints() {
  this.sprintService.getSprints()
    .subscribe(
      sprints => this.sprints = sprints,
      error => this.errorMessage = <any> error
    )
}

  getSprint(sprintId: string) {
    this.sprintService.getSprint(sprintId)
      .subscribe(
        sprint => this.sprint = sprint,
        error => this.errorMessage = <any> error
      )
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }



  createSprint(sprintName: string, startDate: string, endDate: string) {
    this.sprintService.createSprint(sprintName, startDate, endDate)
      .subscribe(
        success => this.getSprints(),
        error => this.errorMessage = <any> error
        );
  }


  updateSprint(sprintId: string, sprintName: string, startDate: string, endDate: string) {
    this.sprintService.updateSprint(sprintId, sprintName, startDate, endDate)
      .subscribe(
        success => this.getSprints()
      );
  }

  deleteSprint(sprintId) {
    this.sprintService.deleteSprint(sprintId)
      .subscribe(
        success => this.getSprints(),
        error => this.errorMessage = <any> error
      );


  }


  createSprintCapacity(sprintId: string, userId: string, dayOff: number, capacityPerDay: number) {
    this.sprintService.createSprintCapacity(sprintId, userId, dayOff, capacityPerDay)
      .subscribe(
        success => this.getSprints(),
        error => this.errorMessage = <any> error
      );
  }



}
