export class Task {


  constructor() {
  }

  public _id: String;
  public title: String;

  public creationDate: Date;

  public projectId: String;
  public projectDisplayName: String;

  public backlogItemId: String;
  public backlogItemDisplayName: String;

  public authorId: String;
  public authorDisplayName: String;

  public assignedToId: String;
  public assignedToDisplayName: String;

  // ['New', 'Done', 'In Progress', 'Removed', 'To Do']
  public state: string = "New";
  // ['Low', 'Normal', 'High']
  public priority: string = "Normal";
  public remainingWork: Number = 0;
  public effort: Number = 0;
  public description: String;
}
