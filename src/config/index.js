// index.js
const backendConfig = require("./backend-config");
const serviceConfig = require("./service-config");

const config = {
  ...backendConfig,
  ...serviceConfig,
};
// Export the combined config
module.exports = config;
