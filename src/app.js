const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { limiter } = require("./config/rateLimits");
require("./db/db-connection");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const MongoStore = require("connect-mongo");
const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");
const User = require("./models/user");
const Data = require("./models/data");

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const PORT = process.env.PORT || 3001;
const app = express();

const adminOptions = {
  resources: [User, Data],
};

const adminjs = new AdminJS(adminOptions);

const routerAdminJS = AdminJSExpress.buildAuthenticatedRouter(
  adminjs,
  {
    authenticate: async (login, password) => {
      const user = await User.findOne({ login });
      if (user) {
        //const matched = await bcrypt.compare(password, user.encryptedPassword);
        const matched = password === user.encryptedPassword;
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
