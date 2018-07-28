import apiKey from './api_key.js';
import uriEnum from './url_enum.js';

const urlBuilder = async (reqQueries) => {
  const baseUrl = uriEnum[reqQueries.searchType];
  // if (!baseUrl) {
  //   throw new Error(`Search type not found - ${reqQueries.searchType}`);
  // }

  const urlArray = [baseUrl];

  // const queries = {...reqQueries}
  const queries = JSON.parse(JSON.stringify(reqQueries));
  delete queries.searchType;

  queries.apikey = typeof process.env.API_KEY !== 'undefined'
                  ? process.env.API_KEY : apiKey;

  for(let key in queries) {
    urlArray.push(`${key}=${queries[key]}`)
  }

  let baseArray = urlArray.splice(0, 2);
  return baseArray.join('') + '&' + urlArray.join('&');
}

export {urlBuilder as default};
