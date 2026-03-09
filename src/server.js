require("dotenv").config();

const express = require("express");

const loadExpress = require("./loaders/express.loader");
const loadRoutes = require("./loaders/routes.loader");

const app = express();

loadExpress(app);
loadRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port:  ${PORT}`);
});