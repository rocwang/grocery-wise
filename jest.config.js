module.exports = {
  collectCoverageFrom: [
    "!**/__fixtures__/**",
    "!src/main.js",
    "!src/.eslintrc.js",
    "src/**/*.{js,jsx,vue}"
  ],
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "^lodash-es$": "lodash",
    "^workbox-window/Workbox.mjs$": "workbox-window"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)",
    "<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)",
    "**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/",
  testPathIgnorePatterns: ["/node_modules/", "/__fixtures__/"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ]
};
