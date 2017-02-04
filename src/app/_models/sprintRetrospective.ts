export class SprintRetrospective {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public _id: string;
  public userId: string;
  public userDisplayName: string;
  public comment: string;


}
