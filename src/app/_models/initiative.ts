import {Feature} from "./feature";
export class Initiative {

  _id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  description: string;
  goal: string;
  features: Feature[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
