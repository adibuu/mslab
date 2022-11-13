const AdminJS = require("adminjs");
const AdminJSMongoose = require("@adminjs/mongoose");

const User = require("../models/user");
const Data = require("../models/data");
const { after, before } = require("./actions/password");
const {
  componentLoader,
  Components,
} = require("./components/componentsLoader");
const localeOptions = require("./i18n/options");

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
  locale: localeOptions,
  pages: {
    "Średnia z danych": {
      handler: async () => {
        return { data: "dupa" };
      },
      component: Components.DataAverage,
      icon: "ChartAverage",
    },
  },
};

const adminjs = new AdminJS(adminOptions);

module.exports = adminjs;
