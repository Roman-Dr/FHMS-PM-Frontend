import { Component, OnInit } from '@angular/core';
import { InitiativeService } from '../_services/index';
import {Initiative} from "../_models/initiative";
import {DatePipe} from "@angular/common";
import {Feature} from "../_models/feature";

@Component({
  selector: 'app-roadmap',
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
  providers: [InitiativeService, DatePipe]
})
export class RoadmapComponent implements OnInit {

  initiatives: Initiative[];
  selectedInitiative: Initiative;
  editMode: boolean;
  from: Date;
  to: Date;

  features: Feature[];

  initiativeTitle: string;
  initiativeGoal: string;
  initiativeDescription: string;
  initiativeStartDate: Date;
  initiativeEndDate: Date;
  featureTitle: string;

  errorMessage: string;

  constructor(private initiativeService: InitiativeService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getInitiatives();
  }

  getInitiatives(){
    if(this.from == undefined || this.to == undefined){
      this.getAllInitiatives();
    }else{
      this.filter();
    }
  }

  onSelect(initiative: Initiative): void{
    this.selectedInitiative = initiative;
    this.features = initiative.features;
  }

  edit(){
    this.editMode = !this.editMode;
    console.log(this.editMode);
  }

  getAllInitiatives(){
    this.initiativeService.getInitiatives()
      .subscribe(
        initiatives => {
          this.initiatives = initiatives;
          if(this.initiatives) {
            if(this.selectedInitiative == null){
              this.selectedInitiative = this.initiatives[0];
              this.features = this.selectedInitiative.features;
            }
          }
        }
      )
  }

  filter(){
    this.initiativeService.getFilteredInitiatives(this.from, this.to)
      .subscribe(
        initiatives => {
          this.initiatives = initiatives;
          if(this.initiatives) {
            if(this.selectedInitiative == null){
              this.selectedInitiative = this.initiatives[0];
              this.features = this.selectedInitiative.features;
            }
          }
        }
      )
  }

  addInitiative(){
    this.initiativeService.addInitiative(this.initiativeTitle, this.initiativeStartDate, this.initiativeEndDate, this.initiativeDescription, this.initiativeGoal)
      .subscribe(
        success => this.getInitiatives(),
        error => this.errorMessage = <any> error
      );
    this.initiativeTitle = null;
    this.initiativeGoal = null;
    this.initiativeDescription = null;
    this.initiativeStartDate = null;
    this.initiativeEndDate = null;
  }

  updateInitiative(){
    this.initiativeService.updateInitiative(this.selectedInitiative._id, this.selectedInitiative.title, this.selectedInitiative.startDate, this.selectedInitiative.endDate, this.selectedInitiative.description, this.selectedInitiative.goal)
      .subscribe(
        success => this.getInitiatives(),
        error => this.errorMessage = <any> error
      );
    this.editMode = false;
    this.featureTitle = null;
  }

  deleteInitiative(){
    this.initiativeService.deleteInitiative(this.selectedInitiative._id)
      .subscribe(
        success => this.getInitiatives(),
        error => this.errorMessage = <any> error
      );
  }

  getFeatures(){
    this.initiativeService.getFeatures(this.selectedInitiative._id)
      .subscribe(
        features => {
          this.features = features;
        }
      )
  }

  addFeature(){
    this.initiativeService.addFeature(this.selectedInitiative._id, this.featureTitle)
      .subscribe(
        success => this.getFeatures(),
        error => this.errorMessage = <any> error
      );
    this.featureTitle = null;
  }

  deleteFeature(index: number){
    this.initiativeService.deleteFeature(this.selectedInitiative._id, this.features[index]._id)
      .subscribe(
        success => this.getFeatures(),
        error => this.errorMessage = <any> error
      );
  }

  isOpen(initiative: Initiative): boolean{
    //var dateNow = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
   //var iniStartDate = this.datePipe.transform(initiative.startDate, 'yyyy-MM-dd');

    if(initiative.startDate > new Date()){
      return true;
    }else{
      return false;
    }
  }

  isFinished(initiative: Initiative): boolean{
    //var dateNow = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
    //var iniEndDate = this.datePipe.transform(initiative.endDate, 'yyyy-MM-dd');

    if(initiative.endDate < new Date()){
      return true;
    }else{
      return false;
    }
  }

  changeColor(initiative: Initiative): string{
    if(initiative._id == this.selectedInitiative._id){
      return "#696969";
    }else if(this.isOpen(initiative)){
      return "#a70300";
    }else if(this.isFinished(initiative)){
      return "#1cc500";
    }else{
      return "#ffd20e";
    }
  }

}
