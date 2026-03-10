require("dotenv").config();

const express = require("express");

const loadExpress = require("./loaders/express.loader");
const loadRoutes = require("./loaders/routes.loader");

const errorHandler = require("./middleware/errorHandler");

const app = express();

loadExpress(app);
loadRoutes(app);

const PORT = process.env.PORT || 3000;

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port:  ${PORT}`);
});