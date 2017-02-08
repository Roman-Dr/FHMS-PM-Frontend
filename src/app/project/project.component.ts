import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {UserService, ProjectService} from "../_services/index";

import {User, Project} from "../_models/index";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {

  displayName: string = "Projekt";
  errorMessage: string = "";

  isBusy: boolean = false;
  isNew: boolean = false;

  project: Project = new Project();
  projectId: string;

    users: User[] = [];

  selectedStakeholder: string;
  selectedContributor: string;

  constructor(private projectService: ProjectService,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.getUsers();

    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['projectId'];
      console.log('Project: ' + this.projectId);
      if (this.projectId == 'new') {
        this.isNew = true;
      } else {
        this.load(this.projectId);
      }
    });
  }

  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  addContributor() {
    console.log('Add ' + this.selectedContributor);

    var userIndex = this.users.findIndex(x => x.email == this.selectedContributor);
    if (userIndex > -1) {
      var user = this.users[userIndex];

      this.project.contributors.push(user);
    }
  }

  removeContributor(index: number) {
    this.project.contributors.splice(index, 1);
  }

  availableStakeholders() {
    return this.users.filter(x => this.project.stakeholders.findIndex(y => y.email == x.email) == -1);
  }

  availableContributors() {
    return this.users.filter(x => this.project.contributors.findIndex(y => y.email == x.email) == -1);
  }

  addStakeholder() {
    console.log('Add ' + this.selectedStakeholder);

    var userIndex = this.users.findIndex(x => x.email == this.selectedStakeholder);
    if (userIndex > -1) {
      var user = this.users[userIndex];

      this.project.stakeholders.push(user);
    }
  }

  removeStakeholder(index: number) {
    this.project.stakeholders.splice(index, 1);
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => {
          this.users = users;
        },
        error => this.errorMessage = <any> error
      )
  }

  load(id: string) {
    console.log('Load project with id ' + id);
    this.projectService.getProject(id)
      .subscribe(
        project => this.project = project,
        error => this.errorMessage = <any> error
      );
  }

  save() {
    console.log('Saving...' + JSON.stringify(this.project));

    var stakeholders = this.project.stakeholders.map((x: any) => x._id);
    console.log(JSON.stringify(stakeholders));
    var contributors = this.project.contributors.map((x: any) => x._id);
    console.log(JSON.stringify(contributors));
    var userId = sessionStorage.getItem('user_id');
    console.log(JSON.stringify(userId));

    if (this.isNew) {
      this.projectService.createProject(this.project.displayName, this.project.description, this.project.dueDate, userId, stakeholders, contributors)
        .subscribe(
          success => {
            this.location.back();
          });
    }
    else {
      this.projectService.updateProject(this.projectId, this.project.displayName, this.project.description, this.project.dueDate, userId, stakeholders, contributors)
        .subscribe(
          success => {
            this.location.back();
          });
    }
  }

  remove() {
    if (this.isNew) {
      this.location.back()
    } else {
      this.projectService.removeProject(this.projectId).subscribe(success => this.location.back());
    }
  }

  cancel() {
    this.location.back();
  }
}
