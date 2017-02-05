import { Component, OnInit } from '@angular/core';
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";
import {UserService} from "../_services/user.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  providers: [SprintService, UserService, DatePipe]
})
export class SprintComponent implements OnInit {

  sprints: Sprint[];
  sprint: Sprint;
  errorMessage: string;

  sprintName: string;
  startDate: Date;
  endDate: Date;

  chosenSprint: Sprint;
  editMode: boolean = false;

  today;



  constructor(private sprintService: SprintService, private router: Router, private datePipe: DatePipe) {
   this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }


  ngOnInit() {
    this.getSprints();
  }

  getSprints() {
  this.sprintService.getSprints()
    .subscribe(
      sprints => this.sprints = sprints,
      error => this.errorMessage = <any> error
    )
}



  openSprintCapacity(sprint) {
    this.router.navigate(['sprints/'+sprint._id+'/sprintcapacities']);
  }

  openSprintRetrospective(sprint) {
    this.router.navigate(['sprints/'+sprint._id+'/sprintretrospective']);
  }

  checkStatus(sprint){
    if(sprint.endDate >= this.today) {return true;}
    else {return false};
  }

  checkDisabledStatus(sprint){
    if(sprint.endDate <= this.today) {return "disabled";}
    else {return ""};
  }

  chooseSprintForEdit(sprint){
    sprint.startDate = this.datePipe.transform(sprint.startDate, 'yyyy-MM-dd');
      sprint.endDate = this.datePipe.transform(sprint.endDate, 'yyyy-MM-dd');

    this.chosenSprint = sprint;


    console.log(this.chosenSprint);
    this.editMode = true;
  }

  cancelSprintForEdit(){
    this.chosenSprint = null;
    this.editMode = false;
  }



  createSprint() {
    this.sprintService.createSprint(this.sprintName, this.startDate, this.endDate)
      .subscribe(
        success => {
          this.getSprints();
          this.sprintName = '';
          this.startDate = null;
          this.endDate = null;
        },
        error => this.errorMessage = <any> error
        );
  }


  updateSprint(sprint) {
    this.sprintService.updateSprint(sprint._id, sprint.sprintName, sprint.startDate, sprint.endDate)
      .subscribe(
        success => this.getSprints()
      );
  }

  deleteSprint(sprint) {
    this.sprintService.deleteSprint(sprint._id)
      .subscribe(
        success => this.getSprints(),
        error => this.errorMessage = <any> error
      );


  }






}
