export class Sprint {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public sprintName: string;
  public startDate: Date;
  public endDate: Date;
  public sprintCapacity: string[];
}
