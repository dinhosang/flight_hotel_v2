import assert from 'assert';
import nock from 'nock';
import mocksHttp from 'node-mocks-http';

import requestValidator from './request_validator.js';
import logger from '../helper_tools/async_logger.js';
import URL_ENUM from '../searches/helper_tools/url_enum.js';

describe('Testing request validator middleware for GET search requests', () => {

  let validRequest;
  let response;
  let stubMiddleware;
  let result;
  let dateCreator;
  let DATE_ENUM;

  // mocha does top level before, then nested befores
  // then top level beforeEach and then nested beforeEach
  // when below was a beforeEach it caused issues of undefined variables
  before('setting up external objects:', () => {

    DATE_ENUM = {
      VALID: "today",
      // should change below to current date minus 8 hours 1 second.
      // amadeus does not allow past UTC -8. Not sure it allows
      // -8 but seems likely it would to allow mainland US requests.
      DEFINITELY_OLD: "two days ago",
      // 360 days ahead is the max! Could implement at some point.
      TOO_FUTURE: "far future"
    }

    dateCreator = (enumValue) => {
      let date;

      switch(enumValue) {
        case DATE_ENUM.VALID:
          date = new Date();
          break;
        case DATE_ENUM.DEFINITELY_OLD:
          date = new Date();
          date.setDate(date.getDate() -2);
          break;
        case DATE_ENUM.TOO_FUTURE:
          console.log('find out what this value would be to test');
          break;
        default:
          console.log('Not a key in the DATE_ENUM at the top level before()');
      }

      if (!date) {
        return 'use correct DATE_ENUM key'
      }

      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      const dayDate = date.getDate();
      return `${year}-${month}-${dayDate}`;
    }

    const dateNow = new Date();
    const year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const dayDate = dateNow.getDate();
    const validIsoDate = `${year}-${month}-${dayDate}`;

    validRequest = () => {
      return mocksHttp.createRequest({
        query: {
          "searchType": "INSPIRATION",
          "origin": "LON",
          "departure_date": dateCreator(DATE_ENUM.VALID),
          "duration": "15"
        }
      })
    };

    response = () => mocksHttp.createResponse();

    stubMiddleware = async () => {
      result = await Promise.resolve('validated');
    }
  });

  // VALID REQUEST TESTS

  context('valid inspiration search GET request treatment:', () => {

    let res;

    before('making valid request:', async () => {
      result = null;
      res = response();

      await requestValidator.search.get(validRequest(), res, stubMiddleware);
    })


    it('should validate without issue and call next middleware:', async () => {
      assert.equal(result, 'validated');
    });

    it('should not send a response:', async () => {
      assert.equal(res.finished, false);
    })

  })

  // GENERAL INVALID GET REQUEST TESTS START POINT

  context('response to invalid search GET request:', () => {

    let res;

    before('making invalid request:', async() => {
      result = null;
      res = response();

      const invalidRequest = validRequest();
      invalidRequest.query.duration = 16;

      await requestValidator.search.get(invalidRequest,res, stubMiddleware);
    })

    afterEach('reset result to ensure a clean foundation', () => {
      result = null;
    })

    it('returns invalid requests with error object in res body', async () => {
      result = JSON.parse(res._getData()).error;
      assert.notStrictEqual(typeof result, 'undefined');
    })

    it('returns a type key in error object', async () => {
      result = JSON.parse(res._getData()).error.type;
      assert.notStrictEqual(typeof result, 'undefined');
    })

    it('returns a reason key in error object', async () => {
      result = JSON.parse(res._getData()).error.reason;
      assert.notStrictEqual(typeof result, 'undefined');
    })

    it('returns invalid requests with response status code 422', async () => {
      result = res._getStatusCode();
      assert.strictEqual(result, 422);
    })
  })

  // SPECIFIC INVALID GET REQUEST TESTS START POINT

  context ('forms of invalid search GET request queries:', () => {

    let res;
    let invalidRequest;

    before('stopping logger from logging each failure', () => {
      result = null;
      logger.silent = true;
    })

    beforeEach('setup for checking types of invalid requests:', () => {
      res = response();
      invalidRequest = validRequest();
    })

    afterEach('resetting result here to protect later contexts', () => {
      result = null;
    })

    it('fails any request whose query contains an unexpected key', async () => {
      invalidRequest.query.aNewKey = 'here is a fake key/value pair';

      await requestValidator.search.get(invalidRequest, res, stubMiddleware);
      assert.notStrictEqual(result, 'validated');
    })

    // DURATION TESTS

    context('duration - should fail any request where:', () => {

      it('duration is greater than 15', async () => {
        invalidRequest.query.duration = 16;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('duration equals 0', async () => {
        invalidRequest.query.duration = 0;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('duration is less than 0', async () => {
        invalidRequest.query.duration = -1;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('duration is null', async () => {
        invalidRequest.query.duration = null;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      // duration can be undefined
      it('should not fail if duration is undefined', async () => {
        delete invalidRequest.query.duration;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.strictEqual(result, 'validated');
      })
    })

    // ORIGIN TESTS

    context('origin code - should fail any request where:', () => {

      it('origin is not found in amadeus_insp_origins.js when searchType is "INSPIRATION"', async () => {
        invalidRequest.query.origin = "908";

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);

        assert.strictEqual(invalidRequest.query.searchType, "INSPIRATION")
        assert.notStrictEqual(result, 'validated');
      })

      it('origin is not a valid IATA code when searchType is a valid value other than "INSPIRATION"')

      it('origin has a value of null', async () => {
        invalidRequest.query.origin = null;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('origin is undefined', async () => {
        delete invalidRequest.query.origin;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })
    })

    context('searchType - should fail any request where:', () => {
      it('searchType is not a key in URL_ENUM', async () => {
        const validKeys = Object.keys(URL_ENUM);
        const invalidType = "NotASearch"
        invalidRequest.query.searchType = invalidType;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);

        assert.notStrictEqual(result, 'validated');
        assert.notStrictEqual(validKeys.includes(invalidType), true);
      })

      it('searchType has a value of null', async () => {
        invalidRequest.query.searchType = null;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('searchType is undefined', async () => {
        delete invalidRequest.query.searchType;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })
    })

    // not sure how to deal with people making requests from say the west
    // coast of the USA who may have a date prior to the server's current date.
    // or if amadues api similarly takes that into account.
    // could use origin code to determine current date value there?
    // would amadeus consider that or will it fail anyt such request?
    // can try testing in the early morning when it would still be the previous
    // day in the US to see what the result is on the Amadeus side.
    // would it depend on location of ip address of requester?
    context('departure_date - should fail any request where:', () => {
      it('departure_date is two days prior to todays date', async () => {
        let invReqQuery = invalidRequest.query;
        invReqQuery.departure_date = dateCreator(DATE_ENUM.DEFINITELY_OLD);

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('departure_date is a day prior to origins current date')

      it('departure_date is too far into the future - after 360 days')

      it('departure_date is null', async () => {
        invalidRequest.query.departure_date = null;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('departure_date is undefined', async () => {
        delete invalidRequest.query.departure_date;

        await requestValidator.search.get(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })
    })

    after('restarting logger once tests are finished', () => {
      logger.silent = false;
    })


  })

})
