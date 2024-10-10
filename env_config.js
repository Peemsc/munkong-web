const path = require("path");

const NODE_MODE = process.env.NODE_ENV || "production"

switch (NODE_MODE) {
  case "development":
    require('dotenv').config({ path: __dirname + '/.env.development' })
    break;
  case "production":
    require('dotenv').config({ path: __dirname + '/.env.production' })
    break;
  default:
    require('dotenv').config({ path: __dirname + '/.env.local' });
}
