import {Component, OnInit} from '@angular/core';
import {Backlog, ItemType} from "../_models/index";
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


  constructor(private backlogDataService: BacklogDataService, private dragulaService: DragulaService) {

  }

  ngOnInit() {
    this.getBacklogitems();
    this.sortBacklogItems();
  }


  getBacklogitems() {
    this.backlogDataService.getBacklogitems()
      .subscribe(
        items => this.items = items,
        err => {
          console.log(err);
        });
    this.sortBacklogItems();
  }

  sortBacklogItems() {
    let items = this.items;

    console.log(items);
    for (let i = 0; i <= items.length; i++) {

      console.log(items[i]);
      if (items[i].itemType === ItemType.New) {
        this.newItems.push(items[i])
      }

      if (items[i].itemType === ItemType.Approved) {
        this.approvedItems.push(items[i])
      }

      if (items[i].itemType === ItemType.Committed) {
        this.committedItems.push(items[i])
      }

      if (items[i].itemType === ItemType.Done) {
        this.doneItems.push(items[i])
      }
    }
  }


}
