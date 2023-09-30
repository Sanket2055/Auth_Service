const express = require("express");

const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");

const app = express();
const prepareAndStartServer = async () => {
    // ... other code

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.use("/api", apiRoutes);
    app.listen(PORT, () => {
        console.log("Server is listening on port: " + PORT);
    });
}
prepareAndStartServer();

