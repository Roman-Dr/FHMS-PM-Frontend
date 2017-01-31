import { Component, OnInit } from '@angular/core';
import {Backlog, ItemState} from "../_models/index";
import {BacklogDataService} from "../_services/index";
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

  sortBacklogItems(items: Backlog[]) {
    for (let i = 0; i <= this.items.length; i++) {
      if (this.items[i].state === ItemState.New) {
        this.newItems.push(this.items[i])
      }

      if (this.items[i].state === ItemState.Approved) {
        this.approvedItems.push(this.items[i])
      }

      if (this.items[i].state === ItemState.Committed) {
        this.committedItems.push(this.items[i])
      }

      if (this.items[i].state === ItemState.Done) {
        this.doneItems.push(this.items[i])
      }
    }

  }





}
