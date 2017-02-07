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
  infoMessage: string;
  info: boolean;

  constructor(private initiativeService: InitiativeService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.getInitiatives();
    this.info = false;
  }

  getInitiatives(){
    if(this.from == undefined || this.to == undefined || this.from.toString().length == 0 || this.to.toString().length == 0){
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
    if(this.initiativeTitle == undefined || this.initiativeStartDate == undefined || this.initiativeEndDate == undefined){
      this.infoMessage = "Es sind nicht alle Pflichtfelder gesetzt!";
      this.info = true;
    }else{
      this.initiativeService.addInitiative(this.initiativeTitle, this.initiativeStartDate, this.initiativeEndDate, this.initiativeDescription, this.initiativeGoal)
        .subscribe(
          success => this.getInitiatives(),
          error => this.errorMessage = <any> error
        );
      this.initiativeTitle = undefined;
      this.initiativeGoal = undefined;
      this.initiativeDescription = undefined;
      this.initiativeStartDate = undefined;
      this.initiativeEndDate = undefined;
      this.infoMessage = "Die Initiative wurde angelegt!";
      this.info = true;
      this.getInitiatives();
    }
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

    if(new Date(initiative.startDate).getTime() > new Date().getTime()){
      return true;
    }else{
      return false;
    }
  }

  isFinished(initiative: Initiative): boolean{

    if(new Date(initiative.endDate).getTime() < new Date().getTime()){
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

  disableInfo(){
    this.info = false;
  }

}
