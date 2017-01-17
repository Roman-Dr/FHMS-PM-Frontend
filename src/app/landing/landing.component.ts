import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../_services/project.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [ProjectService]
})
export class LandingComponent implements OnInit{



  constructor() { }

  ngOnInit() {

  }






}
