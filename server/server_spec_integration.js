import assert from 'assert';

import requestTool from './helper_tools/request_tool.js';
import apiKey from './searches/helper_tools/api_key.js'
import logger from './helper_tools/async_logger.js'

describe('Testing server functionality as a whole:', () => {

  let currentDate;
  let serverUrl

  before('setting up current date', () => {

    serverUrl = 'http://localhost:3000';

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

    currentDate = `${currentYear}-${currentMon}-${currentDay}`;
  });

  context('Live amadeus inspiration search get requests:', () => {

    // SEARCH - INSPIRATION - GET - VALID
    context('valid requests:', () => {

      let response;
      let origin;

      before("setting up origin", () => {
        origin = "LON"
      })


      beforeEach('making valid request', async () => {
        const queries = `?searchType=INSPIRATION&origin=${origin}` +
                        `&departure_date=${currentDate}` + `&duration=5`;
        const url = `${serverUrl}/search${queries}`

        try {
          response = await requestTool.get(url);
        } catch (e) {
          response = e;
        }
      })

      afterEach('resetting response', () => {
        response = null;
      })

      it('returns a status 200 response', async () => {
        assert.strictEqual(response.status, 200);
      })
      // response contains a data field which contains the json object
      it('contains an object in the data field of the response', async () => {
        assert.strictEqual(typeof response.data, 'object');
      })

      context('data object on response:', () => {
        it('has an origin key whose value matches origin used', async () => {
          assert.strictEqual(response.data.origin, origin);
        })
        it('has a currency key', async () => {
          assert.notStrictEqual(typeof response.data.currency, 'undefined')
        })
        it('contains an array under results key', async () => {
          assert.strictEqual(Array.isArray(response.data.results), true)
        })
      })


    })

    // SEARCH - INSPIRATION - GET - INVALID
    context ('invalid requests:', () => {

      let result;

      // test returns response to invalid request
      it('returns a 422 status response to invalid queries', async () => {
        const queries = `?searchType=FAKETYPE&origin=LON` +
                        `&departure_date=${currentDate}` + `&duration=5`;
        const url = `${serverUrl}/search/`;

        try {
          result = await requestTool.get(url);
        } catch (e) {
          result = e;
        }

        assert.strictEqual(result.response.status, 422)
      })
    })
  })

  context('Invalid path request', () => {

    let result;

    it('returns a 404 status response to invalid paths', async () => {
      const url = `${serverUrl}/fakeRoute`;
      try {
        result = await requestTool.get(url);
      } catch (e) {
        result = e;
      }

      assert.strictEqual(result.response.status, 404);
    })
  })


})
