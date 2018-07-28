import Joi from 'joi';

import logger from '../helper_tools/async_logger.js';
import inspOriginCodes from './helper_tools/amadeus_insp_origins.js';

const requestValidator = {

  prepareIsoDate: () => {
    const dateNow = new Date();

    const year = dateNow.getFullYear();
    let month = dateNow.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const dayDate = dateNow.getDate();
    return `${year}-${month}-${dayDate}`;
  },

  inspirationSchema: () => {
    const isoDate = requestValidator.prepareIsoDate();

    return Joi.object({
      searchType: Joi.string().valid("INSPIRATION").required(),
      departure_date: Joi.date().min(isoDate).iso().required(),
      origin: Joi.string().valid(inspOriginCodes).required(),
      duration: Joi.number().min(1).max(15),
      direct: Joi.boolean(),
      "one-way": Joi.boolean()
    }).unknown(false);
  },

  errorReport: (error) => {
    return {
      error: {
        type: "Invalid Query",
        reason: error.message
      }
    };
  },

  search: {
    get: async (req, res, next) => {
      let joiSchema;

      switch(req.query.searchType) {
        case "INSPIRATION":
          joiSchema = requestValidator.inspirationSchema();
          break;
        default:
          joiSchema = requestValidator.inspirationSchema();
      }

      try {
        await Joi.validate(req.query, joiSchema, {abortEarly: false});
        next();
      } catch (error) {
        res.status(422).json(requestValidator.errorReport(error));
        logger.info("\n\tInvalid request queries received from user");
        logger.info(error.message);
        logger.info(JSON.stringify(req.query));
        logger.info("End of invalid request log");
      }
    }
  }

};

export {requestValidator as default};
