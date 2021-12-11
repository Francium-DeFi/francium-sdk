import axios from 'axios';

const promiseCache = {} as {
  [url: string]: Promise<any>
};

export default function cacheGet(url, config?, useCache = true) {
  if (!useCache) {
    return axios.get(url, config);
  }
  if (promiseCache[url]) {
    return promiseCache[url];
  }
  const req = axios.get(url, config);
  promiseCache[url] = req;
  return req
    .then(res => {
      promiseCache[url] = null;
      return Promise.resolve(res);
    })
    .catch((err) => {
      promiseCache[url] = null;
      return Promise.reject(err);
    });
}
