# TiFoSi App Web
Web application that allows you to configure the Tifosi application, which is a computational tool to simulate the cellular dynamics of planar epithelia.

The entire application is developed in javascript, mainly using [React](https://reactjs.org/), a library for building user interfaces.

The app can be accessed through the following link [Tifosi Web](https://lsymserver.uv.es/lsym/Tifosi)

### Quick Guide to building

#### Prerequisites:
 [nodejs] version 16.14 (It includes Python and npm manager)
 [git]
 
LINUX:
 * Option 1: Installation of version 16.14.0 via (https://nodejs.org/) 
 * Option 2: Installation from ```console sudo apt install nodejs ```
 ** 1) Check the version by using ```console node -v ```. If the version is not 16.14.0 then follow step 2. 
 ** 2) 
 WINDOWS:
 * 1) Install version 16.14.0 of [nodejs] (https://nodejs.org/) 
 * 2) Install [git] (https://gitforwindows.org/) 
 
#### Command line build instructions:
```console
git clone https://github.com/LSyM-UVEG/TiFoSiAppWeb
cd TiFoSiAppWeb
npm install
npm start or npm run build
```

##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

- For code editing you can open the main directory using [Visual Code](https://code.visualstudio.com/).

