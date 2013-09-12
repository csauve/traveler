var path = require("path");

module.exports = {
    apiPrefix: "/api",
	staticPrefix: "/static",
    bindAddress: "127.0.0.1",
    port: 8080,
    webAppPath: path.join(__dirname, "web-app"),
    dbConnectionString: "mongodb://localhost:27017"
}