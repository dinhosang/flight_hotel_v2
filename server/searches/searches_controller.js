import urlBuilder from './helper_tools/url_builder.js';
import logger from '../../helper_tools/async_logger.js';



const searchGetMiddleware = async (req, res) => {
  let url;

  try {
    url = await urlBuilder(req.query)
  } catch (e) {
    logger.info(e.message)
    logger.info(e.stack)
    res.status(404).json({error: "search type not found"})
  }

  

}
