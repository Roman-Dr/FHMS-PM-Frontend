import { User } from './index';

export class Project {
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public displayName: string;
  public description: string;
  public dueDate: Date;
  public owner: number;
  public stakeholders: User[] = [];
  public contributors: User[] = [];
}
