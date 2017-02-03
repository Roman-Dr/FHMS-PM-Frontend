import { Component, OnInit } from '@angular/core';
import { InitiativeService } from '../_services/index';
import {Initiative} from "../_models/initiative";

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
  providers: [InitiativeService]
})
export class RoadmapComponent implements OnInit {

  initiatives: Initiative[];
  selectedInitiative: Initiative;

  initiativeTitle: string;
  initiativeGoal: string;
  initiativeDescription: string;
  initiativeStartDate: Date;
  initiativeEndDate: Date;

  errorMessage: string;

  constructor(private initiativeService: InitiativeService) { }

  ngOnInit() {
    this.getInitiatives();
  }

  getInitiatives(){
    this.initiativeService.getInitiatives()
      .subscribe(
        initiatives => {
          this.initiatives = initiatives;
          if(this.initiatives) {
            this.selectedInitiative = this.initiatives[0];
          }
        }
      )
  }

  onSelect(initiative: Initiative): void{
    this.selectedInitiative = initiative;
  }

  addInitiative(){
    this.initiativeService.addInitiative(this.initiativeTitle, this.initiativeStartDate, this.initiativeEndDate, this.initiativeDescription, this.initiativeGoal)
      .subscribe(
        success => this.getInitiatives(),
        error => this.errorMessage= <any> error
      );
  }

}
