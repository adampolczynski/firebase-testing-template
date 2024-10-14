import { IEasyBusboyResponse } from 'easy-busboy';
import { readFile } from 'fs/promises';
import path from 'path';
import { sendRequest } from '../utils';

const EXAMPLE_FUNCTION_ROUTE = '/';

interface ITestFunctionResponse extends IEasyBusboyResponse {
  example: string;
}

const person1FilePath = path.join(__dirname, '../../assets/person1.jpg');
const person2FilePath = path.join(__dirname, '../../assets/person2.jpg');
const person3FilePath = path.join(__dirname, '../../assets/person3.jpg');

describe('exampleFunction integration tests', () => {
  let file1: Buffer;
  let file2: Buffer;
  let file3: Buffer;

  beforeAll(async () => {
    file1 = await readFile(person1FilePath);
    file2 = await readFile(person2FilePath);
    file3 = await readFile(person3FilePath);
  });

  it('expect exampleCloudFunction to return status 200', async () => {
    const testFormData = await prepareFormData();

    const { status } = await sendRequest<ITestFunctionResponse>(
      EXAMPLE_FUNCTION_ROUTE,
      testFormData
    );

    expect(status).toEqual(200);
  });

  it('expect exampleCloudFunction to return correct data', async () => {
    const testFormData = await prepareFormData();

    const { response } = await sendRequest<ITestFunctionResponse>(
      EXAMPLE_FUNCTION_ROUTE,
      testFormData
    );

    const { fields, files, example } = response;

    expect(files['file'].buffer).toStrictEqual(file1.toJSON());
    expect(files['file2'].buffer).toStrictEqual(file2.toJSON());
    expect(files['file3'].buffer).toStrictEqual(file3.toJSON());

    Object.entries(fields).map(([k, { value }]) => {
      expect(value).toEqual(testFormData.get(k));
    });

    expect(typeof example).toEqual('string');
    expect(typeof JSON.parse(example)).toEqual('object');
  });

  const prepareFormData = async () => {
    const formData = new FormData();
    formData.append('text', 'read me or');
    formData.append('text2', 'i will push the button');
    formData.append('text3', '<rumbling>');
    formData.append('json like field [123] {}', 'what a mess');

    formData.append('file', new Blob([file1]));
    formData.append('file2', new Blob([file2]));
    formData.append('file3', new Blob([file3]));

    return formData;
  };
});
