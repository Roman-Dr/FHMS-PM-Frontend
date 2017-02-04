import {Backlog} from "./backlog";
export class UserStory {
  _id: string;

  role: string = "";
  feature: string = "";
  benefit: string = "";

  complete: boolean = false;
  authorId: string = "";
  authorDisplayName: string = "";

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public toStory() {
    return "Als " + this.role + " möchte ich " + this.feature + ", um " + this.benefit + ".";
  }

  public toString() {
    return JSON.stringify({
      1: this.role,
      2: this.feature,
      3: this.benefit,
      4: this.complete ? "Abgeschlossen" : "Ausstehend",
      5: this.authorDisplayName
    });
  }
}
