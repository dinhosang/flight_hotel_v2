import Joi from 'joi';

import logger from '../helper_tools/async_logger.js';
import inspOriginCodes from './amadeus_insp_origins.js';


const inspValidationSchema = () => {

  const dateNow = new Date();
  const year = dateNow.getFullYear();
  let month = dateNow.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  const dayDate = dateNow.getDate();
  const isoDate = `${year}-${month}-${dayDate}`;

  return Joi.object({
    searchType: Joi.string().valid("INSPIRATION").required(),
    // departure_date: Joi.string().length(10).required()
    //                     .regex(/[\d]{4}[-][0-1]{1}[\d]{1}[-][0-3]{1}[\d]{1}/),
    departure_date: Joi.date().min(isoDate).iso().required(),
    // origin: Joi.string().length(3).regex(/[a-zA-Z]{3}/).required(),
    origin: Joi.string().valid(inspOriginCodes).required(),
    duration: Joi.number().min(1).max(15).required(),
    direct: Joi.boolean(),
    "one-way": Joi.boolean()
  }).unknown(false);
}

const validationMiddleware = async (req, res, next) => {

  // currently only checks for inspiration searches, with an inspiration schema.
  // when added more searches will need to add a check for search type,
  // and an update to the schema, or a new one made.

  try {
    await Joi.validate(req.query, inspValidationSchema(), {abortEarly: false});
    next();
  } catch (error) {
    res.status(422).json({error: {
      type: "Invalid Query",
      reason: error.message
    }});
    logger.info("Invalid request queries received from user");
    logger.info(error.message);
    logger.info(JSON.stringify(req.query));
    logger.info("End of invalid request log");
  }
};

export {validationMiddleware as default};
