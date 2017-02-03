import { Component, OnInit } from '@angular/core';
import { InitiativeService } from '../_services/index';
import {Initiative} from "../_models/initiative";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
  providers: [InitiativeService, DatePipe]
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

  constructor(private initiativeService: InitiativeService, private datePipe: DatePipe) { }

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
        error => this.errorMessage = <any> error
      );
  }

  deleteInitiative(){
    this.initiativeService.deleteInitiative(this.selectedInitiative._id)
      .subscribe(
        success => this.getInitiatives(),
        error => this.errorMessage = <any> error
      );
  }

  isOpen(initiative: Initiative): boolean{
    var dateNow = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    var iDate = this.datePipe.transform(initiative.startDate, 'yyyy-MM-dd');

    if(iDate > dateNow){
      return true;
    }else{
      return false;
    }
  }

  changeColor(initiative: Initiative): string{
    if(initiative == this.selectedInitiative){
      return "#10515f";
    }else if(this.isOpen(initiative)){
      return "#07a702";
    }else{
      return "#1f9eba";
    }
  }

}
