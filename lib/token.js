const keys = require('./keys');
const jwt = require('jsonwebtoken');
const logger = require('heroku-logger');

exports.verify = (req, res, next) => {
  jwt.verify(req.body.user_token, keys.apiPublic, { algorithms: 'RS256' }, (err, decoded) => {
    if (err) return next(err);
    req.token = req.body.user_token;
    req.tokenData = decoded;
    next();
  });
};

exports.generate = (data) => {
  return jwt.sign(data, keys.apiPrivate, { algorithm: 'RS256'});
};

exports.update = (data, token) => {
  let decoded = jwt.decode(token);
  Object.assign(data, decoded);
  return jwt.sign(data, keys.apiPrivate, { algorithm: 'RS256'});
};
