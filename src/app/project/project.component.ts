import {Component, OnInit} from '@angular/core';
import {Project} from "../_models/project";
import {ProjectService} from "../_services/project.service";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService, UserService, AuthenticationService]
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  user: User;
  users: User[];
  errorMessage: string;
  create = false;

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

  getUser(userId) {
    this.userService.getUser(userId)
      .subscribe(
        user => this.user = user,
        error => this.errorMessage = <any> error,
      )
  }

  chooseProject(projectId) {
    this.projectService.chooseProject(projectId).subscribe(() => {
      if (this.projectService.projectSelected) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.projectService.redirectUrl ? this.projectService.redirectUrl : '/landing';
        // Redirect the user
        this.router.navigate([redirect]);
      }
    })
  }

  removeProject(projectId) {
    this.projectService.removeProject(projectId)
      .subscribe(
        success => this.getProjects()
        );


  }

  createProject(displayName: string, description: string, dueDate: string, stakeholders: string[], contributors: string[]) {
    this.projectService.createProject(displayName, description, dueDate, sessionStorage.getItem('user_id'), stakeholders, contributors)
      .subscribe(
        success => {
          this.getProjects();
          this.showCreation();
        });
  }


  updateProject(projectId: string, displayName: string, description: string, dueDate: string, stakeholders: string[], contributors: string[]) {
    this.projectService.updateProject(projectId, displayName, description, dueDate, sessionStorage.getItem('user_id'), stakeholders, contributors)
      .subscribe(
        success => {
          this.getProjects();
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
