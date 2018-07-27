import express from 'express';

import urlBuilder from './helper_tools/url_builder.js';
import requestTool from './helper_tools/request_tool.js';
import logger from '../helper_tools/async_logger.js';
import {requestValidationMiddleware} from '../request_validation/request_validator.js';

const searchRouter = new express.Router();
const searchGetMiddleware = async (req, res, next) => {
  let url;

  url = await urlBuilder(req.query);

  let apiResponse;

  try {
    apiResponse = await requestTool.get(url);
  } catch (e) {
    logger.error(e);
  }

  // if(apiResponse.status !== 200) {
  //   logger.error('Response from external search API not 200');
  //   logger.error(`Status: ${apiResponse.status} - ${apiResponse.data}`);
  //   logger.error(`Original request queries for failed response: ${req.query}`)
  //   res.status(apiResponse.status).json(apiResponse.data);
  // }

  res.json(apiResponse.data);
};

searchRouter.get('/', requestValidationMiddleware, searchGetMiddleware);

export {searchRouter as default, searchGetMiddleware};
