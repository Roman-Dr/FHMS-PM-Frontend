import {Task} from './index';

export class Backlog{
  _id: string;

  creationDate: Date;

  title: string;
  description: string;
  itemType: string;
  // ['New', 'Approved', 'Committed', 'Done', 'Removed']
  state: string = 'New';
  // ['Low', 'Normal', 'High'],
  priority: string = 'Normal';
  effort: Number;

  authorId: string;
  authorDisplayName: String;

  assignedToId: string;
  assignedToDisplayName: String;

  sprintId: string;
  sprintDisplayName: string;

  projectId: string;
  projectDisplayTitle: string;

  userStoryId: string;
  userStoryDisplayName: string;

  tasks: Task[];

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
