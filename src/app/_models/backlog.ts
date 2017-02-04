import {Task} from './index';

export class Backlog {
  _id: string;

  creationDate: Date;

  title: string;
  description: string;
  // ['BacklogItem', 'Bug'],
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

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  public humanizePriority() {
    if (this.priority == "Low") {
      return "Niedrig";
    }
    else if (this.priority == "Normal") {
      return "Normal";
    }
    else {
      return "Hoch";
    }
  }

  public humanizeState() {
    switch (this.state) {
      case 'New':
      default:
        return 'Neu';
      case 'Approved':
        return 'Bestätigt';
      case 'Committed':
        return 'Hochgeladen';
      case 'Done':
        return 'Abgeschlossen';
      case 'Removed':
        return 'Entfernt';
    }
  }

  public toString() {
    return JSON.stringify({
      1: this.title,
      2: this.sprintDisplayName,
      3: this.assignedToDisplayName,
      4: this.userStoryDisplayName,
      5: this.humanizePriority(),
      6: this.humanizeState(),
      7: this.itemType,
      8: this.description
    });
  }
}
