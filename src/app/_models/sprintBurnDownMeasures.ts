export class SprintBurnDownMeasures {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public _id: string;
  public dateOfMeasurement: Date[];
  public remainingWorkTillNow: number[];
}
