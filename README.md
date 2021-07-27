<h1 align="center">API REST - Javascript</h1>

<p align="justify">
This project aims to materialize my knowledge in building rest apis with javascript and node.js. It simulates a simple organizational structure that has administrators and members, and these administrators are responsible for actions in the system.
</p>

## Tech

- <a href="https://www.javascript.com/" target="_blank">JavaScript</a>
- <a href="https://nodejs.org/en/" target="_blank">Node.js</a>
- <a href="https://expressjs.com" target="_blank">Express</a>
- <a href="https://sequelize.org/" target="_blank">Sequelize ORM</a>
- <a href="https://jestjs.io/" target="_blank">Jest</a>
- <a href="https://swagger.io/docs/" target="_blank">Swagger Docs</a>
- <a href="https://jwt.io/" target="_blank">JWT</a>

---

## Installation

First of all, you need to install this project in your environment.

```bash
git clone https://github.com/devwander/rest_api-javascript

# NPM
npm install --save-dev

# Yarn
yarn install --save-dev
```

---

## Development variables

For this project to run in your environment, a ".env" file must be created containing the necessary information. For more details access the ".env.example" file.

---

## Development

After installing and configuring the environment variables we can run the magrations so that the environment is ready for use.

```bash
# NPM
npx sequelize db:migrate

# Yarn
yarn sequelize db:migrate
```

---

## Startup

Now that our environment is ready we must run the following commands to start it.

```bash
# NPM
npm run dev

# Yarn
yarn dev
```

---

## Routes

All routes have been documented using Swagger Docs, go to "/api-docs" for more details and testing.

However, below is a table containing the functionalities of the application.

| ROUTER               |   TYPE   |                                                         OCCUPATION                                                         |
| -------------------- | :------: | :------------------------------------------------------------------------------------------------------------------------: | --- |
| /login               |   POST   |                  This route is responsible for the administrator login generating its Access Token (JWT).                  |
| -------------------- | -------- |
| /administrator       |   POST   |                                The route is responsible for registering new administrators.                                |     |
| /administrator       |   PUT    | This route is responsible for changing the administrator's data. Note: Only the administrator himself can change his data. |
| /administrator       |  DELETE  |    This route is responsible for deleting the administrator. Note: Only the administrator himself can delete your data.    |
| -------------------- | -------- |
| /members             |   POST   |                                  This route has the function of registering new members.                                   |
| /members             |   GET    |                      This route is responsible for searching all existing members in the application.                      |
| /members/{id}        |   GET    |                     The route is responsible for searching only an existing member in the application.                     |
| /members/{id}        |   PUT    |                                 This route is responsible for changing the member's data.                                  |
| /members/{id}        |  DELETE  |                                     This route is responsible for deleting the member.                                     |

---

## Tests

The application has integration and unit testing coverage, to access your data use:

note: It is necessary that the database is changed in the environment variables (".env") before starting the tests.

```bash
# NPM
npm run test

# Yarn
yarn test
```

---

## Contact

If you have any questions about the project that was developed here, I will be happy to help you. Contact me by email: josewanderson173@gmail.com.
