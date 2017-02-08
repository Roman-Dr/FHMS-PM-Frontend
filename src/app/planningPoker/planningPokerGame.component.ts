/**
 * Created by David on 01.02.2017.
 */
import {Location} from '@angular/common';
import {Component, OnInit, OnDestroy, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {PlanningPokerService, PlanningPokerGameService, UserService, ProjectService, BacklogDataService} from "../_services/index";

import {PlanningPoker, PlanningPokerRound, PlanningPokerRoundVote, Project, User, Backlog} from "../_models/index";

@Component({
  selector: 'app-planningPokerGame',
  templateUrl: './planningPokerGame.component.html',
  providers: [PlanningPokerService, PlanningPokerGameService, BacklogDataService]
})
export class PlanningPokerGameComponent implements OnInit, OnDestroy {

  displayName: string = "Planning Poker";

  userId: string;
  projectId: string;

  planningPoker: PlanningPoker;
  planningPokerId: string;

  moderator: User;

  activeRound: PlanningPokerRound;
  activeVote: PlanningPokerRoundVote;
  acceptedVote: PlanningPokerRoundVote;

  inputVoteEffort: number;
  inputVoteReason: string;

  viewState: ViewState = ViewState.WaitingForRound;
  ViewStates: typeof ViewState = ViewState;

  isRefreshingState: boolean;
  isModerator: boolean;

  private refreshStateTimer;

  constructor(private planningPokerService: PlanningPokerService,
              private planningPokerGameService: PlanningPokerGameService,
              private userService: UserService,
              private projectService: ProjectService,
              private backlogItemService: BacklogDataService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    sessionStorage.setItem("navigation_lock", "Planning Poker Game");
    this.userId = sessionStorage.getItem("user_id");
    this.projectId = sessionStorage.getItem("project_id");

    this.activatedRoute.params.subscribe((params: Params) => {
      this.planningPokerId = params['planningPokerId'];
      console.log('planningPokerId: ' + this.planningPokerId);

      this.planningPokerService.getPlanningPoker(this.planningPokerId).subscribe(x => {
        this.planningPoker = x;

        console.log("Game "+ JSON.stringify(this.planningPoker));
        this.isModerator = this.planningPoker.moderator._id == this.userId;

        // Timer wird alle 3 Sekunden aufgerufen
        this.refreshStateTimer = window.setInterval(()=>{
          if(!this.isRefreshingState) {
            this.refreshState();
          }
        }, 3000);
      });
    });
  }
  ngOnDestroy() {
    this.stopTimers();
  }

  stopTimers() {
    if(this.refreshStateTimer) {
      clearInterval(this.refreshStateTimer);
    }
    sessionStorage.removeItem("navigation_lock");
  }

  // Abfrage des aktuellen Zustands der aktuellen Phase
  refreshState() {
    this.isRefreshingState = true;
    console.log("INVOKED: Refresh state");
    try  {
      switch (this.viewState) {
        case ViewState.WaitingForRound:
          if(!this.isModerator) {
            // Prüfen, ob eine neue Runde erstellt wurde
            this.planningPokerGameService.getActiveRound(this.planningPokerId).subscribe(x => {
              if(x) {
                this.activeRound = x;
                if(this.activeRound.state == "Pending") {
                  this.setViewState(ViewState.Vote);
                }
              }
            });
          }
          break;
        case ViewState.Vote:
          if(this.isModerator) {
            // Haben alle ihre Stimme abgegeben?
            this.planningPokerGameService.getActiveRound(this.planningPokerId).subscribe(x => {
              if(x) {
                this.activeRound = x;
                if(this.activeRound.votesCount == this.planningPoker.participants.length) {
                  this.setViewState(ViewState.Decision);
                }
              }
            });
          } else {
            // Nichts prüfen
          }
          break;
        case ViewState.Decision:
          // Prüfen, ob ein Konsens gefunden wurde oder ob eine neue Runde erforderlich ist
          if(!this.isModerator) {
            // Rufe neue Daten ab, solange nicht alle ihre Stimme abgegeben haben
            this.planningPokerGameService.getActiveRound(this.planningPokerId).subscribe(x => {
              if(x) {
                if(x.state == "Accepted") {
                  this.setViewState(ViewState.End);
                } else if(x.state == "Rejected" || this.activeRound.number != x.number) {
                  this.setViewState(ViewState.WaitingForRound);
                }
                this.activeRound = x;
              }
            });
          }
          break;
        case ViewState.End:
          this.stopTimers();
          break;
      }
    }
    finally  {
      this.isRefreshingState = false;
    }
  }

  canNextPhase() {
    console.log("INVOKED: Can next phase");
    // Prüfungen, ob der Nutzer die aktuelle Phase bestätigen kann.
    switch (this.viewState) {
      case ViewState.WaitingForRound:
        if(this.isModerator) {
          return true;
        }
        else {
          return false;
        }
      case ViewState.Vote:
        if(this.isModerator) {
          return false;
        }
        else {
          return this.inputVoteEffort > 0 && this.inputVoteReason.length > 0;
        }
      case ViewState.Decision:
        if(this.isModerator) {
          return true;
        }
        else {
          return false;
        }
      case ViewState.End:
        return true;
    }
  }

  setViewState(viewState: ViewState) {
    this.viewState = viewState;
    this.canNextPhase();
  }

  nextPhase() {
    console.log("INVOKED: Next state");

    switch (this.viewState) {
      case ViewState.WaitingForRound:
        if(this.isModerator) {
          // Erstelle neue Runde
          this.planningPokerGameService.createNewRound(this.planningPokerId).subscribe(x => {
            this.activeRound = x;
            this.setViewState(ViewState.Vote);
          });
        } else {

        }
        break;
      case ViewState.Vote:
        if(!this.isModerator) {
          // Stimme abgeben
          this.planningPokerGameService
            .vote(this.planningPokerId, this.activeRound._id, this.userId, this.inputVoteEffort, this.inputVoteReason)
            .subscribe(x => {
              this.activeVote = x;
              this.setViewState(ViewState.Decision);
              this.inputVoteReason = "";
              this.inputVoteEffort = 0;
            });
        }
        break;
      case ViewState.Decision:
        if(this.isModerator) {
          if(this.acceptedVote) {
            // Ende des Planungspokers
            this.planningPokerGameService
              .finishRound(this.planningPokerId, this.activeRound._id, "Accepted", this.acceptedVote)
              .subscribe(x => {
                this.activeRound = x;
                this.setViewState(ViewState.End);
                this.stopTimers();
              });
          } else {
            // Nächste Runde einleiten
            this.planningPokerGameService
              .finishRound(this.planningPokerId, this.activeRound._id, "Rejected", null)
              .subscribe(x => {
                this.setViewState(ViewState.WaitingForRound);
              });
          }
        }
        break;
      case ViewState.End:
        this.router.navigate(['planningPoker']);
        break;
    }
  }

  acceptVote(vote: PlanningPokerRoundVote) {
    this.acceptedVote = vote;
    this.nextPhase();
  }
}

enum ViewState {
  WaitingForRound = 0,
  Vote = 1,
  WaitingForDiscussion = 2,
  Discussion = 3,
  Decision = 4,
  End = 5
}
