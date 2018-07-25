const assert = require('assert');
const nock = require('nock');
const httpMocks = require('node-mocks-http');

import apiKey from './helper_tools/api_key.js';
import {searchGetMiddleware} from './searches_controller.js';

describe('testing searches controller middleware', () => {

  let dateSearchString

  before('setting up dates for live api searches', () => {

    const currentDateObject = new Date();
    let currentDay = currentDateObject.getDate();
    let currentMon = currentDateObject.getMonth() + 1;
    let currentYear = currentDateObject.getFullYear();

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

  describe('mocking external api (amadeus) interaction', () => {

    context('testing controller making amadeus innovation search', () => {

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

      beforeEach('before each test', async () => {
        nock('https://api.sandbox.amadeus.com')
          .get(`/v1.2/flights/inspiration-search?origin=LON&departure_date=2018-07-24&duration=12&apikey=${apiKey}`)
          .reply(200, {
            	"origin": "LON",
            	"currency": "GBP",
            	"results": results
              });

        request = httpMocks.createRequest({
          query: {
            "searchType": "INSPIRATION",
            "origin": "LON",
            "departure_date": "2018-07-24",
            "duration": "12"
          }
        });
        response = httpMocks.createResponse();

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




    })
  })
})
