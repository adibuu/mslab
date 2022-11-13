const { ComponentLoader } = require("adminjs");

const componentLoader = new ComponentLoader();

componentLoader.override("DashboardRoute", "./Dashboard");

module.exports = componentLoader;
