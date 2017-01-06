export class Project {
  public id: number;
  public displayName: string;
  public description: string;
  public dueDate: Date;
  public owner: number;
  public stakeholders: number[];
  public contributors: number[];
}
