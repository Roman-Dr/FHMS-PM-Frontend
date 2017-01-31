import {Task, ItemState} from './index';

export class Backlog{
  id: number;
  title: string = '';
  tasks: Task[] = [];
  state: ItemState;
  author: string='';
  complete: boolean;
  backlog_item_id: string;
  backlogitemTaskAuthor:string;

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
