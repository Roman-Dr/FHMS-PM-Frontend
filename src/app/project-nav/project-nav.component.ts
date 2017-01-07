import { Component, OnInit } from '@angular/core';
import {ProjectService} from "../_services/project.service";
import {Project} from "../_models/project";

@Component({
  selector: 'app-project-nav',
  templateUrl: './project-nav.component.html',
  styleUrls: ['./project-nav.component.css'],
  providers: [ProjectService]
})
export class ProjectNavComponent implements OnInit {

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
