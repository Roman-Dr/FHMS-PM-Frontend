import {Initiative} from "./initiative";

export class Roadmap {

  _id: string;
  title: string;

  projectId: string;
  projectDisplayTitle: string;

  initiatives: Initiative[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
