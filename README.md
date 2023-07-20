![example workflow](https://github.com/alejandroN99/Sprint6/actions/workflows/pipeline.yml/badge.svg)

# Dice Game (Sprint 6)

## Description

This application was built as part of the Node.js IT Academy curriculum. The primary objective was to learn how to implement persistent databases using a MySQL relational database and a NoSQL database (MongoDB) with Docker. The app currently allows you to add players to a database and have a player roll 2 dice. If the sum between the 2 dice equals 7, the player wins. Anything else is a loss. The app also keeps track of all the players dice rolls and calculates a win percentage. Which then can be used to rank the players from best to worst, get a winner and a loser.

## Installation 

To install this application, you need to have Docker installed on your computer. If you don't have it, you can download it from [here](https://www.docker.com/products/docker-desktop).

You will also need MySQLWorkbench to create a user for the MySQL database. You can download it from [here](https://dev.mysql.com/downloads/workbench/).

Once installed open the MySQLWorkbench app. Create a new connection. Keep the default setting. `Hostname: 127.0.0.1`, `Port: 3306` you can name the connection `sprint6`. You will be prompted to create a password for the root user. Once you have done that, you can create a new user by clicking on the `Users and Privileges` tab. Click on the Add Account button. Enter a username and password. Make sure the account has all privileges.

You can also run the following queries to create the database and user:  
```sql
CREATE DATABASE IF NOT EXISTS sprint6;
CREATE USER 'juan1'@'%' IDENTIFIED BY '1234';
GRANT ALL privileges ON * . * TO 'juan1'@'%';
``````

Once you have Docker and MYSQLWorkbench setup, you need to clone this repository. You can do it by downloading the zip file or by running this command on your terminal:

```bash
git clone https://github.com/alejandroN99/Sprint6.git
```

Once you have the repository on your computer, you need to open a terminal on the root folder of the project and run this command:

```bash
docker-compose build
```

followed by 

```bash
docker-compose up
```

This will build the images for the MySQL and MongoDB databases and run them. 

Once they are running you can access the app at http://localhost:8000/

## MongoDB

You can also use this app with MongoDB to do so you need to install MongoDB Compass. You can download it from [here](https://www.mongodb.com/try/download/compass).

Once you have it installed create a "New Connection" with the following URI:
`mongodb://localhost:27017`

Then you need to open a terminal on the root folder of the project and run this command to start the sever:

```bash
npm run mongo
```

and to start the front-end, in a new terminal run:
```bash
npm run front
```

## API Endpoints

### Create a new player

- **DESCRIPTION:** Create a new player. If no name is provided it will assign the ANÒNIM name to the player. If you try to create a player with a name that is already being used by another player, the request will fail.
- **URL:** `http://localhost:3000/players/:name?`
- **Method:** POST
- **Response:**

  - **Status Code:** 201 (Created)

#### cURL example:
```shell
curl -X POST -H "Content-Type: application/json" -d '{"name": "Jose"}' http://localhost:3000/players/Jose
```

### Update player name

- **DESCRIPTION:** Update the name of a player by id. If the name is already being used by another player, the request will fail.
- **URL:** `http://localhost:3000/players/:id/:updateName`
- **Method:** PUT
- **Request URL Parameters:**
  - `id`: Player ID
  - `updateName`: New player name
- **Response:**

  - **Status Code:** 200 (OK)

#### cURL example:
```shell
curl -X PUT http://localhost:3000/players/:id/:updateName
```

### Get all players

- **DESCRIPTION:** Get all players in the database.
- **URL:** `http://localhost:3000/players`
- **Method:** GET
- **Response:**

  - **Status Code:** 200 (OK)

#### cURL example:
```shell
curl -X GET http://localhost:3000/players
```

### Player roll

- **DESCRIPTION:** Roll 2 dice for a player by id. If the sum of the dice equals 7, the player wins. Anything else is a loss. 
- **URL:** `http://localhost:3000/games/:id`
- **Method:** POST
- **Request URL Parameters:**
  - `id`: Game ID
- **Response:**

  - **Status Code:** 200 (OK)

#### cURL example:
```shell
curl -X POST http://localhost:3000/games/:id
```

### Delete player rolls

- **DESCRIPTION:** Delete all rolls for a player by id.
- **URL:** `http://localhost:3000/games/:id`
- **Method:** DELETE
- **Request URL Parameters:**
  - `id`: Game ID
- **Response:**

  - **Status Code:** 200 (OK)

#### cURL example:
```shell
curl -X DELETE http://localhost:3000/games/:id
```

### Get all player rolls

- **DESCRIPTION:** Get all rolls for a player by id.
- **URL:** `http://localhost:3000/games/:id`
- **Method:** GET
- **Request URL Parameters:**
  - `id`: Game ID
- **Response:**

  - **Status Code:** 200 (OK)

#### cURL example:
```shell
curl -X GET http://localhost:3000/games/:id
```

### Get ranking

- **DESCRIPTION:** Get all players in the database ordered by win percentage from best to worst.
- **URL:** `http://localhost:3000/ranking`
- **Method:** GET
- **Response:**

  - **Status Code:** 200 (OK)

#### cURL example:
```shell
curl -X GET http://localhost:3000/ranking
```

### Get losing player

- **DESCRIPTION:** Get the player with the lowest win percentage.
- **URL:** `http://localhost:3000/ranking/loser`
- **Method:** GET
- **Response:**

  - **Status Code:** 200 (OK)

#### cURL example:
```shell
curl -X GET http://localhost:3000/ranking/loser
```

### Get winning player

- **DESCRIPTION:** Get the player with the highest win percentage.
- **URL:** `http://localhost:3000/ranking/winner`
- **Method:** GET
- **Response:**

  - **Status Code:** 200 (OK)

#### cURL example:
```shell
curl -X GET http://localhost:3000/ranking/winner
```

Please note that you may need to replace `:id` and `:updateName` with the actual values when making requests.

## Database Structure

### MySQL

<img width="367" alt="Screenshot 2023-07-19 at 10 18 48" src="https://github.com/alejandroN99/Sprint6/assets/36825759/c7ce084f-4ce8-41c7-82da-38b9793bba95">

Table: players

id (Primary Key, Integer): The unique identifier for each player.
name (String): The name of the player.
date (String): A string representing the date associated with the player (format not specified).
winPercentage (Float): The win percentage of the player.
createdAt (Date): The timestamp for when the player record was created.
updatedAt (Date): The timestamp for when the player record was last updated.
Table: rolls

id (Primary Key, Integer): The unique identifier for each roll.
roll1 (Integer): The value of the first dice roll.
roll2 (Integer): The value of the second dice roll.
total (Integer): The sum of the two dice rolls.
result (String): The result of the roll (e.g., "You win!", "You lose!").
createdAt (Date): The timestamp for when the roll record was created.
updatedAt (Date): The timestamp for when the roll record was last updated.
playerId (Integer): A foreign key that references the id column in the players table, indicating the player associated with the roll.

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

-dist: contains the final javascript output from the typescript transpilation.

-tests: contains all the tests made to ensure the app functions as expected.

-website: contains all the React assets to build the user front-end for the application.

## Contributing

Thank you for considering contributing to the Dice Game project! We welcome and appreciate your contributions, whether it's reporting issues, suggesting improvements, or submitting pull requests.

To contribute to the project, please follow these guidelines:

### Bug Reports and Feature Requests

If you encounter any bugs or have ideas for new features, please submit an issue on the GitHub repository. When submitting an issue, provide a clear and detailed description of the problem or feature request, along with any relevant information or steps to reproduce the issue.

### Pull Requests

We gladly accept pull requests that address bug fixes, code improvements, or new features. Before submitting a pull request, please ensure the following:

1. Fork the repository and create a new branch for your changes.
2. Make your code changes, following the project's coding style and guidelines.
3. Write tests to cover your changes and ensure they pass.
4. Update the documentation, including the README file, if necessary.
5. Submit a pull request, providing a clear description of the changes and any related issue numbers.

### Code of Conduct

We expect all contributors to follow the project's [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and considerate in all interactions and discussions within the project community.

Thank you for your interest in contributing to the Dice Game project! Your contributions are valuable and help improve the project for everyone.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

The Apache License 2.0 is an open-source license that permits you to use, modify, and distribute the project's code, both for commercial and non-commercial purposes. It provides you with extensive permissions while also disclaiming any warranties or liabilities.

You can find more information about the Apache License 2.0 at: [https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)

Please review the [LICENSE](LICENSE) file for the full text of the Apache License 2.0.
