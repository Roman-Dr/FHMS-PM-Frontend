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

  userStoryName: string;
  userStoryComplete: string = "false";
  userStoryAuthor: string;
  errorMessage: string;


  constructor(private userStoryDataService: UserStoryDataService, private userService: UserService) {

  }


  toggleUserstory(userstoryObject, userstorystate) {
    /*Toggelt den userstorystate, der als String eingereicht wird => einfache Lösung*/
    if (userstorystate == "true") userstorystate == "false"
    else userstorystate == "true"

    this.userStoryDataService.toggleUserStory(userstoryObject, userstorystate)
      .subscribe(
        success =>
          this.loadUserStories()
      );
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
    this.userStoryAuthor = sessionStorage.getItem("user_id")
    if ((!this.userStoryAuthor) || (!this.userStoryName)) {
      console.log("UserStoryName(" + this.userStoryName + ") oder UserStoryAuthor(" + this.userStoryAuthor + ") sind leer: Component")
      this.userStoryAuthor = null
      this.userStoryName = null
    }
    else {
      console.log("1")
      this.userStoryDataService.postUserStoryRestful(this.userStoryName, this.userStoryComplete, this.userStoryAuthor).subscribe(
        //data => this.postMyUserStoriesToServer = JSON.stringify(data),
        data => {
          this.loadUserStories()
        }
      );
      this.userStoryAuthor = null
      this.userStoryName = null
    }

  }
}
