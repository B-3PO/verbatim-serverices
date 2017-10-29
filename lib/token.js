const keys = require('./keys');
const jwt = require('jsonwebtoken');
const logger = require('heroku-logger');

exports.verify = (req, res, next) => {
  jwt.verify(req.body.user_token, keys.apiPublic, { algorithms: 'RS256' }, (err, decoded) => {
    if (err) {
      logger.error(err);
      return next(err);
    }
    
    req.token = req.body.user_token;
    req.tokenData = decoded;
    next();
  });
};

exports.generate = (data) => {
  let token;
  try {
    token = jwt.sign(data, keys.apiPrivate, { algorithm: 'RS256'});
  } catch(e) {
    logger.info(e);
  }
  return token;
};

exports.update = (token, data) => {
  let decoded = jwt.decode(token);
  Object.assign(data, decoded);
  return jwt.sign(data, keys.apiPrivate, { algorithm: 'RS256'});
};
