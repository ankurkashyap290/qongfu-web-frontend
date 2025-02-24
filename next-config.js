const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withTypescript = require("@zeit/next-typescript");
const path = require("path");
module.exports = withPlugins(
  [
    withCSS,
    {
      cssLoaderOptions: {
        url: false,
      },
    },
  ],
  [withTypescript],
  {
    webpack(config, options) {
      config.resolve.modules.push(path.resolve("./"));
      return config;
    },
  },
  {
    useFileSystemPublicRoutes: false,
  }
);
