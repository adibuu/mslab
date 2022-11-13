const AdminJS = require("adminjs");
const AdminJSMongoose = require("@adminjs/mongoose");

const User = require("../models/user");
const Data = require("../models/data");
const { after, before } = require("./actions/password");
const componentLoader = require("./components/componentsLoader");

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const sidebarGroups = {
  user: {
    icon: "User",
  },
  data: { icon: "Document" },
};

const adminOptions = {
  resources: [
    {
      resource: User,
      options: {
        navigation: sidebarGroups.user,
        properties: {
          encryptedPassword: {
            isVisible: false,
          },
          password: {
            type: "password",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            after: after,
            before: before,
          },
          edit: { after: after, before: before },
        },
      },
    },
    {
      resource: Data,
      options: {
        navigation: sidebarGroups.data,
        sort: {
          sortBy: "date",
          direction: "desc",
        },
      },
    },
  ],
  componentLoader,
  branding: {
    companyName: "MSLAB",
    logo: null,
    withMadeWithLove: false,
  },
};

const adminjs = new AdminJS(adminOptions);

module.exports = adminjs;
