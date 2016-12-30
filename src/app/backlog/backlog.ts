export class Backlog{
  id: number;
  title: string = '';
  status: string='';
  author: string='';
  complete: boolean;

  constructor(values: Object={}){
    Object.assign(this, values);
  }
}
