/**
 * Created by David on 01.02.2017.
 */

import {PlanningPokerRoundVote} from './index';

export class PlanningPokerRound {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  _id: string;
  number: Number;
  electedEffort: Number;

  minEffort: PlanningPokerRoundVote;
  maxEffort: PlanningPokerRoundVote;

  // ['Pending', 'Accepted', 'Rejected']
  state: string;

  votes: Array<PlanningPokerRoundVote> = [];
  votesCount: Number;
}
