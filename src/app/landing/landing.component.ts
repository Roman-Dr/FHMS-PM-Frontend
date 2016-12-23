import { Component, OnInit } from '@angular/core';
import {User} from "../_models/user";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [UserService]
})
export class LandingComponent{



  constructor() { }

  ngOnInit() {

}

}
