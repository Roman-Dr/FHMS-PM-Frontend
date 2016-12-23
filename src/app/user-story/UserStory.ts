export class UserStory {
  id: number;
  title: string = '';
  complete: boolean = false;
  author: string='';
  timestamp: Date=new Date();

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
