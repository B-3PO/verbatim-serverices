// TODO chang location for keys

const fs = require('fs');
exports.refreshPrivate = fs.readFileSync(process.env.REFRESH_PRIVATE);
exports.refreshPublic = fs.readFileSync(process.env.REFRESH_PUBLIC);
exports.apiPrivate = fs.readFileSync(process.env.API_PRIVATE);
exports.apiPublic = fs.readFileSync(process.env.API_PUBLIC);
