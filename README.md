# ANISE
ANISE (grAphical coNfigurator of TiFoSi In Silico Experiments) is an application that allows you to configure the input file of TiFoSi (Tissues: Forces & Signalling) which is a computational tool to simulate the cellular dynamics of planar epithelia. 

The entire application is developed in javascript, mainly using [React](https://reactjs.org/), a library for building user interfaces.

The app can be accessed through the following link [Tifosi Web](https://lsymserver.uv.es/lsym/ANISE/)

## Quick Guide to building

### Prerequisites:
To install ANISE, **Nodejs version 16.14** (includes **npm**) and **Git** are needed. 

To note, some npm modules need to be compiled with **Python** and a **C++ Compiler**. Once installed, it is recommended to update npm to the latest version (version > 8.3.1) using ```npm install -g npm@latest```.  
 
#### WINDOWS SETUP

* **Nodejs**
1) Download the Windows installer of [Nodejs](https://nodejs.org/) corresponding to the 16.14 LTS version 
2) Execute the _.msi_ file and follow the _Nodejs Setup_ instructions. \
**Warning**: select "Automatically install the necessary tools" to install **Python** and **Visual Studio Build Tools** as well. 
3) Check the version of the node. 
 ```console 
 node -v  
>> v16.14.
```


* **Git** 
1) Download the Windows installer of [Git](https://gitforwindows.org/) 
2) Execute the _.exe_ file and follow the _Git Setup_ instructions
 
Note that you are free to install the packages via the terminal as long as you install the good version of _Nodejs_ (16.14). 

#### LINUX SETUP

* **Nodejs** 

There are 2 options to install nodejs in your Linux machine.

**Option 1:** Installation using the Linux binaries (tested version 16.14.2)
1) Download the linux binaries of [nodejs](https://nodejs.org/en/download/) version 16.14.
2) Copy the downloaded file to the desired directory, your HOME for example. ```cp node-v16.14.2-linux-x64.tar.xz $HOME```.
3) Change to that directory using ```cd /home``` 
4) Extract the data using ```tar xvf node-v16.14.2-linux-x64.tar.xz```.
5) Modify the PATH environment variable adding the path to the extracted *bin* folder. 
    1) Update the PATH only on the current terminal:  ```PATH="$HOME/node-v16.14.2-linux-x64/bin:$PATH"```. 
    2) Update the PATH for the current user (not needed to be root). Add in the *~/.bashrc* file the next line: ```export PATH="$HOME/node-v16.14.2-linux-x64/bin:$PATH"```. 
    3) Update the current terminal with ```source ~/.bashrc```.
6) Check the version with ```node -v```

**Option 2:** Installation from the terminal 
 1) Run the following command line: 
```console 
sudo apt update && sudo apt install --assume-yes curl
curl --silent --location https://deb.nodesource.com/setup_10.x  | sudo bash -
sudo apt install --assume-yes nodejs
```
2) Check the version installed using ```node -v ```. If the version is not 16.14 then follow the next steps.

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
```
Check that it is well installed with the command ```command -v nvm ``` which should return ```nvm ```

4) Install the 16.14 version executing ```nvm install 16.14.1```

5) Check the node version
```console 
node -v 
>> v16.14.
```

* **Git** 

Git is supposed to be already installed in LINUX. If not the case, you can follow those [instructions](https://git-scm.com/download/linux).

 
### Command line build instructions:

* **Installation of the App** 

Now that the required packages are installed, the installation of ANISE can start. Execute the following command lines in the terminal:
```console
git clone https://github.com/LSyM-UVEG/TiFoSiAppWeb
cd TiFoSiAppWeb
npm install
```
Note for Windows: the command lines have to been run in the **Windows PowerShell**. 

* **Launch of the App** 

Now you can run depending on what you prefer ```npm start``` or ```npm run build``` (see explanations bellow).


##### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) if the browser doesn't appear automatically. 

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

- For code editing you can open the main directory using [Visual Code](https://code.visualstudio.com/).

