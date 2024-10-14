const API_PATH =
  'http://127.0.0.1:5001/fir-testing-template/us-central1/default-api';

export const sendRequest = async <T>(path: string, body?: FormData) => {
  const res = await fetch(`${API_PATH}${path}`, {
    method: 'POST',
    body: body,
  });

  return {
    response: (await res.json()) as T,
    status: res.status,
  };
};
