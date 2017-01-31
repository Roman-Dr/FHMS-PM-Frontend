import {Component} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Backlog, Sprint} from '../_models/index';
import {BacklogDataService, SprintService} from '../_services/index';

@Component({
  selector: 'app-backlogItems',
  templateUrl: 'backlogItems.component.html',
  styleUrls: ['backlogItems.component.css'],
  providers: [BacklogDataService, SprintService]
})
export class BacklogItemsComponent {

  displayName: string = "Backlogeinträge";
  backlogitems: Backlog[] = [];

  private markedForDeletionBacklogItem: Backlog;

  private sprint: Sprint;
  private sprintId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private backlogDataService: BacklogDataService,
              private sprintService: SprintService,
              private router: Router) {
  }


  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {

      this.sprintId = params['sprintId'];
      if(this.sprintId) {
        this.sprintService.getSprint(this.sprintId).subscribe(x => this.sprint = x);
      } else {
        this.sprint = null;
      }

      this.loadBacklogitems();
    });
  }

  markAsDeletedBacklogitem(backlogitem: Backlog) {
    this.markedForDeletionBacklogItem = backlogitem;
  }

  remove() {
    if (this.markedForDeletionBacklogItem) {
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
    this.router.navigate(['backlog', 'newBacklogItem']);
  }

  newBug() {
    this.router.navigate(['backlog', 'newBug']);
  }

  openBacklogItem(id: string) {
    this.router.navigate(['backlog', id]);
  }

  loadBacklogitems() {
    this.backlogDataService.getBacklogitems()
      .subscribe(
        backlogitems => {
          if(this.sprintId) {
            this.backlogitems = backlogitems.filter(x => x.sprintId == this.sprintId);
          } else {
            this.backlogitems = backlogitems;
          }
        },
        err => {
          console.log(err);
        });
  }
}
