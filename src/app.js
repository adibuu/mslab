const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("./db/db-connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());

app.listen(PORT, () => console.log("Server is running on " + PORT));
