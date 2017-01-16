import { Component, OnInit } from '@angular/core';
import {Backlog} from "../_models/backlog";
import {BacklogDataService} from "../_services/backlog-data.service";
import {DragulaService} from "ng2-dragula";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [BacklogDataService]
})
export class BoardComponent implements OnInit {
  backlogitems: Backlog[];

  constructor(private dragulaService: DragulaService, private backlogDataService: BacklogDataService) {

  }

  ngOnInit() {
    this.getBacklogitems();
  }


  getBacklogitems(){
    this.backlogDataService.getBacklogitems()
      .subscribe(
        backlogitems=>this.backlogitems=backlogitems,
        err => {console.log(err);
        });
  }
}
