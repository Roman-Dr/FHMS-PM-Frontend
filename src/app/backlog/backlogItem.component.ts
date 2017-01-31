import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Backlog, User, Task, UserStory, Sprint} from '../_models/index';
import {ProjectService, TaskService,BacklogDataService,UserService,UserStoryDataService, SprintService} from '../_services/index';


@Component({
  selector: 'app-backlogItem',
  templateUrl: 'backlogItem.component.html',
  styleUrls: ['backlogItem.component.css']
})
export class BacklogItemComponent implements OnInit {

  displayName: string = "BacklogItem";
  errorMessage: string = "";

  backlogItem: Backlog = new Backlog();
  backlogItemId: string = "";
  projectId: string = "";

  newTask: Task = new Task();

  contributors: User[] = [];
  sprints: Sprint[]= [];

  isNew: boolean = false;
  isBusy: boolean = false;

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private backlogDataService: BacklogDataService,
              private sprintService: SprintService,
              private userService: UserService,
              private userStoryDataService: UserStoryDataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }



  ngOnInit() {
    this.projectId = sessionStorage.getItem('project_id');

    this.projectService.getContributorsByProjectId(this.projectId)
      .subscribe(
        contributors => {
          this.userService.getUsers()
            .subscribe(
              users => {
                this.contributors = users.filter(x => contributors.indexOf(x._id) > -1);
              });
        });

    this.sprintService.getSprints().subscribe(sprints => this.sprints = sprints);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.backlogItemId = params['backlogItemId'];
      console.log('BacklogItemId: ' + this.backlogItemId);
      if (this.backlogItemId == 'new') {
        this.isNew = true;
      } else {
        this.load(this.backlogItemId);
      }
    });
  }

  load(id: string) {
    console.log('Load backlogitem with id ' + id);
    this.backlogDataService.getBacklogitem(id)
      .subscribe(
        backlogItem => this.backlogItem = backlogItem,
        error => this.errorMessage = <any> error
      );
  }

  addTask() {

    this.newTask.authorId = sessionStorage.getItem('user_id');

    console.log('New task: ' + JSON.stringify(this.newTask));
    this.taskService.addTask(this.backlogItemId, this.newTask)
      .subscribe(task => {
        this.backlogItem.tasks.push(task);
        this.newTask = new Task();
      });
  }
}
