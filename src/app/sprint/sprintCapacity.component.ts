import { Component, OnInit } from '@angular/core';
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {ActivatedRoute, Params} from "@angular/router";

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





  constructor(private sprintService: SprintService, private userService: UserService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.getUsers();

    this.activatedRoute.params.subscribe((params: Params) => {

      this.sprintId = params['sprintId'];
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




  updateSprintCapacity(sprintCapacity) {
    this.sprintService.updateSprintCapacity(this.sprintId, sprintCapacity._id, sprintCapacity.userId, sprintCapacity.daysOff, sprintCapacity.capacityPerDay)
      .subscribe(
        success => {
          this.editedIndex = null;
            this.getSprint();
        },
        error => this.errorMessage = <any> error
      );
  }


  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }


  deleteSprintCapacity(sprintCapacityId) {
    this.sprintService.deleteSprintCapacity(this.sprintId, sprintCapacityId)
      .subscribe(
        success => this.getSprint(),
        error => this.errorMessage = <any> error
      );


  }

  edit(sprintcapacity: any, i: number) {
    this.editedIndex = i;
  }

  createSprintCapacity() {
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
