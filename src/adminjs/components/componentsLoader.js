const { ComponentLoader } = require("adminjs");

const componentLoader = new ComponentLoader();

const Components = {
  DataAverage: componentLoader.add("DataAverage", "./DataAverage"),
};

componentLoader.override("DashboardRoute", "./Dashboard");

module.exports = { componentLoader, Components };
