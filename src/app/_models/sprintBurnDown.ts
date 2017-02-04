export class SprintBurnDown {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public sprintName: string;
  public startDate: Date;
  public endDate: Date;
  public idealPoints: idealPoint[];
  public realityPoints: realityPoint[];
}


export class idealPoint {
  public date: Date;
  public value: number;
  public index: number;

}


export class realityPoint {
  public date: Date;
  public value: number;
  public index: number;

}
