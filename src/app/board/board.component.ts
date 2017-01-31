import {Component, OnInit} from '@angular/core';
import {Backlog} from "../_models/index";
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

  newItems: Backlog[] = [];
  approvedItems: Backlog[] = [];
  committedItems: Backlog[] = [];
  doneItems: Backlog[] = [];

  draggedItem: Backlog;
  selectedState: string;





  constructor(private backlogDataService: BacklogDataService, private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe(value =>
      this.changeBacklogItemState(this.draggedItem)
    );
  }

  ngOnInit() {
    this.getBacklogitems();
  }




  getBacklogitems() {
    this.backlogDataService.getBacklogitems()
      .subscribe(
        items => {
          this.items = items;
          this.sortBacklogItems(this.items);
        },
        err => {
          console.log(err);
        });
  }

  changeBacklogItemState(backlog: Backlog){
    let editBacklog = backlog;
    editBacklog.state = this.selectedState;
    this.backlogDataService.updateBacklogItem(backlog._id, editBacklog)
      .subscribe(
        success => console.log("State of Backlog Item changed!")
      )
  }

  selectState(state: string){
    this.selectedState = state;
    console.log(this.selectedState);
  }

  dragBacklogItem(backlogItem: Backlog){
      this.draggedItem = backlogItem;
      console.log(this.draggedItem);
  }

  sortBacklogItems(items: Backlog[]) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].state == 'New') {
        this.newItems.push(items[i])
      }

      if (items[i].state == 'Approved') {
        this.approvedItems.push(items[i])
      }

      if (items[i].state == 'Committed') {
        this.committedItems.push(items[i])
      }

      if (items[i].state == 'Done') {
        this.doneItems.push(items[i])
      }

      console.log(this.newItems);
    }
  }





}
