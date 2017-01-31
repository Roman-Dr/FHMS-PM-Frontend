import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {Backlog} from '../_models/index';
import {BacklogDataService} from '../_services/index';

@Component({
  selector: 'app-backlogItems',
  templateUrl: './backlogItems.component.html',
  styleUrls: ['./backlogItems.component.css']
})
export class BacklogItemsComponent {


  constructor(
    private backlogDataService: BacklogDataService,
    private router: Router) {
  }

  displayName: string = "Backlogeinträge";
  errorMessage: string;
  backlogitems: Backlog[] = [];

  private markedForDeletionBacklogItem: Backlog;

  markAsDeletedBacklogitem(backlogitem: Backlog) {
    this.markedForDeletionBacklogItem = backlogitem;
  }
  remove() {
    if(this.markedForDeletionBacklogItem) {
      this.backlogDataService.deleteBacklogitem(this.markedForDeletionBacklogItem._id).subscribe(
        data => {
          this.loadBacklogitems();
        }
      );
    }
  }
  cancelDeletion() {
    this.markedForDeletionBacklogItem = null;
  }

  newBacklogItem() {
    this.router.navigate(['backlog', 'new']);
  }
  openBacklogItem(id: string) {
    this.router.navigate(['backlog', id]);
  }

  loadBacklogitems() {
    this.backlogDataService.getBacklogitems()
      .subscribe(
        backlogitems => this.backlogitems = backlogitems,
        err => {
          console.log(err);
        });
  }

  ngOnInit() {
    this.loadBacklogitems();
  }
}
