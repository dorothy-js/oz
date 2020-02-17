# Pollon CLI
### Development tools for Pollon
The Pollon CLI creates, manages and builds your Pollon applications. It is still in the early stages of development but its core functionalities are functional.

#### Note for early adopters
As the time of writing the Pollon JS is not yet published on NPM and we plan to do it ASAP. Until then you can clone all the pollon-js related repositories and publish them in a private NPM registry like [Verdaccio](https://verdaccio.org/)

All the relevant packages are:

1. [Light DOM](https://github.com/pollon-js/light-dom). A lightweight utility to work with the DOM;
2. [Message Broker](https://github.com/pollon-js/message-broker). A message broker implementation for the Pollon framework;
3. [State Machine](https://github.com/pollon-js/state-machine). An event based finite state machine implementation for the Pollon framework;
4. [Juice DSL](https://github.com/pollon-js/juice-lang).An Handy DSL that helps to decouple the user interaction from the business logic in a frontend application;
5. [Pollon](https://github.com/pollon-js/pollon). The actual framework;
6. [Juice plugin](https://github.com/pollon-js/juice). Custom Juice behaviours for the Pollon framework;
7. [HTTP plugin](https://github.com/pollon-js/http). A tiny wrapper around the fetch API;
8. [Systemjs plugin](https://github.com/pollon-js/system-js). SystemJS module loader for the Pollon framework;
9. [Knockout plugin](https://github.com/pollon-js/knockout). A plugin that enables [Knockoutjs](https://knockoutjs.com/) as a template engine. A [Vue](https://vuejs.org/) plugin is in the making;
 

# Getting Started

## Installation

To get started locally, we need to clone the repo and `npm link` it to make it work globally on your machine.
As the Pollon CLI become more stable, it will be available via npm for you to install. For now, follow these instructions:

1. Clone this repository to your local computer using `git`.
1. Make sure that you have Node and NPM installed on your machine. See instructions [here](https://nodejs.org/en/download/).
1. Make sure that you have `@babel/cli` installed globally. See instructions [here](https://babeljs.io/docs/en/babel-cli)
1. Run `sudo npm link` (no arguments) from the root of your clone of this application to install it globally.

## Help me!

The Pollon CLI is in the early stages of development, but still, it comes with a built-in command helper.
As you would expect, you can inspect all the CLI commands just by typing:

`pollon help`

## Create a new Application

You can create a new application using the Pollon CLI via this command:

`pollon app:new <application-name>`

Answer to some questions regarding the application you are going to create and you are good to go.
What happens under the hood is as follow:

1. A folder named after your application is created;
1. All the application's NPM dependencies are installed;
1. The application is built by the CLI against all the configurations given; 

## Create a module

You can create a new module using the Pollon CLI via this command:

`pollon module:new <module-name>`

Answer to some questions regarding the module you are going to create and you are good to go.
What happens under the hood is as follow:

1. A folder named after your module is created;
1. The pollon.json file is being updated accordingly;
1. The application is built by the CLI against all the configurations given; 

### Run the application

After you created your application, you can `cd` into the application folder and run it.
The Pollon CLI doesn't ship with an http server on its own, so you need to use something like [http-server](https://www.npmjs.com/package/http-server) to serve your newly created application.

## Development and deploy

Whenever you make update to your Pollon application you need to rebuild it in order to see those update.
You can do it using the Pollon CLI via this command:

`pollon app:build`

inside the application folder.

If you are in heavy development mode, you can automate this process by setting up a watcher on the `app/**` folder.

`pollon app:build --watch`

> **Note:** this command may need to be run with sudo privileges in order to increase the system limit for number of file watchers.
> Even if it is not advisable to run CLI commands as root, you should be fine in a development environment.
