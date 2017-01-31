import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {Backlog, User, Task, UserStory, Sprint} from '../_models/index';
import {
  ProjectService,
  TaskService,
  BacklogDataService,
  UserService,
  UserStoryDataService,
  SprintService
} from '../_services/index';


@Component({
  selector: 'app-backlogItem',
  templateUrl: 'backlogItem.component.html',
  styleUrls: ['backlogItem.component.css'],
  providers: [BacklogDataService, TaskService, UserService, UserStoryDataService, SprintService]
})
export class BacklogItemComponent implements OnInit {

  displayName: string = "Backlogeintrag";
  errorMessage: string = "";

  backlogItem: Backlog = new Backlog();
  backlogItemId: string = "";

  projectId: string = "";
  userId: string = "";

  newTask: Task = null;

  contributors: User[] = [];
  sprints: Sprint[] = [];
  userStories: UserStory[] = [];

  isNew: boolean = false;
  isBusy: boolean = false;

  constructor(private projectService: ProjectService,
              private taskService: TaskService,
              private backlogDataService: BacklogDataService,
              private sprintService: SprintService,
              private userService: UserService,
              private userStoryDataService: UserStoryDataService,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }


  ngOnInit() {
    this.projectId = sessionStorage.getItem('project_id');
    this.userId = sessionStorage.getItem('user_id');

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
    this.userStoryDataService.getUserStories().subscribe(userStories => this.userStories = userStories);

    this.activatedRoute.params.subscribe((params: Params) => {
      this.backlogItemId = params['backlogItemId'];
      console.log('BacklogItemId: ' + this.backlogItemId);
      if (this.backlogItemId == 'newBug' || this.backlogItemId == 'newBacklogItem') {
        this.isNew = true;

        this.backlogItem = new Backlog();
        this.backlogItem.itemType = (this.backlogItemId == 'newBug' ? 'Bug' : 'BacklogItem');
        this.backlogItem.authorId = this.userId;
        this.projectId = this.projectId;

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

  cancel() {
    this.location.back();
  }

  save() {
    if (this.isNew) {
      this.backlogDataService.addBacklogItem(this.backlogItem)
        .subscribe(
          res => this.location.back(),
          err => this.errorMessage = err);
    } else {
      this.backlogDataService.updateBacklogItem(this.backlogItemId, this.backlogItem)
        .subscribe(
          res => this.location.back(),
          err => this.errorMessage = err);
    }
  }

  remove() {
    if (!this.isNew) {
      this.backlogDataService.deleteBacklogitem(this.backlogItemId).subscribe(
        data => {
          this.location.back();
        }
      );
    } else {
      this.location.back();
    }
  }

  create() {
    this.newTask = new Task();
  }

  addOrUpdateTask() {
    if (this.newTask._id) {
      if (!this.isNew) {
        console.log('Update Task: ' + JSON.stringify(this.newTask));
        this.taskService.updateTask(this.backlogItemId, this.newTask)
          .subscribe(task => {
            this.newTask = null;
          });
      } else {
        console.log('Update Task -> wait to add parent');
      }
    } else {
      this.newTask.authorId = sessionStorage.getItem('user_id');

      console.log('New Task: ' + JSON.stringify(this.newTask));
      this.taskService.addTask(this.backlogItemId, this.newTask)
        .subscribe(task => {
          this.backlogItem.tasks.push(this.newTask);
          this.newTask = null;
        });
    }
  }

  discardTask() {
    this.newTask = null;
  }

  editTask(i: number) {
    this.newTask = this.backlogItem.tasks[i];
  }

  removeTask(i: number) {
    var task = this.backlogItem.tasks[i];
    console.log('Remove Task: ' + JSON.stringify(task));

    this.taskService.deleteTask(this.backlogItemId, task._id)
      .subscribe(
        res => {
          this.backlogItem.tasks.splice(i, 1);
          this.newTask = null;
        },
        err => this.errorMessage = err
      );
  }

  // Workaround: Angular cannot bind whole objects with ngModel
  updateTaskAssignedTo(id: string) {
    var user = this.contributors.find(x => x._id == id);
    this.newTask.assignedToDisplayName = user ? user.firstname + " " + user.lastname : "";
  }
}
