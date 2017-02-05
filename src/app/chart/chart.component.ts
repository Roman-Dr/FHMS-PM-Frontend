import {Component, OnInit} from '@angular/core';
import {SprintService} from "../_services/sprint.service";
import {Sprint} from "../_models/index";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [SprintService, DatePipe]
})
export class ChartComponent implements OnInit {

  sprints: Sprint[];
  selectedSprint: Sprint;
  errorMessage: string;

  // lineChart
  lineChartData: Array<any> = [
    {data: [55, 50, 45, 40, 35, 30, 25, 20], label: 'Demo Ideal'},
    {data: [55, 52, 35, 32, 30, 28, 26, 20], label: 'Demo Real'}
  ];
  lineChartLabels: Array<any> = ['12.01.2016', '13.01.2016', '14.01.2016', '15.01.2016', '16.01.2016', '17.01.2016', '18.01.2016', '19.01.2016'];
  lineChartOptions: any = {
    responsive: true
  };


  lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: '#FF1000',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }, {
      backgroundColor: 'rgba(255,255,255,0)',
      borderColor: '#3040FF',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
  ];
  lineChartLegend: boolean = true;
  lineChartType: string = 'line';


  constructor(private sprintService: SprintService) {
  }

  ngOnInit() {
    this.getSprints();
  }


  getSprints() {
    this.sprintService.getSprints()
      .subscribe(
        sprints => this.sprints = sprints,
        error => this.errorMessage = <any> error
      );
  }

  getSprintBurnDown(sprint) {
    this.selectedSprint = sprint;
    this.sprintService.getSprintBurndown(sprint._id)
      .subscribe(
        burnDown => this.setChartData(burnDown),
        error => this.errorMessage = <any> error
      );
  }


  setChartData(burnDown) {


    if (burnDown.idealPoints.length !== 0) {


      let idealPointsValueArray: Array<any> = [];
      let realityPointsValueArray: Array<any> = [];
      let idealPointsDateArray: Array<any> = [];

      for (let i = 0; i < burnDown.idealPoints.length; i++) {
        idealPointsValueArray.push(burnDown.idealPoints[i].value);
        realityPointsValueArray.push(burnDown.realityPoints[i].value);
        idealPointsDateArray.push(burnDown.idealPoints[i].dateFormatted);

      }
      this.lineChartData =
        [
          {
            data: idealPointsValueArray
            , label: 'Ideal'
          },
          {
            data: realityPointsValueArray
            , label: 'Real'
          }
        ];


      this.lineChartLabels = idealPointsDateArray;
      console.log(this.lineChartLabels);

    }
  }

  getBackgroundStyle(sprint) {
    if (sprint == this.selectedSprint) {
        return "#2c3e50";
      } else {
        return "";
      }
  }

  getFontStyle(sprint) {
    if (sprint == this.selectedSprint) {
      return "#ffffff";
    } else {
      return "";
    }
  }
}



