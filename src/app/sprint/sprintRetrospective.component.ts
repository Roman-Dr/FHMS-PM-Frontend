import { Component, OnInit } from '@angular/core';
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";
import {User} from "../_models/user";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-sprintRetrospective',
  templateUrl: './sprintRetrospective.component.html',
  styleUrls: ['./sprintRetrospective.component.css'],
  providers: [SprintService]
})
export class SprintRetrospectiveComponent implements OnInit {

  sprint: Sprint;
  users: User[];
  errorMessage: string;
  sprintId: string;

  userId: string;
  comment: string;




  constructor(private sprintService: SprintService, private activatedRoute: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.sprintId = params['sprintId'];
      console.log("Sprint: " + this.sprintId);
      if(this.sprintId) {
        this.sprintService.getSprint(this.sprintId).subscribe(sprint => this.sprint = sprint);
      } else {
        this.sprint = null;
      }
    });

  }


  getSprint(){
    this.sprintService.getSprint(this.sprintId).subscribe(sprint => this.sprint = sprint);
  }


  createSprintRetrospective() {
    this.sprintService.createSprintRetrospective(this.sprintId, this.userId, this.comment)
      .subscribe(
        success => {
          this.getSprint();
          this.comment = '';
        },

        error => this.errorMessage = <any> error
      );
  }


  cancel() {
    this.location.back();
  }

}
