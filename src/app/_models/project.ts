import { User } from './index';

export class Project {
  public displayName: string;
  public description: string;
  public dueDate: Date;
  public owner: number;
  public stakeholders: User[] = [];
  public contributors: User[] = [];
}
