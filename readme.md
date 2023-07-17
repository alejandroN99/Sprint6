# Dice game

## Purpose

This application allows players to enjoy a nice dice match. Players need to sign up (or be anonymous) so they can roll 2 dices. If the sum between the 2 numbers equals 7, the player wins. Anything else is a loss.

## Stack

The technology used to build this app is:

-Node.js: a javascript runtime built on Chrome's V8 JavaScript engine, which allows to use this language in the server and not only in the client.

-Typescript: a javascript superset, helps greatly at reducing errors during the bulding process and vastly improves code readability.

-Express: a Node.js framework that simplifies the process of creating APIs. It has become the defacto standard to build servers with Node.

-Sequelize: a Node.js object relational mapper for SQL databases. It helps to reduce database building time and prevent common vulnerabilites (SQL injection).

-Mongoose: a Node.js object data modeling for MongoDB. It's purpose is similar to Sequelize.

-Docker: a platform to bundle an application and all it's components and dependencies to ensure the application runs perfectly anywhere, without set-up issues.

-Jest: a Facebook library made for testing applications in Node.js.

-React: a Facebook library that allows to build a front-end with reusable components.

-Vite: a javascript framework focused on performance and ease of use for developers. It barely requires set-up.

-Git: a control version system that allows to keep track of the files in a project, test different new features without overriding the base code, work in collaboration with other devs and have an online repository of the project on Github, a hosting service for Git.

## App structure

On the root level there's a lot of config files (package.json, tsconfig.json, jest.config.json, node_modules folder...) and the main folders for the project. This folders are:

-src: contains the main logic of the application. It has 2 main subfolders, 1 for MySQL and 1 for MongoDB. Each one has the necessary functions to store and manipulate the user data for the game to work and the logic of the game itself.

-dist: contains the final javascript output from typescript.

-tests: contains all the tests made to ensure the app functions work as expected.

-website: contains all the React assets to build the user front-end for the application.