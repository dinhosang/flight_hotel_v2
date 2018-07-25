import apiKey from './api_key.js';
import uriEnum from './uri_enum.js';

const urlBuilder = async (reqQueries) => {
  const baseUrl = uriEnum[reqQueries.searchType];
  if (!baseUrl) {
    throw new Error(`Search type not found - ${reqQueries.searchType}`);
  }

  const finalUrlArray = [baseUrl];

  // const queries = {...reqQueries}
  const queries = JSON.parse(JSON.stringify(reqQueries));
  delete queries.searchType;

  queries.apikey = typeof process.env.API_KEY !== 'undefined'
                  ? process.env.API_KEY : apiKey;

  for(let key in queries) {
    finalUrlArray.push(`${key}=${queries[key]}`)
  }

  let baseArray = finalUrlArray.splice(0, 2);
  return baseArray.join('') + '&' + finalUrlArray.join('&');
}

export {urlBuilder as default};
