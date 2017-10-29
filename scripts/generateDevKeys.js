let fs = require('fs');
let keypair = require('keypair');
let forge = require('node-forge');

let apiPair = keypair();
let refreshPair = keypair();

fs.mkdir('keys/', function (err) {
  fs.writeFile("keys/api", apiPair.private);
  fs.writeFile("keys/api.pem", apiPair.public);
  fs.writeFile("keys/refresh", refreshPair.private);
  fs.writeFile("keys/refresh.pem", refreshPair.public);
});
