import {Backlog} from "./backlog";
export class UserStory {
  title: string = '';
  complete: boolean = false;
  author: string='';
  authorDisplayName: string='';
  timestamp: Date=new Date();
  backlogs: Backlog[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public toString() {
    return JSON.stringify({
      1: this.title,
      2: this.complete ? "Abgeschlossen" : "Ausstehend",
      3: this.authorDisplayName
    });
  }
}
