import {Component, OnInit} from '@angular/core';
import {UserStoryDataService, BacklogDataService, SprintService, InitiativeService} from "../_services/index";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [UserStoryDataService, BacklogDataService, SprintService, InitiativeService]
})
export class LandingComponent implements OnInit{





  constructor(private userStoryService: UserStoryDataService,
              private backlogItemService: BacklogDataService,
              private sprintService: SprintService,
              private initiativeService: InitiativeService) { }

  ngOnInit() {

  }






}
