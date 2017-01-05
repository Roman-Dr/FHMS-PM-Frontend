import { Component, OnInit, Input, OnChanges } from '@angular/core';
import {UserStory} from './UserStory';
import {UserStoryDataService} from '../_services/user-story-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-UserStory',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css'],
  providers: [UserStoryDataService]
})
export class UserStoryComponent {


  postMyUserStoriesToServer:string;

  userStoryName:string;
  userStoryComplete:boolean = false;
  userStoryAuthor: string;
  userStoryTimeStamp:  Date=new Date();

  constructor(private userStoryDataService: UserStoryDataService) {
  }

  userstories: UserStory[];

  loadUserStories(){
    this.userStoryDataService.getUserStories()
      .subscribe(
        userstories=>this.userstories=userstories,
        err => {console.log(err);
    });
  }

  ngOnInit(){
    this.loadUserStories()
  }

  addUserStory() {
      this.userStoryDataService.postUserStoryRestful( this.userStoryName,this.userStoryComplete,this.userStoryAuthor,this.userStoryTimeStamp).subscribe(
        data => this.postMyUserStoriesToServer = JSON.stringify(data),
        error => console.log("Error HTTTP POST SERVICE"),
        () => console.log("Job Done Post!")

      )
        ;
  }
/*
  toggleUserStoryComplete(userStory) {
    this.userStoryDataService.toggleUserStoryComplete(userStory);
  }

  removeUserStory(userStory) {
    this.userStoryDataService.deleteUserStoryById(userStory.id);
  }

  get userStories() {
    console.log("Components: userStories()");
    return this.userStoryDataService.getAllUserStories();
  }
*/
}
