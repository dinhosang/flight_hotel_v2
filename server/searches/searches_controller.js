import urlBuilder from './helper_tools/url_builder.js';
import requestTool from './helper_tools/request_tool.js';
import logger from '../helper_tools/async_logger.js';


const searchGetMiddleware = async (req, res) => {
  let url;

  try {
    url = await urlBuilder(req.query);
  } catch (e) {
    logger.error(e.message);
    logger.error(e.stack);
    res.status(404).json({error: "search type not found"});
  }

  let apiResponse;

  try {
    apiResponse = await requestTool.get(url);
  } catch (e) {
    logger.error(e);
  }

  if(apiResponse.status !== 200) {
    logger.error('Response from external search API not 200');
    logger.error(`Status: ${apiResponse.status} - ${apiResponse.data}`);
    logger.error(`Original request queries for failed response: ${req.query}`)
    res.status(apiResponse.status).json(apiResponse.data);
  }

  res.json(apiResponse.data);
}

export {searchGetMiddleware};
