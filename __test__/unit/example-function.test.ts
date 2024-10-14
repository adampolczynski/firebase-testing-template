// jest.mock('express/lib/request', () => ({
//   //   ...jest.requireActual('express/lib/request'),
//   on: jest.fn(),
//   //   connection: {},
//   //   defineGetter: jest.fn(),
// }));

// jest.mock('http', () => ({
//   ...jest.requireActual('http'),
//   request: {
//     on: jest.fn(),
//   },
// }));
// jest.mock('../foo-bar-baz', () => {
//   const originalModule = jest.requireActual('../foo-bar-baz');

//   //Mock the default export and named export 'foo'
//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => 'mocked baz'),
//   };
// });

// jest.mock('firebase-functions/https', () => ({
//   // ...jest.requireActual('http'),
//   request: {
//     on: jest.fn(),
//   },
//   //   connection: {},
//   //   defineGetter: jest.fn(),
// }));

// jest.mock('firebase-functions');

import type { IEasyBusboyResponse } from 'easy-busboy';
import { readFile } from 'fs/promises';
import path from 'path';

import { exampleCloudFunction } from '../../src/functions';

interface ITestFunctionResponse extends IEasyBusboyResponse {
  example: string;
}

const person1FilePath = path.join(__dirname, '../../assets/person1.jpg');
const person2FilePath = path.join(__dirname, '../../assets/person2.jpg');
const person3FilePath = path.join(__dirname, '../../assets/person3.jpg');

describe('exampleCloudFunction', () => {
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

    const temp: Record<string, any> = {};
    for await (const [k, v] of testFormData.entries()) {
      temp[k] = v;
    }

    console.debug(temp);

    const formDataBuffer = Buffer.from(JSON.stringify(temp));

    const req = {
      headers: {
        'content-type': `multipart/form-data; boundary=${formDataBuffer.byteLength}`,
      },
      rawBody: formDataBuffer,
      on: (e: string, f: jest.Func) => {},
      pipe: (v: any) => {},
      // connection: {},
    };
    const response = await exampleCloudFunction(req as any, {} as any);
    console.debug(response);
  });

  // it('expect exampleCloudFunction to return correct data', async () => {
  //   const testFormData = await prepareFormData();

  //   const response = await exampleCloudFunction(
  //     {
  //       headers: {
  //         'content-type': `multipart/form-data; boundary=${'213'}`,
  //       },
  //     } as any,
  //     {} as any
  //   );
  //   console.debug(response);
  // });

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
