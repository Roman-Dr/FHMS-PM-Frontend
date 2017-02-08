/**
 * Created by David on 01.02.2017.
 */
import {Location} from '@angular/common';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {PlanningPokerService, UserService, ProjectService, BacklogDataService} from "../_services/index";

import {PlanningPoker, PlanningPokerRound, PlanningPokerRoundVote, Project, User, Backlog} from "../_models/index";

declare var jQuery:any;

@Component({
  selector: 'app-planningPoker',
  templateUrl: './planningPoker.component.html',
  providers: [PlanningPokerService, BacklogDataService]
})
export class PlanningPokerComponent implements OnInit, OnDestroy {

  displayName: string = "Planning Poker";

  project: Project;
  user: User;

  isBusy: boolean = false;

  isNew: boolean = false;
  isWaitingForSubmit: boolean = false;
  isWaitingForParticipants: boolean = false;
  newPlanningPoker: PlanningPoker;
  newPlanningPokerTimer;

  isSearching: boolean = false;
  isWaitingForStart: boolean = false;
  selectedPlanningPoker: PlanningPoker;
  availablePlanningPokers: Array<PlanningPoker> = [];
  searchPlanningPokerTimer;

  backlogItems: Array<Backlog> = [];

  constructor(private planningPokerService: PlanningPokerService,
              private userService: UserService,
              private projectService: ProjectService,
              private backlogItemService: BacklogDataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    this.projectService.getProject(sessionStorage.getItem("project_id")).subscribe(x => this.project = x);
    this.userService.getUser(sessionStorage.getItem("user_id")).subscribe(x => this.user = x);
  }
  ngOnDestroy() {
    this.stopTimers();
    if(this.isNew && this.newPlanningPoker && this.newPlanningPoker.isActive) {
      this.abortNewPlanningPoker();
    }
  }

  stopTimers() {
    if(this.newPlanningPokerTimer) {
      clearInterval(this.newPlanningPokerTimer);
    }
    if(this.searchPlanningPokerTimer) {
      clearInterval(this.searchPlanningPokerTimer);
    }
  }

  // Startet ein neues Planungspoker
  startNew() {
    if(this.isNew && this.newPlanningPoker && this.newPlanningPoker.isActive) {
      this.abortNewPlanningPoker();
    }

    this.isNew = true;

    this.backlogItemService.getBacklogitems().subscribe(x => {
      this.isWaitingForSubmit = true;
      this.backlogItems = x.filter(y => y.state == "New" || y.state == "Approved");
      this.newPlanningPoker = new PlanningPoker();
      this.newPlanningPoker.moderator = this.user;
      this.newPlanningPoker.project = this.project;
    });

  }
  // Bestätige Zuordnung zum Item -> starte Timer für Teilnehmer
  onBacklogItemSelected(id) {
    this.isWaitingForSubmit = false;
    this.isWaitingForParticipants = true;
    console.log("BacklogItem selected: " + id);

    var backlogItem = this.backlogItems.find(x => x._id == id);
    if(backlogItem) {
      this.newPlanningPoker.item = backlogItem;
      this.newPlanningPoker.isActive = true;
      this.planningPokerService.addPlanningPoker(this.newPlanningPoker)
        .subscribe(item => {
          console.log("PP: "+ JSON.stringify(item));

          this.newPlanningPoker._id = item._id;
          this.newPlanningPokerTimer = window.setInterval(()=> {
            this.planningPokerService.getPlanningPoker(this.newPlanningPoker._id)
              .subscribe(currentPlanningPoker => {
                this.newPlanningPoker.participants = currentPlanningPoker.participants;
              });
          }, 5000); // Alle 5 Sekunden
        });

    }
  }
  // Vollständiges Planungspoker
  acceptParticipants() {
    this.isWaitingForParticipants = false;
    this.isNew = false;

    this.newPlanningPoker.isStarted = true;

    // UPDATE PP
    this.planningPokerService.updatePlanningPoker(this.newPlanningPoker)
      .subscribe(x => {
        this.stopTimers();
        // TODO?
        console.log(JSON.stringify(x));

        this.router.navigate(['planningPoker', 'game', this.newPlanningPoker._id]);
      });
  }
  abortNewPlanningPoker() {
    console.log("Abort PP");
    this.stopTimers();

    this.planningPokerService.removePlanningPoker(this.newPlanningPoker._id)
      .subscribe(x => {
        this.isNew = false;
        this.isWaitingForParticipants = false;
        this.isWaitingForSubmit = false;
      });
  }

  // An einem aktiven Planungspoker teilnehmen
  startParticipate() {
    this.isSearching = true;
    this.planningPokerService.getActivePlanningPokers().subscribe(x => this.availablePlanningPokers = x);
  }
  // Entscheidung getroffen
  participate() {
    if(this.selectedPlanningPoker) {
      this.planningPokerService.participate(this.user._id, this.selectedPlanningPoker)
        .subscribe(x => {
          console.log("Participate: " + JSON.stringify(x));
          if(x) {
            this.isSearching = false;
            this.isWaitingForStart = true;

            // SUCCESS
            this.searchPlanningPokerTimer = window.setInterval(()=> {
              this.planningPokerService.getPlanningPoker(this.selectedPlanningPoker._id).subscribe(y => {
                  this.selectedPlanningPoker.isStarted = y.isStarted;
                  if (this.selectedPlanningPoker.isStarted) {
                    this.isSearching = false;
                    this.isWaitingForStart = false;

                    this.stopTimers();
                    // Workaround: Modal darf sich erst nach dem Start schließen
                    jQuery("#modalSearchingPlanningPoker").modal("hide");

                    window.setTimeout(() => {
                      this.router.navigate(['planningPoker', 'game', this.selectedPlanningPoker._id]);
                    }, 2000);
                  }
              });
            }, 5000);
            console.log("Waiting for start...");
          }
        });
    }
  }
  onSelectPlanningPoker(planningPoker: PlanningPoker) {
    console.log("PP select: " + JSON.stringify(planningPoker));
    this.selectedPlanningPoker = planningPoker;

  }
  abortParticipation() {
    this.stopTimers();
  }
}
