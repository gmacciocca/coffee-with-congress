# Coffee With Congress
This is the frontend Single Page App of this projectg
It is written in Javascrupt (ES6), and it uses

- node.js to manage packages and build scripts ***(node v4.4.1 or higher)***
- gulp to help build scripts
- babel to dumb it down to ES5
- browserify to create the web bundle
- sass for CSS classes extensions

## Clone this repo
To clone this repo on your local computer:
`git clone feature/model_and_admin_interface`

## Install dependencies
`cd` into the `frontend` folder then run `npm install`. Have some coffee... :)
 
## Deployable static resources
To build the static resources that can be served from the webserver run the build script `npm run build`

This will generate all static resources in the `public` sub-directory. Full path to this direcotry in the repo is `/frontend/public/`.

***NOTE*** that as of this writing the static resources are **not** being minified/uglified

## Debug the frontent
To build and serve this app locally from your computer run `npm start`. This will start a local http server and you can load the app by opening your browser to `http://127.0.0.1:8080/#/`.

***NOTE*** that as of this writing the debug process is not very optimized. It will rebuild when local source files are edited, but it does so in a non optimized way (so it taks a few seconds), and does not automatically reload the browser page, so a manual page refresh is necessary, once the rebuild is completed.
