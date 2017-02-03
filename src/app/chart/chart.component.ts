import { Component, OnInit } from '@angular/core';
import {SprintService} from "../_services/sprint.service";
import {Sprint} from "../_models/sprint";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [SprintService, DatePipe]
})
export class ChartComponent implements OnInit  {

  sprints: Sprint[];
  selectedSprint: Sprint;
  errorMessage: string;
  today: string;

  // lineChart
  lineChartData:Array<any> = [
    {data: [55, 50, 45, 40, 35, 30, 25, 20], label: 'Demo Ideal'},
    {data: [55, 52, 35, 32, 30, 28, 26, 20], label: 'Demo Real'}
  ];
  lineChartLabels:Array<any> = ['12.01.2016', '13.01.2016', '14.01.2016', '15.01.2016', '16.01.2016', '17.01.2016', '18.01.2016', '19.01.2016'];
  lineChartOptions:any = {
    responsive: true
  };


  lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  lineChartLegend:boolean = true;
  lineChartType:string = 'line';




  constructor(private sprintService: SprintService, private datePipe: DatePipe) {
    this.today = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
  }

  ngOnInit() {
    this.getSprints();
  }


  createTestData(){
    this.sprintService.createSprintBurnDownMeasure(this.selectedSprint._id, new Date('2016-12-01'), 50).subscribe(success => console.log("yes!"));
    this.sprintService.createSprintBurnDownMeasure(this.selectedSprint._id, new Date('2016-12-02'), 45).subscribe(success => console.log("yes!"));
    this.sprintService.createSprintBurnDownMeasure(this.selectedSprint._id, new Date('2016-12-03'), 40).subscribe(success => console.log("yes!"));
    this.sprintService.createSprintBurnDownMeasure(this.selectedSprint._id, new Date('2016-12-04'), 35).subscribe(success => console.log("yes!"));
    this.sprintService.createSprintBurnDownMeasure(this.selectedSprint._id, new Date('2016-12-05'), 30).subscribe(success => console.log("yes!"));
  }


  getSprints() {
    this.sprintService.getSprints()
      .subscribe(
        sprints => this.sprints = sprints,
        error => this.errorMessage = <any> error
      )
  }

  onSelect(sprint) {
    this.selectedSprint = sprint;
    console.log(this.selectedSprint);
    this.setChartData();
  }


  setChartData(){
    if (this.selectedSprint.sprintBurnDownMeasures.length !== 0) {
    this.lineChartData = [
      {data: this.selectedSprint.sprintBurnDownMeasures[0].remainingWorkTillNow , label: 'Ideal'},
      {data: this.selectedSprint.sprintBurnDownMeasures[1].remainingWorkTillNow, label: 'Real'}
    ];
    this.lineChartLabels = this.selectedSprint.sprintBurnDownMeasures[0].dateOfMeasurement;
    }
  }

  checkStatus(sprint){
    if(sprint.endDate >= this.today) {return true;}
    else {return false};
  }


  // events
  chartClicked(e:any):void {
    console.log(e);
  }

  chartHovered(e:any):void {
    console.log(e);
  }
}



