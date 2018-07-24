import apiKey from './api_key.js';
import uriEnum from './uri_enum.js';

const urlBuilder = async (reqQueries) => {
  const baseUrl = uriEnum[queries.searchType];
  if (!baseUrl) {
    throw new Error(`Search type not found - ${queries.searchType}`);
  }

  const finalUrlArray = [baseUrl];

  const queries = {...reqQueries}
  delete queries.searchType;
  queries.apikey = process.env.API_KEY || apiKey;

  for(key in queries) {
    finalUrlArray.push(`${key}=${${queries[key]}}`)
  }

  return finalUrlArray.join('&');
}

export {urlBuilder as default};
