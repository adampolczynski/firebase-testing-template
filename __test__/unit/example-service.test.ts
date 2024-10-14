import { ExampleService } from '../../src/lib/example-service';

describe('ExampleService', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it('expect process() calls other methods', async () => {
    const exampleService = new ExampleService();
    const spyOnAddField = jest.spyOn(exampleService as any, 'addField');
    const spyOnAddRandomField = jest.spyOn(
      exampleService as any,
      'addRandomField'
    );

    exampleService.process();

    expect(spyOnAddField).toHaveBeenCalled();
    expect(spyOnAddRandomField).toHaveBeenCalled();
  });

  it('expect process() modifies its "obj" property', async () => {
    const exampleService = new ExampleService();

    expect(Object.keys(exampleService.obj).length === 1);
    exampleService.process();

    expect(Object.keys(exampleService.obj).length === 3);
  });
});
