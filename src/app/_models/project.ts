export class Project {
  constructor(displayName, description, dueDate) {
    this.displayName = displayName;
    this.description = description;
    this.dueDate = dueDate;
  }

  public displayName: string;
  public description: string;
  public dueDate: Date;
  public owner: number;
  public stakeholders: number[];
  public contributors: number[];
}
