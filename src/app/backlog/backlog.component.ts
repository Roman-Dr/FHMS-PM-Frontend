import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Backlog} from './backlog';
import {BacklogDataService} from '../_services/backlog-data.service';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";
import {UserStoryDataService} from '../_services/user-story-data.service';
import {UserStory} from "../user-story/UserStory";

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.css'],
  providers: [BacklogDataService, UserStoryDataService]
})
export class BacklogComponent {


  constructor(private backlogDataService: BacklogDataService, private  userService: UserService, private userStoryDataService: UserStoryDataService) {
  }

  errorMessage: string;
  userstories: UserStory[];

  backlogitemTitle:string;
  backlogitemState:string;
  backlogitemAuthor:string;
  backlogitemDescription:string;

  backlogitems: Backlog[];
  users: User;

  removeBacklogitem(backlogitem){
    console.log("Component: "+backlogitem._id)
    this.backlogDataService.deleteBacklogitem(backlogitem._id).subscribe(
      data => {
        this.loadBacklogitems()
      }
    );
  }

  loadBacklogitems(){
    this.backlogDataService.getBacklogitems()
      .subscribe(
        backlogitems=>this.backlogitems=backlogitems,
        err => {console.log(err);
        });
  }

  ngOnInit(){
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

  addBacklogitem() {
    if((!this.backlogitemTitle)||(!this.backlogitemAuthor)||(!this.backlogitemDescription)){
      console.log("BacklogTitle("+this.backlogitemTitle+") oder BacklogAuthor("+this.backlogitemAuthor+") oder BacklogDescription("+this.backlogitemDescription+") sind leer: Component Backlog")
      this.backlogitemTitle=null
      this.backlogitemAuthor=null
      this.backlogitemDescription=null
    }
    else{
      console.log("1")
      this.backlogDataService.postBacklogitemRestful( this.backlogitemTitle,this.backlogitemState,this.backlogitemAuthor,this.backlogitemDescription).subscribe(
        //data => this.postMyUserStoriesToServer = JSON.stringify(data),
        data => {
          this.loadBacklogitems()
        }
      );
      this.backlogitemTitle=null
      this.backlogitemAuthor=null
      this.backlogitemDescription=null
    }
  }

  loadUserStories(){
    this.userStoryDataService.getUserStories()
      .subscribe(
        userstories=>this.userstories=userstories,
        err => {console.log(err);
        });
  }

}
