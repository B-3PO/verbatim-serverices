const express = require('express');
const bodyParser = require('body-parser');
// const compression = require('compression');
// const cors = require('cors');

const port = process.env.PORT || 5000;
let app = express();

// app.use(cors());
// app.use(bodyParser.json());
// app.use(compression());
// app.options('*', cors());

app.use('/status', (req, res) => {
  res.send('ok');
});

app.listen(port, () => {
  console.log(`running on port: ${port}`);
});


app.post('/add-item', (req, res) => {
  res.send({
    "messages": [
    {
      "attachment":{
        "type":"template",
        "payload":{
          "template_type":"generic",
          "image_aspect_ratio": "square",
          "elements":[
            {
              "title":"Chatfuel Rockets T-Shirt",
              "image_url":"https://rockets.chatfuel.com/img/shirt.png",
              "subtitle":"Soft white cotton t-shirt with CF Rockets logo",
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://rockets.chatfuel.com/store/shirt",
                  "title":"View Item"
                }
              ]
            },
            {
              "title":"Chatfuel Rockets Hoodie",
              "image_url":"https://rockets.chatfuel.com/img/hoodie.png",
              "subtitle":"Soft grey cotton hoddie with CF Rockets logo",
              "default_action": {
                "type": "web_url",
                "url": "https://rockets.chatfuel.com/store",
                "messenger_extensions": true
              },
              "buttons":[
                {
                  "type":"web_url",
                  "url":"https://rockets.chatfuel.com/store/hoodie",
                  "title":"View Item"
                }
              ]
            }
          ]
        }
      }
    }
  ]
  });
});


app.post('/get-cart', {
   "messages": [
      {
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"list",
            "top_element_style":"large",
            "elements":[
              {
                "title":"Chatfuel Rockets T-Shirt",
                "image_url":"http://rockets.chatfuel.com/img/shirt.png",
                "subtitle":"Soft white cotton t-shirt with CF Rockets logo",
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"https://rockets.chatfuel.com/store/shirt",
                    "title":"View Item"
                  }
                ]
              },
              {
                "title":"Chatfuel Rockets Hoodie",
                "image_url":"http://rockets.chatfuel.com/img/hoodie.png",
                "subtitle":"Soft gray cotton t-shirt with CF Rockets logo",
                "buttons":[
                  {
                    "type":"web_url",
                    "url":"https://rockets.chatfuel.com/store/hoodie",
                    "title":"View Item"
                  }
                ]
              }
            ]
          }
        }
      }
    ]
  });
