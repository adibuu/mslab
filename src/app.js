const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { limiter } = require("./config/rateLimits");
require("./db/db-connection");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const MongoStore = require("connect-mongo");
const AdminJSExpress = require("@adminjs/express");
const User = require("./models/user");
const adminjs = require("./adminjs");

const PORT = process.env.PORT || 3001;
const app = express();

const routerAdminJS = AdminJSExpress.buildAuthenticatedRouter(
  adminjs,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ email });
      if (user) {
        const matched = await bcrypt.compare(password, user.encryptedPassword);
        if (matched) {
          return Promise.resolve(user);
        }
      }
      return null;
    },
    cookieName: "adminjs",
    cookiePassword: process.env.COOKIE_PASSWORD,
  },
  null,
  {
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      ttl: 1 * 9 * 60 * 60,
    }),
    resave: false,
    saveUninitialized: true,
    name: "adminjs",
  }
);

app.use(adminjs.options.rootPath, routerAdminJS);
app.use(helmet());
app.use(cors());
app.use(limiter);

app.listen(PORT, () =>
  console.log(
    `Server is running on http://localhost:${PORT}${adminjs.options.rootPath}`
  )
);
