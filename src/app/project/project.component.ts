import {Component, OnInit} from '@angular/core';
import {Project} from "../_models/project";
import {ProjectService} from "../_services/project.service";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";
import {User} from "../_models/user";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService, UserService]
})
export class ProjectComponent implements OnInit {

  projects: Project[];
  user: User;
  userEmail: string;
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
    this.projectService.chooseProject(projectId);
  }

  removeProject(projectId) {
    this.projectService.removeProject(projectId)
      .subscribe(
        success => {
          this.getProjects();
        });


  }

  createProject(displayName, description, dueDate, owner, stakeholders, contributors) {
    this.projectService.createProject(displayName, description, dueDate, owner, stakeholders, contributors)
      .subscribe(
        success => {
          this.getProjects();
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
