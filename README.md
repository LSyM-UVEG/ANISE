# TiFoSi App Web
Web application that allows you to configure the Tifosi application, which is a computational tool to simulate the cellular dynamics of planar epithelia.

The entire application is developed in javascript, mainly using [React](https://reactjs.org/), a library for building user interfaces.

The app can be accessed through the following link [Tifosi Web](https://lsymserver.uv.es/lsym/Tifosi)

## Quick Guide to building

### Prerequisites:
To install the Web App, **nodejs version 16.14**  (includes Python and npm manager 8.3.1) and **git** are needed. 
 
#### WINDOWS
* Installation of **nodejs**
1) Download the Windows installer of [nodejs](https://nodejs.org/) corresponding to the 16.14.0 LTS version 
2) Execute the .msi file and follow the Nodejs.Setup instructions
3) Check the version of the node via the terminal (run as admnistrator)
 ```console 
 node -v  
>> v16.14.0 
```

* Installation of **git** 
1) Download the Windows installer of [git](https://gitforwindows.org/) 
2) Execute the .exe file and follow the Git.Setup instructions
 
#### LINUX
* Option 1: Install version 16.14.0 of [nodejs](https://nodejs.org/en/download/) downloading the .tar
1) dddd
2) dddd

* Option 2: Installation from the terminal 
 1) Run the following command line: 
```console 
sudo apt update && sudo apt install --assume-yes curl
curl --silent --location https://deb.nodesource.com/setup_10.x  | sudo bash -
sudo apt install --assume-yes nodejs
```
2) Check the version installed using ```console node -v ```. If the version is not 16.14.0 then follow steps 3 and 4. 
3) The node version can be changed with Node Version Manager (nvm). Execute the following command line. 
```console 
curl -sL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh -o install_nvm.sh
```
or
```console 
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

In the URL below make sure you replace v0.39.1 with the latest version of nvm. Then, 

```console 
bash install_nvm.sh
export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  source ~/.bash_profile
```
Check that it's installed with the command ```console command -v nvm ``` which should return ```nvm ```

4) Install the 16.14.0 version executing ```console nvm install 16.14.0```

Check it using ```console node -v ``` which should give ```>> v16.14.0 ```

Note: Git is supposed to be installed in LINUX. 


 
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

