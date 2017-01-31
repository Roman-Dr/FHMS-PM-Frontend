import { Component, OnInit } from '@angular/core';
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {DateModel, DatePickerOptions} from "ng2-datepicker";

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

  startDate: DateModel;
  endDate: DateModel;

  startDateEdit: DateModel;
  endDateEdit: DateModel;
  options: DatePickerOptions;


  constructor(private sprintService: SprintService, private userService: UserService) {
    this.options = new DatePickerOptions();
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


  updateSprintCapacity(sprintId: string, sprintCapacityId, userId: string, daysOff: number, capacityPerDay: number ) {
    this.sprintService.updateSprintCapacity(sprintId, sprintCapacityId, userId, daysOff, capacityPerDay)
      .subscribe(
        success => this.getSprints()
      );
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }



  createSprint(sprintName: string) {
    this.sprintService.createSprint(sprintName, this.startDate.momentObj, this.endDate.momentObj)
      .subscribe(
        success => this.getSprints(),
        error => this.errorMessage = <any> error
        );
  }


  updateSprint(sprintId: string, sprintName: string) {
    this.sprintService.updateSprint(sprintId, sprintName, this.startDateEdit.momentObj, this.endDateEdit.momentObj)
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


  deleteSprintCapacity(sprintId, sprintCapacityId) {
    this.sprintService.deleteSprintCapacity(sprintId, sprintCapacityId)
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
