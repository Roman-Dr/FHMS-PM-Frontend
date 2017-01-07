import {Component, OnInit} from '@angular/core';
import {Project} from "../_models/project";
import {ProjectService} from "../_services/project.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ProjectService]
})
export class LandingComponent implements OnInit{

  project: Project;
  errorMessage: string;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    if (localStorage.getItem('project_id') !== null) {
      this.getProject();
    }
  }

  getProject() {
    this.projectService.getProject(localStorage.getItem('project_id'))
      .subscribe(
        project => this.project = project,
        error => this.errorMessage = <any> error
      )
  }

}
