import { ExampleService } from '../../src/lib/example-service';

describe('', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it('test', async () => {
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
});
