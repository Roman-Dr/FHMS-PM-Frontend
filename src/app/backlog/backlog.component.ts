import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Backlog} from '../_models/backlog';
import {BacklogDataService} from '../_services/backlog-data.service';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {UserStoryDataService} from '../_services/user-story-data.service';
import {UserStory} from "../_models/UserStory";
import {Task} from "../_models/Task";
import {TaskService} from "../_services/task.service";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  providers: [BacklogDataService, UserStoryDataService, TaskService]
})
export class BacklogComponent {


  constructor(private backlogDataService: BacklogDataService, private  userService: UserService, private userStoryDataService: UserStoryDataService, private taskDataService: TaskService) {
  }

  errorMessage: string;
  userstories: UserStory[];

  backlogitemTitle: string;
  backlogitemState: string;
  backlogitemAuthor: string;
  backlogitemDescription: string;
  backlogitemAssignedTo: string;
  backlogitemTask: string;
  backlogitemTaskAuthor: string;


  backlogitems: Backlog[];
  users: User;
  backlogitemTasks: Task;

  removeBacklogitem(backlogitem) {
    console.log("Component: " + backlogitem._id)
    this.backlogDataService.deleteBacklogitem(backlogitem._id).subscribe(
      data => {
        this.loadBacklogitems()
      }
    );
  }

  updateBacklog(backlogitem_id, title, authorId, state, description, userstoryId) {
    this.backlogDataService.updateBacklog(backlogitem_id, title, authorId, state, description, userstoryId)
      .subscribe(
        success => {
        });
  }



  removeTask(backlogitem_id, task_id) {
    this.taskDataService.deleteTask(backlogitem_id, task_id).subscribe(
      data => {
        this.getTasks(backlogitem_id)
      }
    );
  }

  loadBacklogitems() {
    this.backlogDataService.getBacklogitems()
      .subscribe(
        backlogitems => this.backlogitems = backlogitems,
        err => {
          console.log(err);
        });
  }

  ngOnInit() {
    this.loadBacklogitems()
    this.getUsers()
    this.loadUserStories()
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }

  getTasks(backlogitem_id: string) {
    this.taskDataService.getTasks(backlogitem_id)
      .subscribe(
        tasks => this.backlogitemTasks = tasks,
        error => this.errorMessage = <any> error
      )
  }

  addTask(backlogitem) {
    console.log(this.backlogitemTask)
    this.backlogDataService.postTask(backlogitem._id, this.backlogitemTask, this.backlogitemTaskAuthor).subscribe(
      data => {
        this.getTasks(backlogitem._id)
      }
    )
  }

  addBacklogitem() {
    if ((!this.backlogitemTitle) || (!this.backlogitemAuthor) || (!this.backlogitemDescription) || (!this.backlogitemAssignedTo)) {
      console.log("BacklogTitle(" + this.backlogitemTitle + ") oder BacklogAuthor(" + this.backlogitemAuthor + ") oder BacklogDescription(" + this.backlogitemDescription + ") oder BacklogAssignedTo(" + this.backlogitemAssignedTo + ") sind leer: Component Backlog")
      this.backlogitemTitle = null
      this.backlogitemAuthor = null
      this.backlogitemDescription = null
      this.backlogitemAssignedTo = null
    }
    else {
      this.backlogDataService.postBacklogitemRestful(this.backlogitemTitle, this.backlogitemState, this.backlogitemAuthor, this.backlogitemDescription, this.backlogitemAssignedTo).subscribe(
        //data => this.postMyUserStoriesToServer = JSON.stringify(data),
        data => {
          this.loadBacklogitems()
        }
      );
      this.backlogitemTitle = null
      this.backlogitemAuthor = null
      this.backlogitemDescription = null
      this.backlogitemAssignedTo = null
    }
  }

  loadUserStories() {
    this.userStoryDataService.getUserStories()
      .subscribe(
        userstories => this.userstories = userstories,
        err => {
          console.log(err);
        });
  }

}
