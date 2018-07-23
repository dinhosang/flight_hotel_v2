import express from 'express';
const accountsRouter = new express.Router();

accountsRouter.get('/', (req, res) => {
  res.json({"Result": "all done"})
})

export {accountsRouter as default}
