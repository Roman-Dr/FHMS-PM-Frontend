/**
 * Created by David on 01.02.2017.
 */
import {User} from './index';

export class PlanningPokerRoundVote {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  _id: string;
  effort: Number;
  reason: String;
  voterId: string;
  voterDisplayName: string;
}
