<h1 align="center">API REST - Javascript</h1>

<p align="justify">
This project aims to materialize my knowledge in building rest apis with javascript and node.js. It simulates a simple organizational structure that has administrators and members, and these administrators are responsible for actions in the system.
</p>

## Tech

- <a href="https://nodejs.org/en/" target="_blank">Node.js</a>
- <a href="https://www.javascript.com/" target="_blank">JavaScript</a>
- <a href="https://expressjs.com/pt-br/" target="_blank">Express</a>
- <a href="https://sequelize.org/" target="_blank">Sequelize ORM</a>
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

## Tests

The application has integration and unit testing coverage, to access your data use:

```bash
# NPM
npm run test

# Yarn
yarn test
```

---

## Contact

If you have any questions about the project that was developed here, I will be happy to help you. Contact me by email: josewanderson173@gmail.com.
