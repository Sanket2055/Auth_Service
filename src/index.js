const express = require("express");

const { PORT } = require("./config/serverConfig");
const app = express();

const prepareAndStartServer = async () => {
    // ... other code
    app.listen(PORT, () => {
        console.log("Server is listening on port: " + PORT);
    });
}
prepareAndStartServer();

