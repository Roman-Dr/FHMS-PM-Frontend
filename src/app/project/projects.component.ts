import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {UserService, ProjectService} from "../_services/index";

import {User, Project} from "../_models/index";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[];
  user: User;
  users: User[];
  errorMessage: string;

  constructor(private projectService: ProjectService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.getProjects();
    this.getUsers();
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe(
        projects => this.projects = projects,
        error => this.errorMessage = <any> error
      )
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }

  chooseProject(projectId) {
    console.log('Choose project: ' + projectId);
    this.projectService.chooseProject(projectId).subscribe(() => {
      if (sessionStorage.getItem('project_id')) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.projectService.redirectUrl ? this.projectService.redirectUrl : '/landing';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    })
  }
}
