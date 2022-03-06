# TiFoSi App Web
Web application that allows you to configure the Tifosi application, which is a computational tool to simulate the cellular dynamics of planar epithelia.

The entire application is developed in javascript, mainly using [React](https://reactjs.org/), a library for building user interfaces.

The app can be accessed through the following link [Tifosi Web](https://lsymserver.uv.es/lsym/Tifosi)

## Quick Guide to building

### Prerequisites:
To install the Web App, **nodejs version 16.14** (includes npm manager 8.3.1), **git**, **Python 3** and **Visual studio** are needed.  
 
#### WINDOWS
* Installation of **nodejs**
1) Download the Windows installer of [nodejs](https://nodejs.org/) corresponding to the 16.14.0 LTS version 
2) Execute the _.msi_ file and follow the _Nodejs Setup_ instructions
3) Check the version of the node via the terminal (run as admnistrator)
 ```console 
 node -v  
>> v16.14.0 
```

* Installation of **git** 
1) Download the Windows installer of [git](https://gitforwindows.org/) 
2) Execute the _.exe_ file and follow the _Git Setup_ instructions

* Installation of **Python 3** 
1) Download the Windows installer of [Python 3](https://www.python.org/downloads/windows/) 
2) Execute the _.exe_ file and follow the _Python3 Setup_ instructions

* Installation of **Visual Studio** 
1) Download the Windows installer of [Visual Studio](https://visualstudio.microsoft.com/downloads/) 
2) Execute the _.exe_ file and follow the _Visual Studio Setup_ instructions
 
#### LINUX

* Option 1: Installation using Linux installer
1) Download the Linux installer of [nodejs](https://nodejs.org/en/download/) version 16.14.0
1) dddd
2) dddd

* Option 2: Installation from the terminal 
 1) Run the following command line: 
```console 
sudo apt update && sudo apt install --assume-yes curl
curl --silent --location https://deb.nodesource.com/setup_10.x  | sudo bash -
sudo apt install --assume-yes nodejs
```
2) Check the version installed using ```node -v ```. If the version is not 16.14.0 then follow steps 3 and 4. 
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
Check that it is well installed with the command ```command -v nvm ``` which should return ```nvm ```

4) Install the 16.14.0 version executing ```nvm install 16.14.0```

5) Check the node version
```console 
node -v 
>> v16.14.0 
```

**Note:** Git is supposed to be already installed in LINUX. If not the case, execute in the terminal ```sudo apt-get install git ```


 
### Command line build instructions:

Now that the required packages are installed, the installation of the Web App can start. 
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

