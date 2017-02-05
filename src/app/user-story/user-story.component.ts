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

  userStories: UserStory[];
  userStory: UserStory = new UserStory();

  authorId: string = sessionStorage.getItem("user_id");
  searchText: string;

  isBusy: boolean = false;
  isEditing: boolean = false;

  constructor(private userStoryDataService: UserStoryDataService) {

  }

  ngOnInit() {
    this.newUserStory();
    this.loadUserStories();
  }

  loadUserStories() {
    this.isBusy = true;
    this.userStoryDataService.getUserStories()
      .subscribe(
        userStories => this.userStories = userStories,
        err => {
          console.log(err);
        },
        () => this.isBusy = false);
  }

  getUserStories() {
    if (this.searchText) {
      return this.userStories.filter(x => x.toString().indexOf(this.searchText) > -1);
    } else {
      return this.userStories;
    }
  }

  onBeginEdit(userStory: UserStory) {
    this.isEditing = true;
    this.userStory = new UserStory(userStory);
  }

  removeUserStory(userstory) {
    this.isBusy = true;
    console.log("Component: " + userstory._id)
    this.userStoryDataService.deleteUserStory(userstory._id).subscribe(
      data => {
        this.loadUserStories()
      },
      err => console.log(err),
      () => this.isBusy = false
    );
  }
  toggleState(userStory: UserStory) {
    userStory.complete = !userStory.complete;
    this.onBeginEdit(userStory);
    this.addOrUpdateUserStory();
  }

  newUserStory() {
    this.userStory = new UserStory();
    this.userStory.authorId = this.authorId;
  }

  addOrUpdateUserStory() {
    if (this.isBusy) {
      return;
    }
    this.userStory.authorId = this.authorId;
    this.isBusy = true;
    if (this.isEditing) {
      this.userStoryDataService.updateUserStory(this.userStory).subscribe(
        x => {
          this.loadUserStories();
          this.newUserStory();
        },
        err => console.log(err),
        () => {
          this.isBusy = false;
          this.isEditing = false;
        }
      );
    }
    else {
      this.userStoryDataService.addUserStory(this.userStory).subscribe(
        x => {
          this.loadUserStories();
          this.newUserStory();
        },
        err => console.log(err),
        () => this.isBusy = false
      );
    }
  }

  aboutAddOrUpdateUserStory() {
    this.isEditing = false;
    this.isBusy = false;
    this.newUserStory();
  }
}
