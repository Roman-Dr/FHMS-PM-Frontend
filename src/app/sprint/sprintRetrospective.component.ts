import { Component, OnInit } from '@angular/core';
import {Sprint, Retrospective} from "../_models/index";
import {SprintService} from "../_services/sprint.service";
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
  errorMessage: string;
  sprintId: string;

  userId: string;
  comment: string[];




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
    let sprintRetrospectiveArray: Array<any> = [];
    for(let i = 0; i < this.sprint.retrospective.length; i++) {
      let newSprintRetrospective = new Retrospective();
      newSprintRetrospective.userId = this.sprint.sprintCapacity[i].userId;
      newSprintRetrospective.comment = this.comment[i];
      sprintRetrospectiveArray.push(newSprintRetrospective);
    }

    this.sprintService.createSprintRetrospective(this.sprintId, sprintRetrospectiveArray)
      .subscribe(
        success => {
          this.getSprint();
        },

        error => this.errorMessage = <any> error
      );
  }


  cancel() {
    this.location.back();
  }

}
