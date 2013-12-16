var path = require("path");

module.exports = {
    apiPrefix: "/api",
    staticPrefix: "/static",
    domain: "localhost",
    port: 8080,
    webAppPath: path.join(__dirname, "web-app"),
    dbConnectionString: "mongodb://localhost:27017",
    smtp: {
        host: "example.com",
        user: "user",
        password: "password",
        ssl: false
    }
}