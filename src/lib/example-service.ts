import { debug } from 'firebase-functions/logger';

export class ExampleService {
  obj: Record<string, any> = {};

  constructor() {
    this.obj = {
      id: this.random(),
    };
    debug(`exampleService created obj with id ${this.obj.id}`);
  }

  private addField(fieldname: string, value: any) {
    this.obj[fieldname] = value;
    debug(`exampleService added field ${fieldname}`);
  }

  private addRandomField() {
    this.addField(`${this.random()}`, this.random());
  }

  private random() {
    return Math.random() * 1000;
  }

  process() {
    debug(`exampleService process()`);
    this.addRandomField();
  }

  toString() {
    debug(`exampleService stringified`);
    return JSON.stringify(this.obj);
  }
}
