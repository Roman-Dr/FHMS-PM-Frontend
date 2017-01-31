import {Task} from './index';

export class Backlog{
  id: number;
  title: string = '';
  tasks: Task[] = [];
  status: string='';
  author: string='';
  complete: boolean;
  backlog_item_id: string;
  backlogitemTaskAuthor:string;

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
