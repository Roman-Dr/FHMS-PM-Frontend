/**
 * Created by David on 01.02.2017.
 */
import {User, Backlog, PlanningPokerRound, Project} from "./index";

export class PlanningPoker {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  _id: string;

  moderator: User;
  item: Backlog;
  project: Project;

  creationDateTime: Date;
  finishDateTime: Date;

  participants: [ User ];
  rounds: [ PlanningPokerRound ];

  activeRound: Number = 0;
  isActive: Boolean = false;
  isStarted: Boolean = true;
  effort: Number = 0;
}
