# Grocery Wise

Grocery Wise is a web app to do grocery price comparison among Countdown, New 
World and Pak'nSave in New Zealand.

## Project setup

* Install dependencies: `npm install`
* Compiles and hot-reloads for development: `npm run serve`
* Compiles and minifies for production: `npm run build`
* Lints and fixes files: `npm run lint`
* Run your end-to-end tests: `npm run test:e2e`
* Run your unit tests: `npm run test:unit`

For customize configuration, see [Configuration Reference](https://cli.vuejs.org/config/).

Remember to [set up EditorConfig for your preferred editor](https://editorconfig.org/#download).

### Required Environment Variables

#### During Build

* VUE_APP_COUNTDOWN_PROXY
* VUE_APP_COUNTDOWN_IMAGE_BASE
* VUE_APP_NEWWORLD_PROXY
* VUE_APP_PAKNSAVE_PROXY

#### During Deployment

* NETLIFY_AUTH_TOKEN
* NETLIFY_SITE_ID

For local development, copy `.env.template` as `.env.local`
and adjust the environment variable values there.
