export class ExampleService {
  obj: Record<string, any> = {};

  constructor() {
    this.obj = {
      id: Math.random() * 100,
    };
  }

  addField = (fieldname: string, value: any) => {
    this.obj[fieldname] = value;
  };

  toString = () => {
    return JSON.stringify(this.obj);
  };
}
