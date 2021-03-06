import { Component, OnInit } from '@angular/core';
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {SprintCapacity} from "../_models/sprintCapacity";

@Component({
  selector: 'app-sprintCapacity',
  templateUrl: './sprintCapacity.component.html',
  styleUrls: ['./sprintCapacity.component.css'],
  providers: [SprintService, UserService]
})
export class SprintCapacityComponent implements OnInit {

  sprint: Sprint;
  users: User[];
  errorMessage: string;
  editedIndex: number;

  userId: string;
  daysOff: number;
  capacityPerDay: number;
  sprintId: string;





  constructor(private sprintService: SprintService, private userService: UserService, private activatedRoute: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    this.getUsers();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.sprintId = params['sprintId'];
      console.log("Sprint: " + this.sprintId);
      if(this.sprintId) {
        this.sprintService.getSprint(this.sprintId).subscribe(sprint => this.sprint = sprint);
      } else {
        this.sprint = null;
      }
    });

    console.log(this.sprintId);

  }


  getSprint(){
    this.sprintService.getSprint(this.sprintId).subscribe(sprint => this.sprint = sprint);
  }




  updateSprintCapacity(sprintCapacity, daysOff: number, capacityPerDay: number) {
    if ( daysOff > 0 && capacityPerDay > 0 ) {

    if (daysOff == null) {daysOff = sprintCapacity.daysOff}
    if (capacityPerDay == null) {capacityPerDay = sprintCapacity.capacityPerDay}

      this.sprintService.updateSprintCapacity(this.sprintId, sprintCapacity._id, sprintCapacity.userId, daysOff, capacityPerDay)
        .subscribe(
          success => {
            this.editedIndex = null;
            this.getSprint();
          },
          error => this.errorMessage = <any> error
        );
    }


  }


  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }


  deleteSprintCapacity(sprintCapacity) {
    this.sprintService.deleteSprintCapacity(this.sprintId, sprintCapacity._id)
      .subscribe(
        success => this.getSprint(),
        error => this.errorMessage = <any> error
      );


  }

  isSprintPast(){
    if(this.sprint) {
      if (new Date(this.sprint.endDate).getTime() <= new Date().getTime()) {
        return true;
      }
      else {
        return false
      }
    }
    else {
      return false;
    }
  }

  cancel() {
    this.location.back();
  }


  edit(sprintcapacity: any, i: number) {
    this.editedIndex = i;
  }

  createSprintCapacity() {

    if ( this.daysOff > 0 || this.capacityPerDay > 0 ) {
      this.sprintService.createSprintCapacity(this.sprintId, this.userId, this.daysOff, this.capacityPerDay)
        .subscribe(
          success => {
            this.getSprint();
            this.userId = '';
            this.daysOff = null;
            this.capacityPerDay = null;
          },

          error => this.errorMessage = <any> error
        );
    }
  }



}
