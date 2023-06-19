### Remi Test Front-end: FUNNY MOVIES

- This is a simple template project Reactjs with Typescript, the main features are: Login, register, share youtube video and push notification to users via websocket + background job
- Need improve in the future: integrate Google Cloud Message to listen and display push notifications when the website is closed.

- Technical: [Reactjs](https://reactjs.org), [Typescript](https://www.typescriptlang.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [Reselect](https://github.com/reduxjs/reselect), [Bootstrap v5](https://getbootstrap.com/), [Socket io client](https://github.com/socketio/socket.io-client#readme), [formik](https://formik.org/), [Axios](https://axios-http.com/docs/intro) ...etc
- Source code back-end: [Click here](https://github.com/tientd58/remi-test-backend)

## Required

1. Install Nodejs (from version 16) [click here](https://nodejs.org/en)
2. Heroku account [click here](https://heroku.com) if you want to deploy with heroku
3. Init project with [Create React App with Typescript](https://create-react-app.dev/docs/adding-typescript/).

## Use for development

1. `git clone https://github.com/tientd58/remi-test-frontend.git`
2. `yarn` or `npm install`
3. Add ENV files for 3 environments: development, staging, production with the format `.env.<env name>`, the variable names referenced in the file `.env.example`
4. Start local web: `yarn start` or `npm start`
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Preview build project
```
1. Build project: yarn build or npm run build
2. Start peview: yarn start or npm start
```

## Deployment with heroku
- Refer: [Guide](https://devcenter.heroku.com/articles/git)

## Done

1. Config project reactjs with typescript
2. Use scss with node-sass
4. Deploy with heroku
5. Integrate redux-toolkit
6. Integrate socket-io-client listen push notification from background job server
7. Integrate authen & author by jwt webtoken
8. Integrate youtube video in website

## Demo [click here](https://remi-test-web-673dcc75836e.herokuapp.com/)

## Licence: MIT
