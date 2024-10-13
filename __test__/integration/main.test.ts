import { IEasyBusboyResponse } from 'easy-busboy';
import { readFile } from 'fs/promises';
import path from 'path';

const PATH =
  'http://127.0.0.1:5001/fir-testing-template/us-central1/default-api';

const person1FilePath = path.join(__dirname, '../../src/assets/person1.jpg');
const person2FilePath = path.join(__dirname, '../../src/assets/person2.jpg');
const person3FilePath = path.join(__dirname, '../../src/assets/person3.jpg');

describe('', () => {
  let file1: Buffer;
  let file2: Buffer;
  let file3: Buffer;

  beforeAll(async () => {
    file1 = await readFile(person1FilePath);
    file2 = await readFile(person2FilePath);
    file3 = await readFile(person3FilePath);
  });

  it('test', async () => {
    const testFormData = await prepareFormData();

    const res = await fetch(PATH, {
      method: 'POST',
      body: testFormData,
    });

    const jsonRes = (await res.json()) as IEasyBusboyResponse & {
      example: object;
    };
    const { fields, files, example } = jsonRes;
    console.debug('test res: ', jsonRes);

    expect(files['file'].buffer).toStrictEqual(file1.toJSON());
    expect(files['file2'].buffer).toStrictEqual(file2.toJSON());
    expect(files['file3'].buffer).toStrictEqual(file3.toJSON());

    Object.entries(fields).map(([k, { value }]) => {
      expect(value).toEqual(testFormData.get(k));
    });

    console.debug(example);
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
