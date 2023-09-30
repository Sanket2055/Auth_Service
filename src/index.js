const express = require("express");

const apiRoutes = require("./routes/index");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const UserService = require("./services/user-service");
const { Role, User } = require("./models/index");
const app = express();
const prepareAndStartServer = async () => {
    // ... other code

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    app.use("/api", apiRoutes);
    app.listen(PORT, async () => {
        console.log("Server is listening on port: " + PORT);
        // if (process.env.DB_SYNC) {
        //     db.sequelize.sync({ alter: true })
        // }
        
    });
}
prepareAndStartServer();

