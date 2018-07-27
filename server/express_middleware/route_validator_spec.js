const assert = require('assert');
const nock = require('nock');
const mocksHttp = require('node-mocks-http');

import validatorMiddleware from './route_validator.js';
import logger from '../helper_tools/async_logger.js';


describe('testing route validator middleware:', () => {

  let validRequest;
  let response;
  let stubMiddleware;
  let result;

  // mocha does top level before, then nested befores
  // then top level beforeEach and then nested beforeEach
  // when below was a beforeEach it caused issues of undefined variables
  before('setting up external objects:', () => {
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
          "departure_date": validIsoDate,
          "duration": "15"
        }
      })
    };

    response = () => mocksHttp.createResponse();

    stubMiddleware = async () => {
      result = await Promise.resolve('validated');
    }
  });

  context('valid requests treatment:', () => {

    let res;

    before('making valid request:', async () => {
      result = null;
      res = response();

      await validatorMiddleware(validRequest(), res, stubMiddleware);
    })


    it('should validate a clean request without issue and call next middleware', async () => {
      assert.equal(result, 'validated');
    });

    it('should not send a response on valid request', async () => {
      assert.equal(res.finished, false);
    })

  })

  context('response to invalid request:', async () => {

    let res;

    before('making invalid request:', async() => {
      res = response();

      const invalidRequest = validRequest();
      invalidRequest.query.duration = 16;

      await validatorMiddleware(invalidRequest,res, stubMiddleware);
    })

    beforeEach('reset result to ensure a clean foundation', () => {
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

  context ('testing types forms of invalid requests:', () => {

    let res;
    let invalidRequest;

    before('stopping logger from logging each failure', () => {
      logger.silent = true;
    })

    beforeEach('setup for checking types of invalid requests:', () => {
      result = null;
      res = response();
      invalidRequest = validRequest();
    })

    context('duration - should fail any request where:', () => {

      it('duration is greater than 15', async () => {
        invalidRequest.query.duration = 16;

        await validatorMiddleware(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('duration equals 0', async () => {
        invalidRequest.query.duration = 0;

        await validatorMiddleware(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('duration is less than 0', async () => {
        invalidRequest.query.duration = -1;

        await validatorMiddleware(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('duration is null', async () => {
        invalidRequest.query.duration = null;

        await validatorMiddleware(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('duration is undefined', async () => {
        delete invalidRequest.query.duration;

        await validatorMiddleware(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })
    })

    context('origin code - should fail any request where:', async () => {

      it('origin is not found in amadeus_insp_origins.js', async () => {
        invalidRequest.query.origin = "908";

        await validatorMiddleware(invalidRequest, res, stubMiddleware);
        assert.notStrictEqual(result, 'validated');
      })

      it('')

    })


    after('restarting logger once tests are finished', () => {
      logger.silent = false;
    })


  })

})
