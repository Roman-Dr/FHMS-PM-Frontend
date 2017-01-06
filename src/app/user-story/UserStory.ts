import {Backlog} from "../backlog/backlog";
export class UserStory {
  id: string;
  title: string = '';
  complete: boolean = false;
  author: string='';
  timestamp: Date=new Date();
  backlogs: Backlog[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
