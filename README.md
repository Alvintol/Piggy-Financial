# Piggy-Financial

Piggy Financial is an app that aims to help users track their financial goals. With a primary focus on vacation.

![Login Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/Login.png?raw=true)
![Sign Up Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/SignUpPage.png?raw=true)
![Profile Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/ProfilePageKevin.png?raw=true)
![Savings Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/SavingsPage.png?raw=true)
![Expense Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/ExpensePage.png?raw=true)
![Savings Line Graph](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/LineGraphSaving.png?raw=true)
![Spending Line Graph](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/LineGrapghSpending.png?raw=true)
![Break The Piggy Bank](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/SavingsPigBreak.png?raw=true)
![Budget Page](https://github.com/Alvintol/Piggy-Financial/blob/master/react-front-end/public/readmephotos/BudgetPage.png?raw=true)

## Running the project

You need **TWO** terminal windows/tabs for this (or some other plan for running two Node processes).

In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:3000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.

## Creating the DB

Use the psql -U development command to login to the PostgreSQL server with the username development and the password development. This command MUST be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment.

Create a database with the command CREATE DATABASE piggy;. Run command < \i express-back-end/src/db/schema/create.sql >

Copy the .env.example file to .env and fill in the necessary PostgreSQL configuration. The node-postgres library uses these environment variables by default.
This should look like this below:

```
PGHOST=localhost
PGDATABASE=piggy
PGPORT=5432
DB_USER=vagrant
DB_PASS=123
```

Run the command < \i express-back-end/src/db/seeds/allinone.sql > to populate the seed data to the tables.

## Dependencies
