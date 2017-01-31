import { Component, OnInit } from '@angular/core';
import {Backlog} from "../_models/backlog";
import {BacklogDataService} from "../_services/backlog-data.service";
import {DragulaService, dragula} from "ng2-dragula";


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BacklogDataService]
})
export class BoardComponent implements OnInit {
  items: Backlog[];

  newItems: Backlog[];
  approvedItems: Backlog[];
  committedItems: Backlog[];
  doneItems: Backlog[];

  states = [
    'New', 'Approved', 'Committed', 'Done', 'Removed'
  ];


  constructor(private backlogDataService: BacklogDataService, private dragulaService: DragulaService) {

  }

  ngOnInit() {
    this.getBacklogitems();

  }


  getBacklogitems() {
    this.backlogDataService.getBacklogitems()
      .subscribe(
        items => this.items = items,
        err => {
          console.log(err);
        });
  }







}
