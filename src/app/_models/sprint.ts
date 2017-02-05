import {SprintCapacity, SprintRetrospective} from "./index";

export class Sprint {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public _id: string;
  public sprintName: string;
  public startDate: Date;
  public endDate: Date;
  public sprintCapacity: SprintCapacity[];
  public sprintRetrospective: SprintRetrospective;
}
