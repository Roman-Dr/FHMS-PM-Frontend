import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {UserStory} from '../_models/UserStory';
import {UserStoryDataService} from '../_services/user-story-data.service';
import {Observable} from 'rxjs/Observable';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-UserStory',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css'],
  providers: [UserStoryDataService]
})

export class UserStoryComponent {

  users: User[] = [];
  userstories: UserStory[];

  author: string = sessionStorage.getItem("user_id");
  status: string = "false";
  userStory: string;
  errorMessage: string;
  searchText: string;


  constructor(private userStoryDataService: UserStoryDataService, private userService: UserService) {

  }


  editUserstory(userstory_id, title, state, author) {
    this.userStoryDataService.editUserstory(userstory_id, title, state, author)
      .subscribe(
        success =>
          this.loadUserStories()
      );
  }

  removeUserStory(userstory) {
    console.log("Component: " + userstory._id)
    this.userStoryDataService.deleteUserStory(userstory._id).subscribe(
      data => {
        this.loadUserStories()
      }
    );
  }

  loadUserStories() {
    this.userStoryDataService.getUserStories()
      .subscribe(
        userstories => this.userstories = userstories,
        err => {
          console.log(err);
        });
  }

  ngOnInit() {
    this.loadUserStories()
    this.getUsers()
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        users => this.users = users,
        error => this.errorMessage = <any> error
      )
  }

  addUserStory() {
    this.userStoryDataService.postUserStoryRestful(this.userStory, this.status, this.author).subscribe(
      //data => this.postMyUserStoriesToServer = JSON.stringify(data),
      data => {
        this.loadUserStories()
      }
    );
    this.userStory = ''
    this.author = ''
  }

  getUserStories() {
    if(this.searchText) {
      return this.userstories.filter(x => x.toString().indexOf(this.searchText) > -1);
    } else {
      return this.userstories;
    }
  }

}
