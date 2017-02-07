import {Component, OnInit} from '@angular/core';
import {UserStoryDataService, BacklogDataService, SprintService, InitiativeService} from "../_services/index";
import {UserStory, Backlog, Sprint, Initiative} from "../_models/index";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [UserStoryDataService, BacklogDataService, SprintService, InitiativeService]
})
export class LandingComponent implements OnInit{


userStories: UserStory[];
backlogItems: Backlog[];
sprints: Sprint[];
initiatives: Initiative[];


  constructor(private userStoryService: UserStoryDataService,
              private backlogItemService: BacklogDataService,
              private sprintService: SprintService,
              private initiativeService: InitiativeService) { }

  ngOnInit() {
    this.loadBacklogitems();
    this.loadUserStories();
    this.loadSprints();
    this.loadInitiatives();

  }


  loadUserStories() {
    this.userStoryService.getUserStories()
      .subscribe(
        userStories => this.userStories = userStories
      )};

  loadBacklogitems() {
    this.backlogItemService.getBacklogitems()
      .subscribe(
        backlogItems => this.backlogItems = backlogItems

  )}

  loadSprints() {
    this.sprintService.getSprints()
      .subscribe(
        sprints => this.sprints = sprints
      )
  }

  loadInitiatives(){
    this.initiativeService.getInitiatives()
      .subscribe(
        initiatives => this.initiatives = initiatives
      )
  }



}
