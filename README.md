# TiFoSi App Web
TiFoSi App Web is an application that allows you to configure the Tifosi application, which is a computational tool to simulate the cellular dynamics of planar epithelia.

The entire application is developed in javascript, mainly using [React](https://reactjs.org/), a library for building user interfaces.

The app can be accessed through the following link [Tifosi Web](https://lsymserver.uv.es/lsym/Tifosi)

## Quick Guide to building

### Prerequisites:
To install the Web App, **Nodejs version 16.14** (includes npm manager 8.3.1), **Git**, **Python 3** and **Visual studio (C++)** are needed.  
 
#### WINDOWS SETUP
* **Nodejs**
1) Download the Windows installer of [Nodejs](https://nodejs.org/) corresponding to the 16.14.0 LTS version 
2) Execute the _.msi_ file and follow the _Nodejs Setup_ instructions
3) Check the version of the node via the terminal (run as admnistrator)
 ```console 
 node -v  
>> v16.14.0 
```

Note that you are free to install _Nodejs_ via the terminal as long as you install the good version (16.14.0). 

* **Git** 
1) Download the Windows installer of [Git](https://gitforwindows.org/) 
2) Execute the _.exe_ file and follow the _Git Setup_ instructions

* **Python 3** 
1) Download the Windows installer of [Python 3](https://www.python.org/downloads/windows/) 
2) Execute the _.exe_ file and follow the _Python3 Setup_ instructions

* **Visual Studio (C++)** 
1) Download the Windows installer of [Visual Studio](https://visualstudio.microsoft.com/downloads/) **with C++**
2) Select the **Community** file
3) Execute the _.exe_ file and follow the _Visual Studio Setup_ instructions

#### LINUX SETUP

* **Nodejs** 

**Option 1:** Installation using Linux installer
1) Download the Linux installer of [nodejs](https://nodejs.org/en/download/) version 16.14.0
1) dddd
2) dddd

**Option 2:** Installation from the terminal 
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

* **Git** 

Git is supposed to be already installed in LINUX. If not the case, you can follow those [instructions](https://git-scm.com/download/linux).

* **Python 3**

To install or update Python, you can follow those [instructions](https://docs.python-guide.org/starting/install3/linux/).

* **Visual studio (C++)** 

To install Virtual Studio, you can follow those [instructions](https://code.visualstudio.com/docs/setup/linux). Do not forget to download the [C++ extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools). 
 
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

