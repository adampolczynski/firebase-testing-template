export class ExampleService {
  obj: Record<string, any> = {};

  constructor() {
    this.obj = {
      id: this.random(),
    };
  }

  private addField(fieldname: string, value: any) {
    this.obj[fieldname] = value;
  }

  private addRandomField() {
    this.addField(`${this.random()}`, this.random());
  }

  private random() {
    return Math.random() * 1000;
  }

  process() {
    this.addRandomField();
  }

  toString() {
    return JSON.stringify(this.obj);
  }
}
