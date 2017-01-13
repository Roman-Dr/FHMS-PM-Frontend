import { Component, OnInit } from '@angular/core';
import {Sprint} from "../_models/sprint";
import {SprintService} from "../_services/sprint.service";

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
  providers: [SprintService]
})
export class SprintComponent implements OnInit {


  sprints: Sprint[];
  errorMessage: string;
  create = false;


  constructor(private sprintService: SprintService) {
  }

  ngOnInit() {
    this.getSprints()
  }

  getSprints() {
    this.sprintService.getSprints()
      .subscribe(
        sprints => this.sprints = sprints,
        error => this.errorMessage = <any> error
      )
  }


  createSprint(sprintName: string, startDate: string, endDate: string) {
    this.sprintService.createSprint(sprintName, startDate, endDate)
      .subscribe(
        success => {
          this.getSprints();
          this.showCreation();
        });
  }


  showCreation() {
    if (this.create) {
      this.create = false;
    }
    else {
      this.create = true;
    }
  }

}
