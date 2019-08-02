const os = require("os");
const fs = require("fs");
const manifest = require("./manifest");
const packageJson = require("./package");
const WebappWebpackPlugin = require("webapp-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  configureWebpack: {
    plugins: [
      new WebappWebpackPlugin({
        logo: "./src/assets/icon.png",
        prefix: "favicons-[hash:8]",
        favicons: Object.assign(
          {
            appName: manifest.name,
            appShortName: manifest.short_name,
            appDescription: manifest.description,
            background: manifest.background_color,
            icons: {
              android: true,
              appleIcon: false,
              appleStartup: false,
              coast: false,
              favicons: true,
              firefox: false,
              windows: false,
              yandex: false
            }
          },
          manifest
        )
      })
    ],
    // Turn off various NodeJS environment polyfills Webpack adds to bundles.
    // They're supposed to be added only when used, but the heuristic is loose
    // (eg: existence of a variable called setImmediate in any scope)
    node: {
      console: false,
      // Keep global, it's just an alias of window and used by many third party modules:
      global: true,
      // Turn off process to avoid bundling a nextTick implementation:
      process: false,
      // Inline __filename and __dirname values:
      __filename: "mock",
      __dirname: "mock",
      // Never embed a portable implementation of Node's Buffer module:
      Buffer: false,
      // Never embed a setImmediate implementation:
      setImmediate: false
    },
    resolve: {
      extensions: [".js"],
      alias: {
        "cash-dom": "cash-dom/dist/cash.esm.js"
      }
    }
  },
  chainWebpack: webpackConfig => {
    // Set the HTML meta tags
    webpackConfig.plugin("html").tap(args => {
      const [options] = args;
      Object.assign(options, {
        title: manifest.name,
        meta: {
          description: manifest.description
        },
        author: packageJson.author
      });

      return args;
    });

    // Disable workbox in legacy build, so we only get 1 precache manifest
    if (
      (process.env.VUE_CLI_MODERN_MODE && process.env.VUE_CLI_MODERN_BUILD) ||
      !process.env.VUE_CLI_MODERN_MODE
    ) {
      webpackConfig.plugin("workbox").use(WorkboxPlugin.GenerateSW, [
        {
          cacheId: packageJson.name,
          exclude: [/\.map$/, /manifest\.json$/],
          runtimeCaching: [
            {
              // To match cross-origin requests, use a RegExp that matches
              // the start of the origin:
              urlPattern: new RegExp(
                "^https://(?:countdown|newworld|paknsave).kiwiberry.nz/"
              ),
              handler: "NetworkFirst",
              options: {
                cacheName: "api",
                // Fall back to the cache after 10 seconds.
                networkTimeoutSeconds: 10,
                expiration: {
                  purgeOnQuotaError: true,
                  maxEntries: 1000,
                  maxAgeSeconds: 86400 // 1 day
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              // To match cross-origin requests, use a RegExp that matches
              // the start of the origin:
              urlPattern: /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
              handler: "CacheFirst",
              options: {
                cacheName: "images",
                expiration: {
                  purgeOnQuotaError: true,
                  maxEntries: 1000,
                  maxAgeSeconds: 31536000 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        }
      ]);
    }
  },
  productionSourceMap: false,
  devServer: {
    host: "localhost",
    https:
      process.env.NODE_ENV === "development"
        ? {
            key: fs.readFileSync(os.homedir() + "/.localhost_ssl/server.key"),
            cert: fs.readFileSync(os.homedir() + "/.localhost_ssl/server.crt")
          }
        : false
  }
};
