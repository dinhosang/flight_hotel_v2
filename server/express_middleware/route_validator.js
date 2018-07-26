import Joi from 'joi';

import logger from '../helper_tools/async_logger.js';


const validationSchema = Joi.object({
  searchType: Joi.string().valid("INSPIRATION").required(),
  departure_date: Joi.string().length(10).required()
                      .regex([\d]{4}[-][0-1]{1}[\d]{1}[-][0-3]{1}[\d]{1}),
  origin: Joi.string().length(3).regex([a-zA-Z]{3}).required(),
  duration: Joi.number().min(1).max(15).required(),
  direct: Joi.boolean(),
  one-way: Joi.boolean()
}).unknown(false);

const validationMiddleware = async (req, res, next) => {
  try {
    await Joi.validate(req.query, validationSchema, {abortEarly: false});
    next();
  } catch (error) {
    res.status(422).send({Error: "Invalid Queries"})
    logger.info("Invalid request queries received from user");
    logger.info(req.query);
    logger.info(error);
    logger.info("End of invalid request log")
  }
};

export {validationMiddleware as default};
