export class Feature {

  _id: string;
  title: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
