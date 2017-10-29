const keys = require('./keys');
const jwt = require('jsonwebtoken');

exports.verify = (req, res, next) => {
  jwt.verify(req.body.user_token, keys.apiPublic, { algorithms: 'RS256' }, (err, decoded) => {
    if (err) return next(err);
    req.token = token;
    req.tokenData = decoded;
    next();
  });
};

exports.generate = (data) => {
  return jwt.sign(data, keys.apiPrivate, { algorithm: 'RS256'});
};

exports.update = (token, data) => {
  let decoded = jwt.decode(token);
  Object.assign(data, decoded);
  return jwt.sign(data, keys.apiPrivate, { algorithm: 'RS256'});
};
