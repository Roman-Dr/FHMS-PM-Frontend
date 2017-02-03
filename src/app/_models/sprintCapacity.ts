export class SprintCapacity {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public _id: string;
  public userId: string;
  public userDisplayName: string;
  public daysOff: number;
  public capacityPerDay: number;

}
