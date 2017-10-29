// default env vars
process.env.TOKEN_EXPIRE_MINUTES = process.env.TOKEN_EXPIRE_MINUTES || 10;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config({path: '.env.example'});
// if (process.env.NODE_ENV === 'development') {
//   require('dotenv').config({path: '.env.example'});
// } else {
//   require('dotenv').config();
// }

const express = require('express');
const bodyParser = require('body-parser');
const tokenService = require('./lib/token');
const logger = require('heroku-logger');

const port = process.env.PORT || 5000;
let app = express();

app.use(bodyParser.json());

// -- start server
app.listen(port, () => {
  logger.info(`running on port: ${port}`);
});

// -- non authed ---
app.post('/get-user', (req, res) => {
  let body = req.body;
  logger.info('req.body', req.body);
  let token = tokenService.generate({
    chatfuelUserId: body.chatfuel_user_id,
    facebookUserId: body.facebook_user_id,
    firstName: body.first_name,
    lastName: body.last_name,
    timezone: body.timezone,
    venueId: body.venueId
  });
  res.send({ set_attributes: { 'user_token': token } });
});

// verify token
app.use(tokenService.verify);


// --- authed ---
app.post('/user-location', (req, res) => {
  logger.info('user-location', req.token)
  var body = res.body;
  tokenService.update({
    section: body.section,
    row: body.row,
    seat: body.seat
  }, req.token);

  res.send({ set_attributes: { 'user_token': token } });
});

app.post('/add-item', (req, res) => {
  var body = res.body;
  var cart = req.tokenData.cart || [];
  cart.push({
    id: body.item_id,
    quantity: body.item_quantity
  });
  tokenService.update(req.token, { cart: cart });
  res.send({ set_attributes: { 'user_token': token } });
});


app.post('/get-cart', (req, res) => {
  var elements = req.tokenData.map(i  => {
    return {
      title: 'Item ' + i.id,
      subtitle: 'quntity: ' + i.quantity,
      buttons: [
        {
          type: 'web_url',
          url: '',
          titie: 'remove'
        }
      ]
    };
  });

  res.send({
   messages: [
      {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'list',
            top_element_style: 'large',
            elements: elements
          }
        }
      }
    ]
  });
});
