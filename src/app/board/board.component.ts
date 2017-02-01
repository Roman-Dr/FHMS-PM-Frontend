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

  newItems: Array<Backlog> = [];
  approvedItems: Array<Backlog> = [];
  committedItems: Array<Backlog> = [];
  doneItems: Array<Backlog> = [];

  isBusy: boolean = false;

  constructor(private backlogDataService: BacklogDataService, private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
  }

  ngOnInit() {
    this.getBacklogitems();
  }


  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
    console.log('id: ' + el.id);
    console.log('target: ' + target.id);
    console.log('source: ' + source.id);
    this.isBusy = true;

    console.log(el.id + ': ' + source.id + '->' + target.id);

    this.backlogDataService.changeBacklogItemState(el.id, target.id).subscribe(() =>  this.isBusy = false);
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
