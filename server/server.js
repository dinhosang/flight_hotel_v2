/*
able to use import instead of require in development due to using babel-cli
and babel-preset-env, with the preset of "env" recorded in a .babelrc file
node currenly doesn't allow for es6 importing of modules so need to transpile
to the previous require version, but now code is in keeping with expected
progress of javascript.
*/
import Path from 'path';
import helmet from 'helmet';
import compression from 'compression';
import express from 'express';

import logger, { requestLoggingMiddleware, response404LoggingMiddleware } from
'./helper_tools/async_logger.js';
import accountsRouter from './accounts/accounts_controller'

/*
allows for access to an environment variable if not in development,
for instance if uploaded on heroku. If variable named doesn't exist will use
right hand side default. Similar with port number.
*/
const siteUri = process.env.SITE_URI || "http://localhost:3000";
const serverPort = process.env.PORT || 3000;
// creates an express server instance, which is actually just a callback
const server = express();

/*
helmet is a middleware which protects against well-known web vulnerabilities
by setting the appropriate headers. For example it disables the
"X-powered-by" header which is on by default in express which tells
the world that this is an express app, opening up the server to targeted attacks
*/
server.use(helmet());
// below will inflate compressed request bodies and auto-parses json bodies
server.use(express.json());
server.use(requestLoggingMiddleware)
// tells the server to use and present these static files to the client browser
// will default '/' homepage to the index.html contained within.
server.use(express.static(Path.join(__dirname, '../client/build')));
// allows for parsing of urlencoded bodies (escaped javascript essentially)
server.use(express.urlencoded({extended: true}));
// compress response bodies to reduce size of packet sent to client browser
server.use(compression());

// sets some response headers for allowing cross-origin communication
// and allow for the options verb to receive a value.
server.use((req, res, next) => {
  res.header({
      "Access-Control-Allow-Origin": siteUri,
      "Access-Control-Allow-Methods": ["POST", "GET", "PUT"]
  });
  next();
})

server.use('/accounts', accountsRouter);
server.use(response404LoggingMiddleware)l

const activeServer = server.listen(serverPort, () => {
  const host = activeServer.address().address;
  const port = activeServer.address().port;

  logger.info(`\n\tServer listening at ${host}:${port}`)
})
