# Dungeons_and_Dragons_AI_Master

A multiple AI based dungeons and dragons game master.

## Pre-Installation Setup

Before starting the installation, please ensure that you have Node.js and npm correctly set up on your system.

1. Install Node.js:

    - Visit the official Node.js website at [https://nodejs.org](https://nodejs.org).
    - Download the recommended version for your operating system and follow the installation instructions provided by the installer.

2. Verify the installation:
    - Open a new terminal or command prompt window.
    - Run the following commands to verify that Node.js and npm are installed correctly:
        ```shell
        node --version
        npm --version
        ```
    - You should see the installed versions of Node.js and npm without any errors.

## Installation

1. Clone this repository to your local machine.
    ```shell
    git clone https://github.com/Nedyar/AutoDM.git
    ```
2. Navigate to the project directory.
    ```shell
    cd AutoDM
    ```
3. Install the dependencies using npm.
    ```shell
    npm install
    ```

## Configuration

Before running the API, make sure to include the `secrets` folder in the project directory. This folder must contain the .env file, where there which must be like this:

```shell
NAME = "AutoDM"
API_KEY = <YOUR OPEN AI KEY>
TYPE = "code_interpreter"
MODEL = "gpt-3.5-turbo-1106"

```

## Usage

To start the API, run the following command:

```shell
npm start
```

This will start the server, and the API will be available at [http://localhost:3000](http://localhost:3000).
