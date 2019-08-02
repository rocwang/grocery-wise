const { startCase } = require("lodash");
const { name, description } = require("./package");

module.exports = {
  name: startCase(name),
  short_name: startCase(name),
  description: description,
  lang: "en",
  orientation: "portrait-primary",
  scope: "/",
  start_url: "/",
  display: "standalone",
  dir: "ltr",
  background_color: "#00a3da",
  theme_color: "#00a3da"
};
