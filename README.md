# react-skeleton
Simple boilerplate for React apps based on create-react-app include **scss modules**

No configuration or complicated folder structures, just the files you need to build your app.<br>
Once the installation is done, you can run some commands inside the project folder:

### `npm start` or `yarn start`
Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.
### `npm run build` or `yarn build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test` or `yarn test`
Runs the test watcher in an interactive mode.
By default, runs tests related to files changed since the last commit.

### Docker
You can want to use Docker for production.
For this should use following commands:
1) build image `docker build . -t react_skeleton`
2) run container `docker run -p 8080:80 react_skeleton`

### docker-compose
```docker-compose
version: '2'
 services:
   react_skeleton:
     container_name: react_skeleton
     build: <folder path to Dockerfile> 
     ports:
       - "8080:80"
  ```
  ### `lint-staged`
  Run linters against staged git files and don't let 💩 slip into your code base!
  <br>See[lint-staged](https://github.com/okonet/lint-staged)
  
  ###Prettier
  [See](https://github.com/prettier/prettier).
  This boilerplate include auto formatting code before each `git commit`
  You can change rules for formatting just edit `.prettierrc`
  or you can remove this feature remove from `package.json`  
  ```bash
 "lint-staged": {
    "*.{js,jsx}": [
      "prettier --config .prettierrc --write",
      "git add"
    ]
  },
```

