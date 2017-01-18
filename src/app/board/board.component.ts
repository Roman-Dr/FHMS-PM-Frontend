import { Component, OnInit } from '@angular/core';
import {Backlog} from "../_models/backlog";
import {BacklogDataService} from "../_services/backlog-data.service";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BacklogDataService]
})
export class BoardComponent implements OnInit {
  backlogitems: Backlog[];

  constructor(private backlogDataService: BacklogDataService) {

  }

  ngOnInit() {
    this.getBacklogitems();

  }


  getBacklogitems() {
    this.backlogDataService.getBacklogitems()
      .subscribe(
        backlogitems => this.backlogitems = backlogitems,
        err => {
          console.log(err);
        });
  }


}
