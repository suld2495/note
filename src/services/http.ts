import axios, { Method } from 'axios';

const request = <T>(method: Method, url: string, data: T) => {
  return axios({
    method,
    url,
    data,
  })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export default request;
