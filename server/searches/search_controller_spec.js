import assert from 'assert';
import nock from 'nock';
import mocksHttp from 'node-mocks-http';

import apiKey from './helper_tools/api_key.js';
import {searchGetMiddleware} from './search_controller.js';

describe('Testing searches controller middleware', () => {

  let dateSearchString

  before('setting up dates for live api searches', () => {

    const currentDateObject = new Date();
    let currentDay = currentDateObject.getDate();
    let currentMon = currentDateObject.getMonth() + 1;
    let currentYear = currentDateObject.getFullYear();

    if (currentMon < 10) {
      currentMon = `0${currentMon}`;
    }

    if (currentDay < 10) {
      currentDay = `0${currentDay}`;
    }

    // // checking if it is currently December and so need to roll over
    // let futureMon = currentMon === 12 ? 1 : currentMon + 1;
    // let futureYear = futureMon === 1 ? currentYear + 1 : currentYear;
    // // setting to hard coded number to prevent issues with months
    // // having differing lengths
    // let futureDay = 7;

    // let currentDateString = `${currentYear}-${currentMon}-${currentDay}`;
    // let futureDateString = `${futureYear}-${futureMon}-${futureDay}`;
    // dateSearchString = `${currentDateString}--${futureDateString}`;

    dateSearchString = `${currentYear}-${currentMon}-${currentDay}`;
  })

  describe('mocking Amadeus API connection', () => {

    context('controller making amadeus inspiration search', () => {

      let results;
      let request;
      let response;
      let data;

      before('setup results array', () => {
        results = [
          {
            "destination": "BRU",
            "departure_date": "2018-07-24",
            "return_date": "2018-08-05",
            "price": "118.00",
            "airline": "9F"
          },
          {
            "destination": "DUB",
            "departure_date": "2018-07-24",
            "return_date": "2018-08-05",
            "price": "132.70",
            "airline": "BA"
          },
          {
            "destination": "CGN",
            "departure_date": "2018-07-24",
            "return_date": "2018-08-05",
            "price": "134.10",
            "airline": "BE"
          },
          {
            "destination": "AMS",
            "departure_date": "2018-07-24",
            "return_date": "2018-08-05",
            "price": "134.96",
            "airline": "VY"
          }
        ]
      })

      beforeEach('mocking the external api server, and the request to/response from the search controller middleware', async () => {
        nock('https://api.sandbox.amadeus.com')
          .get(`/v1.2/flights/inspiration-search?origin=LON&departure_date=2018-07-24&duration=12&apikey=${apiKey}`)
          .reply(200, {
            	"origin": "LON",
            	"currency": "GBP",
            	"results": results
              });

        request = mocksHttp.createRequest({
          query: {
            "searchType": "INSPIRATION",
            "origin": "LON",
            "departure_date": "2018-07-24",
            "duration": "12"
          }
        });
        response = mocksHttp.createResponse();

        await searchGetMiddleware(request, response);
        data = JSON.parse(response._getData());
      })

      it('should return a json with a key and value for origin', async () => {
        assert.strictEqual(data.origin, "LON");
      })

      it('should return a json with a key and value for currency', async () => {
        assert.strictEqual(data.currency, "GBP");
      })

      it('should return a json with a key and values for results', async () => {
        assert.deepStrictEqual(data.results, results)
      })

      after('removing nock mock of Amadeus API connection', () => {
        nock.cleanAll();
      })
    })
  })
})
