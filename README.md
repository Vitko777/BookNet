# BookNetRepo
`BookNet is web app for Purdue students that allows them to buy, sell and trade books.`

## Setup
`npm install`

`cd client`

`npm install`

`npm start`

### To run client and server simultaneously
`npm i express concurrently`

`npm i nodemon`

`npm run dev`

### Issues with dependencies for GiftedChat or @materialui
`cd client`

`npm i --save-dev react-web-gifted-chat @material-ui/core react-notifications`

If this removes "dev:" line in package.json, add this to the scripts...

`"dev": "nodemon server.js"`
