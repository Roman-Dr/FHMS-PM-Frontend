import { Component, OnInit } from '@angular/core';
import {Sprint, Retrospective} from "../_models/index";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";
import {SprintService, ProjectService, UserService} from "../_services/index";


@Component({
  selector: 'app-sprintRetrospective',
  templateUrl: './sprintRetrospective.component.html',
  styleUrls: ['./sprintRetrospective.component.css'],
  providers: [SprintService, ProjectService, UserService]
})
export class SprintRetrospectiveComponent implements OnInit {

  sprint: Sprint;
  sprintRetrospectiveArray: Array<any> = [];
  errorMessage: string;
  sprintId: string;



  constructor(private sprintService: SprintService,
              private activatedRoute: ActivatedRoute,
              private projectService: ProjectService,
              private userService: UserService,
              private location: Location) {

  }

  ngOnInit() {
    this.getProject();

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


  getUser(userId){
    this.userService.getUser(userId).subscribe();
  }


  getSprint(){
    this.sprintService.getSprint(this.sprintId).subscribe(sprint => this.sprint = sprint);
  }

  getProject(){
    this.projectService.getProject(sessionStorage.getItem('project_id')).subscribe(project => this.setUserIdsForRetrospective(project));
  }



  setUserIdsForRetrospective(project){
    for(let i = 0; i < project.contributors.length; i++) {
      let newSprintRetrospective = new Retrospective();
      newSprintRetrospective.userId = project.contributors[i]._id;
      this.sprintRetrospectiveArray.push(newSprintRetrospective);
    }
  }

  createSprintRetrospective() {
    this.sprintService.createSprintRetrospective(this.sprintId, this.sprintRetrospectiveArray)
      .subscribe(
        success => this.getSprint(),
        error => this.errorMessage = <any> error
      );
  }


  cancel() {
    this.location.back();
  }

}
